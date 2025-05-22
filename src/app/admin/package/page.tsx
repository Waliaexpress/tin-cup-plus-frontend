"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { PlusCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "@/components/common/Toggle";
import Pagination from "@/components/filters/Pagination";
import { RouteEnums } from "@/routes/Routes";
import { useActivatePackageMutation, useGetPackagesWithPaginationQuery } from "@/store/services/package.service";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function PackagesPage() {
  const [activatePackage] = useActivatePackageMutation()
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const pathname = usePathname();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const newPage = Number(params.get('page')) || 1;
      const newLimit = Number(params.get('limit')) || 10;
      
      if (page !== newPage) setPage(newPage);
      if (limit !== newLimit) setLimit(newLimit);
    }
  }, [pathname, window?.location?.search]);
  
  const { data: packagesData, isLoading, error } = useGetPackagesWithPaginationQuery(
    { page, limit },
    { refetchOnMountOrArgChange: true }
  );
  
  const packages = packagesData?.data?.packages || [];
  
  const paginationData = {
    currentPage: page,
    nextPage: page < (packagesData?.data?.lastPage || 1) ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
    hasNextPage: page < (packagesData?.data?.lastPage || 1),
    hasPreviousPage: page > 1,
    lastPage: packagesData?.data?.lastPage || 1,
    total: packagesData?.data?.total || 0
  };
  

  const navigateWithFilters = (newParams: Record<string, string | number | null>) => {
    const updatedParams = { 
      page: newParams.page !== undefined ? newParams.page : page,
      limit: newParams.limit !== undefined ? newParams.limit : limit,
      ...newParams 
    };
    
    const params = new URLSearchParams();
    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });
    
    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : '';
    

    if (newParams.page !== undefined) setPage(Number(newParams.page));
    if (newParams.limit !== undefined) setLimit(Number(newParams.limit));
    
    router.push(url, { scroll: false });
  };
  
  const hasError = error !== undefined;

  const columns: TableColumn<any>[] = [
    {
      header: "Created At",
      accessor: (item) => {
        if (!item?.createdAt) return 'N/A';
        const date = new Date(item?.createdAt);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    },
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
            <span className="ml-2">{item.hall?.images?.length > 0 ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Foods:</span>
            <span className="ml-2">{item.foods?.length || 0}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Drinks:</span>
            <span className="ml-2">{item.drinks?.length || 0}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Services:</span>
            <span className="ml-2">{item.services?.length || 0}</span>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessor: (item) => {
        const isActive = !!item.isActive;
        return (
          <div className="flex items-center gap-2">
            {isActive ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Inactive
              </span>
            )}
            <Toggle 
              checked={isActive} 
              onChange={(checked) => handleToggleActive(item, checked)}
            />
          </div>
        );
      }
    },
  ];

  const handleEdit = (item: any) => {
    router.push(`${RouteEnums.EDIT_PACKAGE}/${item._id}`);
  };

  const handleDelete = async (item: any) => {
    toast.success(`${item.name?.en} has been deleted successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  const handleToggleActive = async (item: any, isActive: boolean) => {
  try {
    await activatePackage({ id: item._id, isActive });
    toast.success(`${item.name?.en} has been ${isActive ? 'activated' : 'deactivated'} successfully.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }
  catch (error) {
    console.error("Error toggling package activation:", error);
    toast.error("An error occurred. Please try again.", {
      position: "top-right",
      autoClose: 3000
    });
  }
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

      {hasError && (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-red-200">
          <p className="text-red-500 mb-4">Error loading packages. Please try again later.</p>
          <Button
            label="Retry"
            variant="primary"
            onClick={() => window.location.reload()}
            className="mx-auto"
          />
        </div>
      )}

      {!isLoading && !hasError && packages.length > 0 && (
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

      {!isLoading && !hasError && packages.length === 0 && (
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
