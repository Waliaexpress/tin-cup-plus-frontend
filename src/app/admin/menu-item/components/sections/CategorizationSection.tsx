"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormValues } from "../types";

interface CategorizationSectionProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  categories: any[];
}

export default function CategorizationSection({ control, errors, categories }: CategorizationSectionProps) {
  return (
    <div className="mb-6">
      <div className="text-dark dark:text-white font-medium mb-2.5">
        Category <span className="text-red">*</span>
      </div>
      <Controller
        name="categoryId"
        control={control}
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <select
            className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
            {...field}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      />
      {errors.categoryId && (
        <p className="mt-1 text-xs text-red">
          {errors.categoryId.message as string}
        </p>
      )}
    </div>
  );
}
