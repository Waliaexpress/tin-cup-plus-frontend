"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DietaryTagForm from "@/components/dietary-tags/DietaryTagForm";
import { DietaryTag } from "@/types/dietary-tag";

// Import the mock data (in a real app, this would be an API call)
import mockData from "../../data/mock-data.json";

export default function EditDietaryTag() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [dietaryTag, setDietaryTag] = useState<DietaryTag | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock data
        const id = params.id as string;
        const foundTag = mockData.response.items.find(
          (item) => item.id === id
        );

        if (foundTag) {
          setDietaryTag(foundTag);
        }
      } catch (error) {
        console.error("Error fetching dietary tag:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12"></div>
      </div>
    );
  }

  if (!dietaryTag) {
    return (
      <div className="mx-auto px-4 md:px-8 2xl:px-0">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-dark dark:text-white">
            Dietary Tag Not Found
          </h2>
          <p className="text-body-color dark:text-dark-6">
            The tag you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Edit Dietary Tag
        </h2>
        <p className="text-body-color dark:text-dark-6">
          Update an existing dietary tag
        </p>
      </div>

      <DietaryTagForm isEditing={true} initialData={dietaryTag} />
    </div>
  );
}
