"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "@/components/FormElements/InputGroup";
import { MenuItem } from "@/types/menu-item";
import { MENU_ITEM_CONSTANTS } from "@/app/constants/menuItems";
import TagMultiSelect from "@/components/FormElements/TagMultiSelect";
import ImageUploader from "@/components/FormElements/ImageUploader";
import { useDebounce } from "@/hooks/useDebounce";

import mockIngredients from "../../ingredient/data/mock-data.json";
import mockDietaryTags from "../../dietarytag/data/mock-data.json";
import mockCategories from "../data/mock-data.json";

interface MenuItemFormProps {
  initialData?: MenuItem;
  isEditing: boolean;
}

interface FormValues {
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  price: number;
  categoryId: string;
  dietaryTagIds: string[];
  ingredientIds: string[];
  images: any[];
  isActive: boolean;
  isAvailable: boolean;
}

export default function MenuItemForm({ initialData, isEditing }: MenuItemFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(MENU_ITEM_CONSTANTS.LANGUAGES.ENGLISH);
  const [activeSection, setActiveSection] = useState(MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);
  
  // Prepare default values for the form
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

  // Track form modifications
  useEffect(() => {
    setFormModified(isDirty);
  }, [isDirty]);

  // For character counting
  const watchNameEn = watch("name.en");
  const watchNameAm = watch("name.am");
  const watchDescEn = watch("description.en");
  const watchDescAm = watch("description.am");
  const watchPrice = watch("price");
  const watchCategoryId = watch("categoryId");
  const watchDietaryTagIds = watch("dietaryTagIds");
  const watchIngredientIds = watch("ingredientIds");
  const watchImages = watch("images");
  
  // Debounce price to prevent excessive validation
  const debouncedPrice = useDebounce(watchPrice, 500);
  
  // Validate price is within range
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
      // Validate required fields
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
      
      // Trim all text inputs
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Menu item ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      // In a real app, this would be an API call
      // For now, redirect back to the list page
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

  // Get data for dropdowns
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

        {/* Basic Information Section */}
        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.BASIC_INFO && (
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
                  <InputGroup
                    label="Name (English)"
                    placeholder="Enter menu item name"
                    name="name.en"
                    control={control}
                    errors={errors}
                    required
                    rules={{
                      required: "Name is required",
                      maxLength: {
                        value: MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH,
                        message: `Name cannot exceed ${MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH} characters`
                      }
                    }}
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
                  <InputGroup
                    label="Name (Amharic)"
                    placeholder="Enter menu item name"
                    name="name.am"
                    control={control}
                    errors={errors}
                    required
                    rules={{
                      required: "Name is required",
                      maxLength: {
                        value: MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH,
                        message: `Name cannot exceed ${MENU_ITEM_CONSTANTS.MAX_NAME_LENGTH} characters`
                      }
                    }}
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
        )}

        {/* Categorization Section */}
        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.CATEGORIZATION && (
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
        )}

        {/* Dietary & Ingredients Section */}
        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.DIETARY_INGREDIENTS && (
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
        )}

        {/* Media Section */}
        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.MEDIA && (
          <div className="mb-6">
            <div className="text-dark dark:text-white font-medium mb-2.5">
              Images <span className="text-red">*</span>
            </div>
            <p className="mb-4 text-sm text-body-color">
              Upload up to {MENU_ITEM_CONSTANTS.MAX_IMAGES} images. The first image or the one marked as main will be used as the primary image.
            </p>
            
            <Controller
              name="images"
              control={control}
              rules={{ required: "At least one image is required" }}
              render={({ field }) => (
                <ImageUploader
                  initialImages={field.value}
                  onChange={(images) => field.onChange(images)}
                  maxImages={MENU_ITEM_CONSTANTS.MAX_IMAGES}
                />
              )}
            />
            
            {errors.images && (
              <p className="mt-2 text-xs text-red">
                {errors.images.message as string}
              </p>
            )}
          </div>
        )}

        {/* Availability Section */}
        {activeSection === MENU_ITEM_CONSTANTS.SECTIONS.AVAILABILITY && (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-dark dark:text-white font-medium">
                    Active Status
                  </div>
                  <p className="text-sm text-body-color">
                    Toggle to show or hide this item on the menu
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("isActive")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-dark dark:text-white font-medium">
                    Available for Order
                  </div>
                  <p className="text-sm text-body-color">
                    Toggle to mark this item as available or out of stock
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("isAvailable")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
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
            className="hover:bg-primary-dark"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || (!isDirty && isEditing)}
          />
        </div>
      </form>
    </div>
  );
}
