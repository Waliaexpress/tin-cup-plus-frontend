"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { Ingredient } from "@/types/ingredient";
import { PlusCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {  useGetIngridientsQuery,} from "@/store/services";
import { useUrlQuery, useChangeRoute } from "@/hooks";
import Pagination from "@/components/filters/Pagination";


export default function IngredientsPage() {
  const router = useRouter();


  const query = useUrlQuery();
  const page = query?.page ? +query.page : 1;
  const limit = query?.limit ? +query.limit : 2;
  const enName = query.enName ?? "";
  const amName = query.amName ?? "";
  const isActive = query.isActive ?? "";

  const changeRoute = useChangeRoute();

  // Fetch department list with pagination data
  const { data, isLoading, isError } =   useGetIngridientsQuery({ page, limit });
 const ingridients  = data?.data?.ingredients ?? []




  const pagination = {
    currentPage: page,
    nextPage: page < data?.data?.lastPage ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    hasNextPage: page < data?.data?.lastPage,
    hasPreviousPage: page > 1,
    lastPage: data?.data?.lastPage || 1,
  };


  // Define columns for the data table
  const columns: TableColumn<Ingredient>[] = [
    {
      header: "Name (English)",
      accessor: (item) => (
        <span className="font-medium text-dark dark:text-white">
          {item.name.en.charAt(0).toUpperCase() + item.name.en.slice(1)}
        </span>
      )
    },
    {
      header: "Name (Amharic)",
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
      header: "Created",
      accessor: (item) => new Date(item.createdAt).toLocaleDateString()
    }
  ];

  const handleEdit = (item: Ingredient) => {
    router.push(`/admin/ingredient/edit/${item._id}`);
  };

  

  return (
    <>
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <ToastContainer />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Ingredients
        </h2>
        <Link href="/admin/ingredient/create">
          <Button 
            label="Add New Ingredient" 
            icon={<PlusCircle className="h-5 w-5" />}
            variant="primary"
            className="hover:bg-primary-dark"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-5 md:gap-7">
        <DataTable
          columns={columns}
          data={ingridients}
          onEdit={handleEdit}
          keyField="id"
        />
      </div>

      <Pagination pagination={pagination} changeRoute={changeRoute} section="ingridients"  />
    </div>
    </>
  );
}
