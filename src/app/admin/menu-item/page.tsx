"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { MenuItem } from "@/types/menu-item";
import { PlusCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "@/components/common/Toggle";

// Import the mock data (in a real app, this would be an API call)
import mockData from "./data/mock-data.json";

export default function MenuItemsPage() {
  const router = useRouter();
  const [data, setData] = useState<MenuItem[]>(mockData.response.items);

  // Define columns for the data table
  const columns: TableColumn<MenuItem>[] = [
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
      header: "Price",
      accessor: (item) => (
        <span className="font-medium">
          ${item.price.toFixed(2)}
        </span>
      )
    },
    {
      header: "Category",
      accessor: (item) => item.category.name
    },
    {
      header: "Status",
      accessor: (item) => (
        <div className="flex items-center gap-2">
          {item.isActive ? (
            <span className="inline-block px-3 py-1 text-xs font-medium text-green bg-green-100 rounded-full">
              Active
            </span>
          ) : (
            <span className="inline-block px-3 py-1 text-xs font-medium text-red bg-red-100 rounded-full">
              Inactive
            </span>
          )}
          {!item.isAvailable && (
            <span className="inline-block px-3 py-1 text-xs font-medium text-orange-500 bg-orange-100 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      )
    },
    {
      header: "Active",
      accessor: (item) => (
        <Toggle
          checked={item.isActive}
          onChange={(checked) => handleToggleActive(item, checked)}
        />
      )
    }
  ];

  const handleEdit = (item: MenuItem) => {
    router.push(`/admin/menu-item/edit/${item.id}`);
  };

  const handleDelete = (item: MenuItem) => {
    // In a real app, this would be an API call
    if (confirm(`Are you sure you want to delete ${item.name.en}?`)) {
      setData(data.filter((menuItem) => menuItem.id !== item.id));
      
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

  const handleToggleActive = (item: MenuItem, isActive: boolean) => {
    // In a real app, this would be an API call
    setData(data.map((menuItem) => 
      menuItem.id === item.id ? { ...menuItem, isActive } : menuItem
    ));
    
    toast.success(`${item.name.en} has been ${isActive ? 'activated' : 'deactivated'} successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <ToastContainer />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Menu Items
        </h2>
        <Link href="/admin/menu-item/create">
          <Button 
            label="Add New Menu Item" 
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
