"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import TagMultiSelect from "@/components/FormElements/TagMultiSelect";
import { FormValues } from "../types";

interface DietaryIngredientsSectionProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  dietaryTags: any[];
  ingredients: any[];
}

export default function DietaryIngredientsSection({ 
  control, 
  errors, 
  dietaryTags,
  ingredients 
}: DietaryIngredientsSectionProps) {
  return (
    <div>
      <div className="mb-6">
        <Controller
          name="dietaryTagIds"
          control={control}
          rules={{ required: "At least one dietary tag is required" }}
          render={({ field }) => (
            <TagMultiSelect
              label="Dietary Tags"
              options={dietaryTags}
              selectedValues={field.value}
              onChange={(selectedIds) => field.onChange(selectedIds)}
              placeholder="Select dietary tags"
              searchPlaceholder="Search dietary tags"
              required
              error={errors.dietaryTagIds?.message as string}
            />
          )}
        />
      </div>
      
      <div className="mb-6">
        <Controller
          name="ingredientIds"
          control={control}
          rules={{ required: "At least one ingredient is required" }}
          render={({ field }) => (
            <TagMultiSelect
              label="Ingredients"
              options={ingredients}
              selectedValues={field.value}
              onChange={(selectedIds) => field.onChange(selectedIds)}
              placeholder="Select ingredients"
              searchPlaceholder="Search ingredients"
              required
              error={errors.ingredientIds?.message as string}
            />
          )}
        />
      </div>
    </div>
  );
}
