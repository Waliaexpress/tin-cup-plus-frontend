"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { Category } from "@/types/category";
import { PlusCircle, Search, Calendar, Filter } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Toggle from "@/components/common/Toggle";

import {  useGetCategoriesQuery,} from "@/store/services";
import { useUrlQuery, useChangeRoute } from "@/hooks";
import Pagination from "@/components/filters/Pagination";

export default function CategoriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });




  const query = useUrlQuery();
  const page = query?.page ? +query.page : 1;
  const limit = query?.limit ? +query.limit : 2;
  const enName = query.enName ?? "";
  const amName = query.amName ?? "";
  const isActive = query.isActive ?? "";

  const changeRoute = useChangeRoute();

  // Fetch department list with pagination data
  const { data, isLoading, isError } =  useGetCategoriesQuery({ page, limit });
  const categories = data?.data.categories ?? [];




  const pagination = {
    currentPage: page,
    nextPage: page < data?.data?.lastPage ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    hasNextPage: page < data?.data?.lastPage,
    hasPreviousPage: page > 1,
    lastPage: data?.data?.lastPage || 1,
  };

  console.log(pagination, "pa")
  const columns: TableColumn<Category>[] = [
    {
      header: "Name (English)",
      accessor: (item) => (
        <span className="font-medium text-dark dark:text-white">
          {item.name.en}
        </span>
      )
    },
    {
      header: "Name (Amharic)",
      accessor: (item) => item.name.am
    },
    {
      header: "Status",
      accessor: (item) => (
        <div className="flex items-center">
          <span className="text-sm">{item.isActive ? "Active" : "Inactive"}</span>
        </div>
      )
    },
    {
      header: "Created",
      accessor: (item) => new Date(item.createdAt).toLocaleDateString()
    }
  ];

  const handleEdit = (item: Category) => {
    router.push(`/admin/category/edit/${item.id}`);
  };




  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRange({ start: "", end: "" });
  };

  return (
    <>
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <ToastContainer />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Categories
        </h2>
        <Link href="/admin/category/create">
          <Button 
            label="Add New Category" 
            icon={<PlusCircle className="h-5 w-5" />}
            variant="primary"
            className="hover:bg-primary-dark"
          />
        </Link>
      </div>

      <div className="mb-6 bg-white dark:bg-gray-dark p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 text-dark placeholder:text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-body-color" size={18} />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-body-color" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 px-4 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="date"
                placeholder="Start Date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 text-dark placeholder:text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-body-color" size={18} />
            </div>
            <div className="relative flex-1">
              <input
                type="date"
                placeholder="End Date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-10 pr-4 text-dark placeholder:text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-body-color" size={18} />
            </div>
          </div>
        </div>
        
        {(searchTerm || statusFilter !== "all" || dateRange.start || dateRange.end) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 md:gap-7">
        <DataTable
          columns={columns}
          data={categories}
          onEdit={handleEdit}
          // onDelete={handleDelete}
          keyField="id"
        />
    
      </div>

    </div>
    <Pagination pagination={pagination} changeRoute={changeRoute} section="departments"  />
    </>
  );
}
