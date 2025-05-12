"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MENU_ITEM_CONSTANTS } from "@/app/constants/menuItems";
import { useDebounce } from "@/hooks/useDebounce";

import mockIngredients from "../../ingredient/data/mock-data.json";
import mockDietaryTags from "../../dietarytag/data/mock-data.json";
import mockCategories from "../data/mock-data.json";

import { MenuItemFormProps, FormValues } from "./types";
import BasicInfoSection from "./sections/BasicInfoSection";
import CategorizationSection from "./sections/CategorizationSection";
import DietaryIngredientsSection from "./sections/DietaryIngredientsSection";
import MediaSection from "./sections/MediaSection";
import AvailabilitySection from "./sections/AvailabilitySection";


export default function MenuItemForm({ initialData, isEditing }: MenuItemFormProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);
  
  const defaultValues: FormValues = {
    name: {
      en: initialData?.name.en || "",
      am: initialData?.name.am || "",
    },
    description: {
      en: initialData?.description.en || "",
      am: initialData?.description.am || "",
    },
    price: initialData?.price || 0,
    categoryId: initialData?.category.id || "",
    dietaryTagIds: initialData?.dietaryTags.map(tag => tag.id) || [],
    ingredientIds: initialData?.ingredients.map(ing => ing.id) || [],
    images: initialData?.images || [],
    isActive: initialData?.isActive ?? true,
    isAvailable: initialData?.isAvailable ?? true,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange"
  });

  useEffect(() => {
    setFormModified(isDirty);
  }, [isDirty]);

  const watchPrice = watch("price");
  

  const debouncedPrice = useDebounce(watchPrice, 500);
  

  useEffect(() => {
    if (debouncedPrice < MENU_ITEM_CONSTANTS.MIN_PRICE) {
      setValue("price", MENU_ITEM_CONSTANTS.MIN_PRICE);
    } else if (debouncedPrice > MENU_ITEM_CONSTANTS.MAX_PRICE) {
      setValue("price", MENU_ITEM_CONSTANTS.MAX_PRICE);
    }
  }, [debouncedPrice, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (data.dietaryTagIds.length === 0) {
        toast.error("Please select at least one dietary tag.");
        setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS);
        setIsSubmitting(false);
        return;
      }
      
      if (data.ingredientIds.length === 0) {
        toast.error("Please select at least one ingredient.");
        setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS);
        setIsSubmitting(false);
        return;
      }
      
      if (data.images.length === 0) {
        toast.error("Please upload at least one image.");
        setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.MEDIA);
        setIsSubmitting(false);
        return;
      }
      

      const trimmedData = {
        ...data,
        name: {
          en: data.name.en.trim(),
          am: data.name.am.trim(),
        },
        description: {
          en: data.description.en.trim(),
          am: data.description.am.trim(),
        },
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Menu item ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      router.push("/admin/menu-item");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formModified) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  const categories = mockCategories.response.categories;
  const dietaryTags = mockDietaryTags.response.items;
  const ingredients = mockIngredients.response.items;

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Navigation */}
        <div className="mb-8 flex flex-wrap gap-3 border-b border-stroke pb-5">
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO)}
          >
            Basic Information
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION)}
          >
            Categorization
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS)}
          >
            Dietary & Ingredients
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.MEDIA
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.MEDIA)}
          >
            Media
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-t-lg ${
              activeSection === MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY
                ? "bg-primary text-white"
                : "bg-gray-100 text-body-color hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveSection(MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY)}
          >
            Availability
          </button>
        </div>

        {/* Render the appropriate section based on activeSection */}
        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO && (
          <BasicInfoSection 
            control={control} 
            register={register} 
            errors={errors} 
            watch={watch} 
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION && (
          <CategorizationSection 
            control={control} 
            errors={errors} 
            categories={categories} 
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS && (
          <DietaryIngredientsSection 
            control={control} 
            errors={errors} 
            dietaryTags={dietaryTags} 
            ingredients={ingredients} 
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.MEDIA && (
          <MediaSection 
            control={control} 
            errors={errors} 
          />
        )}

        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY && (
          <AvailabilitySection 
            register={register} 
          />
        )}

        {/* Form Actions */}
        <div className="mt-10 flex justify-end gap-4">
          <Button 
            label="Cancel"
            onClick={handleCancel}
            variant="outlinePrimary"
            className="border-stroke bg-white hover:border-primary hover:bg-white dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary dark:hover:bg-gray-dark"
          />
          <Button 
            label={isSubmitting ? 'Saving...' : isEditing ? 'Update Menu Item' : 'Create Menu Item'}
            variant="primary"
            className={`hover:bg-primary-dark ${(isSubmitting || (!isDirty && isEditing)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={!isSubmitting && (isDirty || !isEditing) ? handleSubmit(onSubmit) : undefined}
          />
        </div>
      </form>
    </div>
  );
}
