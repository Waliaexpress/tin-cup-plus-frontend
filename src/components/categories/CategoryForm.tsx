"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "@/components/FormElements/InputGroup";
import { Category, CATEGORY_CONSTANTS } from "@/types/category";
import ImageUploader from "@/components/FormElements/ImageUploader";
import Toggle from "@/components/common/Toggle";
import {  useCreateCategoryMutation} from "@/store/services/category.service";


interface CategoryFormProps {
  initialData?: Category;
  isEditing: boolean;
}

export default function CategoryForm({ initialData, isEditing }: CategoryFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(CATEGORY_CONSTANTS.LANGUAGES.ENGLISH);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);





  //? Queries
  //* Create Category
  const [createCategory, { data, isSuccess, isLoading, error, isError }] =   useCreateCategoryMutation()
 



  
  const defaultValues = {
    name: {
      en: initialData?.name.en || "",
      am: initialData?.name.am || "",
    },
    description: {
      en: initialData?.description.en || "",
      am: initialData?.description.am || "",
    },
    image: initialData?.image || "",
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm({
    defaultValues,
    mode: "onChange"
  });

  useEffect(() => {
    setFormModified(isDirty);
  }, [isDirty]);

  const watchNameEn = watch("name.en");
  const watchNameAm = watch("name.am");
  const watchDescEn = watch("description.en");
  const watchDescAm = watch("description.am");
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
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
      
      toast.success(`Category ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      router.push("/admin/category");
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

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <div className="flex mb-6 border-b border-stroke">
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === CATEGORY_CONSTANTS.LANGUAGES.ENGLISH ? "border-b-2 border-primary text-primary" : "text-body-color"}`}
              onClick={() => setActiveTab(CATEGORY_CONSTANTS.LANGUAGES.ENGLISH)}
            >
              English
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === CATEGORY_CONSTANTS.LANGUAGES.AMHARIC ? "border-b-2 border-primary text-primary" : "text-body-color"}`}
              onClick={() => setActiveTab(CATEGORY_CONSTANTS.LANGUAGES.AMHARIC)}
            >
              Amharic
            </button>
          </div>

          {activeTab === CATEGORY_CONSTANTS.LANGUAGES.ENGLISH && (
            <div>
              <Controller
                name="name.en"
                control={control}
                rules={{
                  required: "Name is required",
                  maxLength: {
                    value: CATEGORY_CONSTANTS.MAX_NAME_LENGTH,
                    message: `Name cannot exceed ${CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters`
                  }
                }}
                render={({ field }) => (
                  <InputGroup
                    label="Name (English)"
                    placeholder="Enter category name"
                    control={control}
                    errors={errors}
                    required
                    {...field}
                  />
                )}
              />
              <p className="mt-1 text-xs text-body-color">
                {watchNameEn?.length || 0}/{CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters
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
                    maxLength: CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH
                  })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.en && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.en.message as string}
                  </p>
                )}
                <p className="mt-1 text-xs text-body-color">
                  {watchDescEn?.length || 0}/{CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters
                </p>
              </div>
            </div>
          )}

          {activeTab === CATEGORY_CONSTANTS.LANGUAGES.AMHARIC && (
            <div>
              <Controller
                name="name.am"
                control={control}
                rules={{
                  required: "Name is required",
                  maxLength: {
                    value: CATEGORY_CONSTANTS.MAX_NAME_LENGTH,
                    message: `Name cannot exceed ${CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters`
                  }
                }}
                render={({ field }) => (
                  <InputGroup
                    label="Name (Amharic)"
                    placeholder="Enter category name"
                    control={control}
                    errors={errors}
                    required
                    {...field}
                  />
                )}
              />
              <p className="mt-1 text-xs text-body-color">
                {watchNameAm?.length || 0}/{CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters
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
                    maxLength: CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH
                  })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.am && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.am.message as string}
                  </p>
                )}
                <p className="mt-1 text-xs text-body-color">
                  {watchDescAm?.length || 0}/{CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="text-dark dark:text-white font-medium mb-2.5">
            Category Image <span className="text-red">*</span>
          </div>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <ImageUploader
                initialImages={field.value ? [{
                  id: "existing-image",
                  url: field.value,
                  isMain: true
                }] : []}
                onChange={(images) => field.onChange(images.length > 0 ? images[0].preview : "")}
                maxImages={1}
              />
            )}
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red">
              {errors.image.message as string}
            </p>
          )}
          <p className="mt-1 text-xs text-body-color">
            Accepted formats: JPEG, PNG, WebP (Max 5MB)
          </p>
        </div>

        <div className="mb-6">
          <div className="text-dark dark:text-white font-medium mb-2.5">
            Status
          </div>
          <div className="flex items-center">
            <Controller
              name="isActive"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Toggle
                  checked={value}
                  onChange={onChange}
                  className="mr-2"
                />
              )}
            />
            <span className="text-sm text-dark dark:text-white">
              {watch("isActive") ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {isEditing && (
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-dark dark:text-white font-medium mb-2.5">
                Created At
              </div>
              <input
                type="text"
                value={initialData ? new Date(initialData.createdAt).toLocaleString() : ''}
                disabled
                className="w-full rounded border border-stroke bg-[#F5F7FD] px-5 py-3 text-dark outline-none transition disabled:cursor-not-allowed dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
            <div>
              <div className="text-dark dark:text-white font-medium mb-2.5">
                Updated At
              </div>
              <input
                type="text"
                value={initialData ? new Date(initialData.updatedAt).toLocaleString() : ''}
                disabled
                className="w-full rounded border border-stroke bg-[#F5F7FD] px-5 py-3 text-dark outline-none transition disabled:cursor-not-allowed dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-end gap-4">
          <Button 
            label="Cancel"
            onClick={handleCancel}
            variant="outlinePrimary"
            className="border-stroke bg-white hover:border-primary hover:bg-white dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary dark:hover:bg-gray-dark"
          />
          <Button 
            label={isSubmitting ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
            variant="primary"
            className={`hover:bg-primary-dark ${(isSubmitting || (!isDirty && isEditing)) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={!isSubmitting && (isDirty || !isEditing) ? handleSubmit(onSubmit) : undefined}
          />
        </div>
      </form>
    </div>
  );
}
