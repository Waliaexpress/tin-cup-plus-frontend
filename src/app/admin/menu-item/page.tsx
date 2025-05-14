"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { DataTable, TableColumn } from "@/components/Tables/data-table";
import { MenuItem } from "@/types/menu-item";
import { PlusCircle, Search, Filter } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "@/components/common/Toggle";
import Pagination from "@/components/filters/Pagination";
import { useGetMenuItemsQuery } from "@/store/services/menuItem.service";
import { useGetCategoriesQuery } from "@/store/services/category.service";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function MenuItemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const categoryId = searchParams.get('categoryId') || '';
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId);
  
  const { data: menuItemsData, isLoading: isLoadingMenuItems, error: menuItemError } = useGetMenuItemsQuery({
    page, 
    limit,
    ...(selectedCategory ? { categoryId: selectedCategory } : {})
  });
  

  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({
    page: 1,
    limit: 100 
  });
  
  // Extract menu items and pagination data
  const menuItems = menuItemsData?.data?.menuItems || [];
  const paginationData = menuItemsData?.data ? {
    currentPage: menuItemsData.data.page,
    nextPage: menuItemsData.data.page < menuItemsData.data.lastPage ? menuItemsData.data.page + 1 : null,
    previousPage: menuItemsData.data.page > 1 ? menuItemsData.data.page - 1 : null,
    hasNextPage: menuItemsData.data.page < menuItemsData.data.lastPage,
    hasPreviousPage: menuItemsData.data.page > 1,
    lastPage: menuItemsData.data.lastPage,
    total: menuItemsData.data.total
  } : null;

  const navigateWithFilters = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams();
    
    if (page > 1) params.set('page', page.toString());
    if (limit !== 10) params.set('limit', limit.toString());
    if (selectedCategory) params.set('categoryId', selectedCategory);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    

    router.push(`/admin/menu-item?${params.toString()}`);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = e.target.value;
    setSelectedCategory(newCategoryId);
    navigateWithFilters({ categoryId: newCategoryId || null, page: 1 });
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
      header: "Price",
      accessor: (item) => (
        <span className="font-medium">
          ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
        </span>
      )
    },
    {
      header: "Category",
      accessor: (item) => item.category?.name?.en || 'Uncategorized'
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
      header: "Actions",
      accessor: (item) => (
        <div className="flex items-center gap-2">
          <Toggle
            checked={!!item.isActive}
            onChange={(checked) => handleToggleActive(item, checked)}
          />
        </div>
      )
    }
  ];

  const handleEdit = (item: any) => {
    router.push(`/admin/menu-item/edit/${item._id}`);
  };

  const handleDelete = (item: any) => {
   
    if (confirm(`Are you sure you want to delete ${item.name?.en}?`)) {
     
      toast.success(`${item.name?.en} has been deleted successfully.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
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
    <div className="mx-auto px-4 md:px-8 2xl:px-0" id="menu-items-section">
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

      {/* Filters */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-stroke">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <div className="relative">
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categoriesData?.data?.categories?.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name?.en || 'Unnamed'}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoadingMenuItems && (
        <LoadingSpinner />
      )}

      {/* Error State */}
      {menuItemError && (
        <div className="p-4 bg-red-100 text-red-800 rounded-md mb-6">
          <p>Error loading menu items. Please try again.</p>
        </div>
      )}

      {/* Data Table */}
      {!isLoadingMenuItems && !menuItemError && menuItems.length > 0 && (
        <div className="flex flex-col gap-5 md:gap-7">
          <DataTable
            columns={columns}
            data={menuItems}
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
              section="menu-items-section"
            />
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoadingMenuItems && !menuItemError && menuItems.length === 0 && (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-stroke">
          <p className="text-gray-500 mb-4">No menu items found.</p>
          {selectedCategory && (
            <Button
              label="Clear Filters"
              variant="outlinePrimary"
              onClick={() => navigateWithFilters({ categoryId: null, page: 1 })}
              className="mx-auto"
            />
          )}
        </div>
      )}
    </div>
  );
}
