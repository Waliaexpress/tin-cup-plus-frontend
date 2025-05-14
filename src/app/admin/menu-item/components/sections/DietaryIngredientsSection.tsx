"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import TagMultiSelect from "@/components/FormElements/TagMultiSelect";
import { FormValues } from "../types";
import { getItemId } from "@/utils/idHelpers";

interface DietaryIngredientsSectionProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  dietaryTags: any[];
  ingredients: any[];
  onLoadMoreDietaryTags: () => void;
  onLoadMoreIngredients: () => void;
}

export default function DietaryIngredientsSection({ 
  control, 
  errors, 
  dietaryTags,
  ingredients,
  onLoadMoreDietaryTags,
  onLoadMoreIngredients
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
              options={dietaryTags.map(tag => {
                // Use our helper utility for safer ID extraction
                const tagId = getItemId(tag);
                console.log('Mapped dietary tag:', { id: tagId, originalTag: tag });
                
                return {
                  id: tagId, // Use the obtained ID
                  name: tag.name?.en || tag.name
                };
              })}
              selectedValues={field.value}
              onChange={(selectedIds) => field.onChange(selectedIds)}
              placeholder="Select dietary tags"
              searchPlaceholder="Search dietary tags"
              required
              error={errors.dietaryTagIds?.message as string}
              onListEndReached={onLoadMoreDietaryTags}
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
              options={ingredients.map(ingredient => {
                // Use our helper utility for safer ID extraction
                const ingredientId = getItemId(ingredient);
                console.log('Mapped ingredient:', { id: ingredientId, originalIngredient: ingredient });
                
                return {
                  id: ingredientId, // Use the obtained ID
                  name: ingredient.name?.en || ingredient.name
                };
              })}
              selectedValues={field.value}
              onChange={(selectedIds) => field.onChange(selectedIds)}
              placeholder="Select ingredients"
              searchPlaceholder="Search ingredients"
              required
              error={errors.ingredientIds?.message as string}
              onListEndReached={onLoadMoreIngredients}
            />
          )}
        />
      </div>
    </div>
  );
}
