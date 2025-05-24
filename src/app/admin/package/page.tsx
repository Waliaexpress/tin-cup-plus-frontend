"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable } from "@/components/Tables/data-table";
import { PlusCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetPackagesWithPaginationQuery, useActivatePackageMutation } from "@/store/services/package.service";
import { RouteEnums } from "@/routes/Routes";
import Pagination from "@/components/filters/Pagination";
import { usePackageColumns } from "./Column";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function PackagesPage() {
  const [activatePackage] = useActivatePackageMutation();
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
  
  const { data, isLoading, isError, refetch } = useGetPackagesWithPaginationQuery({
    page,
    limit,
  });

  const handleStatusChange = async (id: string, isActive: boolean) => {
    try {
      await activatePackage({ id, isActive }).unwrap();
      toast.success(`Package has been ${isActive ? 'activated' : 'deactivated'} successfully.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      refetch();
      return true;
    } catch (error) {
      console.error('Error toggling package status:', error);
      toast.error('Failed to update package status. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      return false;
    }
  };

  const { columns, modal } = usePackageColumns(handleStatusChange);
  
  const packages = data?.data?.packages || [];
  const paginationData = data?.data ? {
    currentPage: data.data.page,
    nextPage: data.data.page < data.data.lastPage ? data.data.page + 1 : null,
    previousPage: data.data.page > 1 ? data.data.page - 1 : null,
    hasNextPage: data.data.page < data.data.lastPage,
    hasPreviousPage: data.data.page > 1,
    lastPage: data.data.lastPage,
    total: data.data.total
  } : null;
  
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
  
  const hasError = isError !== undefined;

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
        <div className="flex flex-col gap-5">
          <DataTable
            columns={columns}
            data={packages}
            keyField="_id"
          />
          {modal}
          {paginationData && (
            <Pagination 
              section="packages"
              pagination={paginationData}
              changeRoute={(newQueries) => {
                navigateWithFilters({
                  ...newQueries,
                  page: newQueries.page || 1,
                  limit: newQueries.limit || limit,
                });
              }}
            />
          )}
        </div>
      )}

      {!isLoading && !hasError && packages.length === 0 && (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-stroke">
          <p className="text-gray-500 mb-4">No packages found.</p>
          <Link href={RouteEnums.CREATE_PACKAGE}>
            <Button
              label="Create Your First Package"
              variant="primary"
              icon={<PlusCircle className="h-5 w-5" />}
              className="hover:bg-primary-dark"
            />
          </Link>
        </div>
      )}
    </div>
  );
}
