"use client";

import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Category } from "@/types/category";
import { useGetCategoryByIdQuery } from "@/store/services/category.service";
import { useEffect, useState } from "react";

const Breadcrumb = dynamic(() => import("@/components/Breadcrumbs/Breadcrumb"), { ssr: false });
const CategoryForm = dynamic(() => import("@/components/categories/CategoryForm"), { ssr: false });

export default function EditCategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  
  const { data, isLoading, error } = useGetCategoryByIdQuery({ id: categoryId }, {
    refetchOnMountOrArgChange: true,
    skip: !categoryId,
  });

  const formatCategoryData = (): Category | null => {
    if (!data || !data.data) return null;
    
    const categoryData = data.data;
    return {
      _id: categoryData._id,
      name: {
        en: categoryData.name.en || "",
        am: categoryData.name.am || "",
      },
      description: {
        en: categoryData.description.en || "",
        am: categoryData.description.am || "",
      },
      image: categoryData.image?.fileUrl || "",
      isActive: categoryData.isActive,
      isTraditional: categoryData.isTraditional,
      createdAt: categoryData.createdAt,
      updatedAt: categoryData.updatedAt || categoryData.createdAt || new Date().toISOString(),
    };
  };

  const formattedCategory = data ? formatCategoryData() : null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !formattedCategory) {
    return (
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="flex flex-col items-center justify-center h-60">
          <h3 className="mb-3 text-xl font-semibold text-dark dark:text-white">
            {error ? "Error loading category" : "Category not found"}
          </h3>
          <p className="text-body-color dark:text-dark-6">
            The category you are looking for could not be found or there was an error loading it.
          </p>
        </div>
      </div>
    );
  }


  return (
    <>
      { <Breadcrumb pageName="Edit Category" />}

      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <CategoryForm initialData={formattedCategory} isEditing={true} />
      </div>
    </>
  );
}
