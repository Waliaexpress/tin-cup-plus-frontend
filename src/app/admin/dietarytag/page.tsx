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

// Import the mock data (in a real app, this would be an API call)
import mockData from "./data/mock-data.json";

export default function DietaryTagsPage() {
  const router = useRouter();
  const [data, setData] = useState<DietaryTag[]>(mockData.response.items);

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

  const handleDelete = (item: DietaryTag) => {
    // In a real app, this would be an API call
    if (confirm(`Are you sure you want to delete ${item.name.en}?`)) {
      setData(data.filter((tag) => tag.id !== item.id));
      
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
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          keyField="id"
        />
      </div>
    </div>
  );
}
