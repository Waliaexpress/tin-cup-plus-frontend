"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import IngredientForm from "../../create/page";
import { Ingredient } from "@/types/ingredient";

// Import mock data (in a real app, this would be an API call)
import mockData from "../../data/mock-data.json";

export default function EditIngredientPage() {
  const params = useParams();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch ingredient by ID
    const fetchIngredient = async () => {
      try {
        // In a real app, this would be an API call
        const id = params.id as string;
        const foundIngredient = mockData.response.items.find(item => item.id === id);
        
        if (foundIngredient) {
          setIngredient(foundIngredient);
        } else {
          setError("Ingredient not found");
        }
      } catch (err) {
        setError("Failed to load ingredient");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredient();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !ingredient) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-dark dark:text-white mb-2">Error</h2>
        <p className="text-body-color dark:text-dark-6">{error || "Failed to load ingredient"}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Edit Ingredient: {ingredient.name.en}
        </h2>
        <p className="text-body-color dark:text-dark-6">
          Update the ingredient information below
        </p>
      </div>
      
      <IngredientForm isEditing={true} initialData={ingredient} />
    </div>
  );
}
