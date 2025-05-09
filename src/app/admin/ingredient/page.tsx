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

// Import the mock data (in a real app, this would be an API call)
import mockData from "./data/mock-data.json";

export default function IngredientsPage() {
  const router = useRouter();
  const [data, setData] = useState<Ingredient[]>(mockData.response.items);

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
    router.push(`/admin/ingredient/edit/${item.id}`);
  };

  const handleDelete = (item: Ingredient) => {
    // In a real app, this would be an API call
    if (confirm(`Are you sure you want to delete ${item.name.en}?`)) {
      setData(data.filter((ingredient) => ingredient.id !== item.id));
      
      toast.success(`${item.name.en} has been deleted successfully.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  };

  return (
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
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          keyField="id"
        />
      </div>
    </div>
  );
}
