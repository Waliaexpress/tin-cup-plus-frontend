"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CategoryForm from "@/components/categories/CategoryForm";
import { Category } from "@/types/category";
import mockData from "../../data/mock-data.json";

export default function EditCategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryId = params.id as string;
        const foundCategory = mockData.response.items.find(
          (item) => item.id === categoryId
        );

        if (foundCategory) {
          setCategory(foundCategory);
        } else {
          setError("Category not found");
        }
      } catch (err) {
        setError("Failed to load category");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="flex flex-col items-center justify-center h-60">
          <h3 className="mb-3 text-xl font-semibold text-dark dark:text-white">
            {error || "Category not found"}
          </h3>
          <p className="text-body-color dark:text-dark-6">
            The category you are looking for could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Edit Category" />

      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-dark dark:text-white">
            Edit Category: {category.name.en}
          </h2>
          <p className="text-sm text-body-color dark:text-dark-6">
            Update category details and settings
          </p>
        </div>

        <CategoryForm initialData={category} isEditing={true} />
      </div>
    </>
  );
}
