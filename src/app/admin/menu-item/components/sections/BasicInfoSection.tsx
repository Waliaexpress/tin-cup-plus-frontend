"use client";

import { useState } from "react";
import { Control, Controller, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import InputGroup from "@/components/FormElements/InputGroup";
import { MENU_ITEM_CONSTANTS } from "@/app/constants/menuItems";
import { FormValues } from "../types";

interface BasicInfoSectionProps {
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
}

export default function BasicInfoSection({ control, register, errors, watch }: BasicInfoSectionProps) {
  const [activeTab, setActiveTab] = useState(MENU_ITEM_CONSTANTS.LANGUAGES.ENGLISH);
  
  const watchNameEn = watch("name.en");
  const watchNameAm = watch("name.am");
  const watchDescEn = watch("description.en");
  const watchDescAm = watch("description.am");

  return (
    <div>
      <div className="mb-6">
        <div className="flex mb-6 border-b border-stroke">
          <button
            type="button"
            className={`px-4 py-2 ${activeTab === MENU_ITEM_CONSTANTS.LANGUAGES.ENGLISH ? "border-b-2 border-primary text-primary" : "text-body-color"}`}
            onClick={() => setActiveTab(MENU_ITEM_CONSTANTS.LANGUAGES.ENGLISH)}
          >
            English
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${activeTab === MENU_ITEM_CONSTANTS.LANGUAGES.AMHARIC ? "border-b-2 border-primary text-primary" : "text-body-color"}`}
            onClick={() => setActiveTab(MENU_ITEM_CONSTANTS.LANGUAGES.AMHARIC)}
          >
            Amharic
          </button>
        </div>

        {activeTab === MENU_ITEM_CONSTANTS.LANGUAGES.ENGLISH && (
          <div>
            <Controller
              name="name.en"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH,
                  message: `Name cannot exceed ${MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH} characters`
                }
              }}
              render={({ field }) => (
                <InputGroup
                  label="Name (English)"
                  placeholder="Enter menu item name"
                  control={control}
                  errors={errors}
                  required
                  {...field}
                />
              )}
            />
            <p className="mt-1 text-xs text-body-color">
              {watchNameEn?.length || 0}/{MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH} characters
            </p>
            
            <div className="mb-6 mt-6">
              <div className="text-dark dark:text-white font-medium mb-2.5">
                Description (English) <span className="text-red">*</span>
              </div>
              <textarea
                rows={3}
                placeholder="Enter description"
                {...register("description.en", { 
                  required: "Description is required",
                  maxLength: MENU_ITEM_CONSTANTS.MAX_DESCRIPTION_LENGTH
                })}
                className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
              />
              {errors.description?.en && (
                <p className="mt-1 text-xs text-red">
                  {errors.description.en.message as string}
                </p>
              )}
              <p className="mt-1 text-xs text-body-color">
                {watchDescEn?.length || 0}/{MENU_ITEM_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters
              </p>
            </div>
          </div>
        )}

        {activeTab === MENU_ITEM_CONSTANTS.LANGUAGES.AMHARIC && (
          <div>
            <Controller
              name="name.am"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH,
                  message: `Name cannot exceed ${MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH} characters`
                }
              }}
              render={({ field }) => (
                <InputGroup
                  label="Name (Amharic)"
                  placeholder="Enter menu item name"
                  control={control}
                  errors={errors}
                  required
                  {...field}
                />
              )}
            />
            <p className="mt-1 text-xs text-body-color">
              {watchNameAm?.length || 0}/{MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH} characters
            </p>
            
            <div className="mb-6 mt-6">
              <div className="text-dark dark:text-white font-medium mb-2.5">
                Description (Amharic) <span className="text-red">*</span>
              </div>
              <textarea
                rows={3}
                placeholder="Enter description"
                {...register("description.am", { 
                  required: "Description is required",
                  maxLength: MENU_ITEM_CONSTANTS.MAX_DESCRIPTION_LENGTH
                })}
                className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
              />
              {errors.description?.am && (
                <p className="mt-1 text-xs text-red">
                  {errors.description.am.message as string}
                </p>
              )}
              <p className="mt-1 text-xs text-body-color">
                {watchDescAm?.length || 0}/{MENU_ITEM_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="text-dark dark:text-white font-medium mb-2.5">
          Price <span className="text-red">*</span>
        </div>
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-dark dark:text-white">
            $
          </span>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: {
                value: MENU_ITEM_CONSTANTS.MIN_PRICE,
                message: `Price must be at least $${MENU_ITEM_CONSTANTS.MIN_PRICE}`
              },
              max: {
                value: MENU_ITEM_CONSTANTS.MAX_PRICE,
                message: `Price cannot exceed $${MENU_ITEM_CONSTANTS.MAX_PRICE}`
              }
            }}
            render={({ field }) => (
              <input
                type="number"
                step="0.01"
                min={MENU_ITEM_CONSTANTS.MIN_PRICE}
                max={MENU_ITEM_CONSTANTS.MAX_PRICE}
                placeholder="0.00"
                className="w-full rounded border border-stroke bg-white pl-10 pr-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                value={field.value === 0 && document.activeElement === document.getElementById('price-input') ? '' : field.value}
                id="price-input"
                onChange={(e) => {
                  if (e.target.value === '') {
                    field.onChange('');
                  } else {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === '') {
                    field.onChange(MENU_ITEM_CONSTANTS.MIN_PRICE);
                  }
                  field.onBlur();
                }}
              />
            )}
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-xs text-red">
            {errors.price.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
