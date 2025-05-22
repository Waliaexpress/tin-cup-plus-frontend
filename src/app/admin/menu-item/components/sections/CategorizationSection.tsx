"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormValues } from "../types";
import { useState } from "react";
import { Switch } from "@/components/ui-elements/switch";

interface CategorizationSectionProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  categories: any[];
  onLoadMore: () => void;
  isTraditional: boolean;
  setIsTraditional: (value: boolean) => void;
}

export default function CategorizationSection({ 
  control, 
  errors, 
  categories, 
  onLoadMore,
  isTraditional,
  setIsTraditional
}: CategorizationSectionProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectScroll = (e: React.UIEvent<HTMLSelectElement>) => {
    const select = e.currentTarget;
    const isScrollAtBottom = select.scrollTop + select.clientHeight >= select.scrollHeight - 20;
    
    if (isScrollAtBottom && !isFocused) {
      onLoadMore();
    }
  };
  return (
    <div>
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
              onScroll={handleSelectScroll}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category._id}>
                  {category.name?.en || category.name}
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

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-dark dark:text-white font-medium">
            Traditional Ethiopian Food
          </div>
          <Switch
            checked={isTraditional}
            onChange={setIsTraditional}
          />
        </div>
        <p className="mt-1 text-xs text-body-color">
          Mark this item as a traditional Ethiopian dish
        </p>
      </div>
      <div className="mb-6">
        <div className="flex flex-col">
          <div className="text-dark dark:text-white font-medium">
          Type of menu 
          <span className="text-red">*</span>
          </div>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type of menu is required" }}
            render={({ field }) => (
              <select
                className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                {...field}
                onScroll={handleSelectScroll}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              >
                <option value="">Select type of menu</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
              </select>
            )}
          />
        </div>
        <p className="mt-1 text-xs text-body-color">
        Select type of menu
        </p>
      </div>
    </div>
  );
}
