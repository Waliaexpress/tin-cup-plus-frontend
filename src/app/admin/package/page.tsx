"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { PlusCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "@/components/common/Toggle";
import Pagination from "@/components/filters/Pagination";
import { RouteEnums } from "@/routes/Routes";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);


const mockPackages = [
  {
    _id: "package1",
    name: {
      en: "Wedding package",
      am: "የጋብቻ ፓኬጅ"
    },
    description: "Perfect for small to medium weddings with full service",
    basePrice: 2999.99,
    minGuests: 50,
    maxGuests: 200,
    includesHall: true,
    foodCount: 12,
    drinkCount: 8,
    serviceCount: 5,
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "package2",
    name: {
      en: "Birthday celebration",
      am: "የልደት በዓል"
    },
    description: "Complete birthday party setup with decorations",
    basePrice: 799.99,
    minGuests: 10,
    maxGuests: 50,
    includesHall: false,
    foodCount: 6,
    drinkCount: 4,
    serviceCount: 3,
    isActive: false,
    createdAt: new Date().toISOString()
  },
  {
    _id: "package3",
    name: {
      en: "Corporate event",
      am: "የኮርፖሬት ዝግጅት"
    },
    description: "Professional setup for business meetings and gatherings",
    basePrice: 1499.99,
    minGuests: 20,
    maxGuests: 100,
    includesHall: true,
    foodCount: 10,
    drinkCount: 6,
    serviceCount: 4,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export default function PackagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  
  const [isLoading, setIsLoading] = useState(false);
  const packages = mockPackages;
  
  const paginationData = {
    currentPage: page,
    nextPage: page < Math.ceil(packages.length / limit) ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    hasNextPage: page < Math.ceil(packages.length / limit),
    hasPreviousPage: page > 1,
    lastPage: Math.ceil(packages.length / limit),
    total: packages.length
  };

  const navigateWithFilters = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams();
    
    if (page > 1) params.set('page', page.toString());
    if (limit !== 10) params.set('limit', limit.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    
    router.push(`/admin/package?${params.toString()}`);
  };
  
  const columns: TableColumn<any>[] = [
    {
      header: "Name (English)",
      accessor: (item) => (
        <span className="font-medium text-dark dark:text-white">
          {item.name?.en?.charAt(0).toUpperCase() + item.name?.en?.slice(1) || 'N/A'}
        </span>
      )
    },
    {
      header: "Name (Amharic)",
      accessor: (item) => item.name?.am || 'N/A'
    },
    {
      header: "Base Price",
      accessor: (item) => (
        <span className="font-medium">
          ${typeof item.basePrice === 'number' ? item.basePrice.toFixed(2) : 'N/A'}
        </span>
      )
    },
    {
      header: "Guests",
      accessor: (item) => (
        <span>
          {item.minGuests} - {item.maxGuests}
        </span>
      )
    },
    {
      header: "Includes",
      accessor: (item) => (
        <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Hall:</span>
            <span className="ml-2">{item.includesHall ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Foods:</span>
            <span className="ml-2">{item.foodCount}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Drinks:</span>
            <span className="ml-2">{item.drinkCount}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Services:</span>
            <span className="ml-2">{item.serviceCount}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (item) => (
        <div className="flex items-center gap-2">
          {item.isActive ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Inactive
            </span>
          )}
          <Toggle 
            checked={item.isActive} 
            onChange={(checked) => handleToggleActive(item, checked)}
          />
        </div>
      )
    },
  ];

  const handleEdit = (item: any) => {
    router.push(`${RouteEnums.EDIT_PACKAGE}/${item._id}`);
  };

  const handleDelete = (item: any) => {
    toast.success(`${item.name?.en} has been deleted successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  const handleToggleActive = (item: any, isActive: boolean) => {
    // In a real app, we'd call an update API endpoint
    toast.success(`${item.name?.en} has been ${isActive ? 'activated' : 'deactivated'} successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0" id="packages-section">
      <ToastContainer />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Packages
        </h2>
        <Link href={RouteEnums.CREATE_PACKAGE}>
          <Button 
            label="Create New Package" 
            icon={<PlusCircle className="h-5 w-5" />}
            variant="primary"
            className="hover:bg-primary-dark"
          />
        </Link>
      </div>

      {isLoading && (
        <LoadingSpinner />
      )}

      {!isLoading && packages.length > 0 && (
        <div className="flex flex-col gap-5 md:gap-7">
          <DataTable
            columns={columns}
            data={packages}
            onEdit={handleEdit}
            onDelete={handleDelete}
            keyField="_id"
          />
          
          {/* Pagination */}
          {paginationData && (
            <Pagination 
              pagination={paginationData}
              changeRoute={(newQueries) => {
                navigateWithFilters(newQueries);
              }}
              section="packages-section"
            />
          )}
        </div>
      )}

      {!isLoading && packages.length === 0 && (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-stroke">
          <p className="text-gray-500 mb-4">No packages found.</p>
          <Button
            label="Create Your First Package"
            variant="primary"
            onClick={() => router.push(RouteEnums.CREATE_PACKAGE)}
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
}
