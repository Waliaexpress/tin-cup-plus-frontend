"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { DietaryTag } from "@/types/dietary-tag";
import { PlusCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUrlQuery, useChangeRoute } from "@/hooks";
import Pagination from "@/components/filters/Pagination";



import {  useGetDietaryTagsQuery} from "@/store/services"

export default function DietaryTagsPage() {
  const router = useRouter();
  



  const query = useUrlQuery();
  const page = query?.page ? +query.page : 1;
  const limit = query?.limit ? +query.limit : 2;
  const enName = query.enName ?? "";
  const amName = query.amName ?? "";
  const isActive = query.isActive ?? "";

  const changeRoute = useChangeRoute();

  // Fetch department list with pagination data
  const { data, isLoading, isError } =   useGetDietaryTagsQuery({ page, limit });
 const dietaryTags  = data?.data?.dietaryTags ?? []



  const pagination = {
    currentPage: page,
    nextPage: page < data?.data?.lastPage ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    hasNextPage: page < data?.data?.lastPage,
    hasPreviousPage: page > 1,
    lastPage: data?.data?.lastPage || 1,
  };


  // Define columns for the data table
  const columns: TableColumn<DietaryTag>[] = [
    {
      header: "Tag Name",
      accessor: (item) => (
        <div className="flex items-center gap-3">
          <div 
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-medium text-dark dark:text-white">
            {item.name.en.charAt(0).toUpperCase() + item.name.en.slice(1)}
          </span>
        </div>
      )
    },
    {
      header: "Armenian Name",
      accessor: (item) => item.name.am
    },
    {
      header: "Description",
      accessor: (item) => (
        <div className="max-w-[300px] truncate" title={item.description.en}>
          {item.description.en}
        </div>
      )
    },
    {
      header: "Status",
      accessor: (item) => (
        <div
          className={`max-w-fit rounded-full px-3.5 py-1 text-sm font-medium ${
            item.active
              ? "bg-[#219653]/[0.08] text-[#219653]"
              : "bg-[#D34053]/[0.08] text-[#D34053]"
          }`}
        >
          {item.active ? "Active" : "Inactive"}
        </div>
      )
    }
  ];

  const handleEdit = (item: DietaryTag) => {
    router.push(`/admin/Dietary Tag/edit/${item.id}`);
  };

  
  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <ToastContainer />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Dietary Tags
        </h2>
        <Link href="/admin/dietarytag/create">
          <Button 
            label="Add New Tag" 
            icon={<PlusCircle className="h-5 w-5" />}
            variant="primary"
            className="hover:bg-primary-dark"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-5 md:gap-7">
        <DataTable
          columns={columns}
          data={dietaryTags}
          onEdit={handleEdit}
          keyField="id"
        />
      </div>
      <Pagination pagination={pagination} changeRoute={changeRoute} section="dietary tags"  />
    </div>
  );
}
