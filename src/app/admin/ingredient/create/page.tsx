"use client";

import IngredientForm from "@/components/ingridients/IngredientForm";

export default function CreateIngredientPage() {
  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Create New Ingredient
        </h2>
        <p className="text-body-color dark:text-dark-6">
          Fill in the details to create a new ingredient
        </p>
      </div>
      
      <IngredientForm isEditing={false} />
    </div>
  );
}
