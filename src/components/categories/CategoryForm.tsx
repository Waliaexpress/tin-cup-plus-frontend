"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/buttons/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "@/components/FormElements/InputGroup";
import { Category, CATEGORY_CONSTANTS } from "@/types/category";
import ImageUploader from "@/components/FormElements/ImageUploader";
import Toggle from "@/components/common/Toggle";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/store/services/category.service";

interface CategoryFormProps {
  initialData?: Category;
  isEditing: boolean;
}

export default function CategoryForm({ initialData, isEditing }: CategoryFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(CATEGORY_CONSTANTS.LANGUAGES.ENGLISH);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);

  // RTK Query mutations
  const [createCategory, {isLoading: isLoadingCreate}] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    isActive: initialData?.isActive ?? true,
    isTraditional: initialData?.isTraditional ?? true
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues,
    mode: "onChange"
  });

  useEffect(() => {
    if (initialData) {
      reset(defaultValues);
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData, reset]);

  useEffect(() => {
    setFormModified(isDirty);
  }, [isDirty]);

  const onSubmit = async (data: typeof defaultValues) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Append name and description only if they exist
      if (data.name?.en) {
        formData.append('name[en]', data.name.en.trim());
      }
      if (data.name?.am) {
        formData.append('name[am]', data.name.am.trim());
      }
      if (data.description?.en) {
        formData.append('description[en]', data.description.en.trim());
      }
      if (data.description?.am) {
        formData.append('description[am]', data.description.am.trim());
      }
      
      if(data?.isTraditional){
        formData.append("isTraditional", data?.isTraditional.toString());
      }
      // Append image file if it's a new file or keep existing image if editing
      if (file) {
        formData.append('image', file);
      } else if (isEditing && initialData?.image) {
        // If editing and no new file was selected, keep the existing image
        formData.append('image', initialData.image);
      }
      
      formData.append('isActive', data.isActive.toString());
  
      if (isEditing && initialData?._id) {
        await updateCategory({ id: initialData._id, body: formData }).unwrap();
        toast.success('Category updated successfully!');
      } else {
        await createCategory(formData).unwrap();
        toast.success('Category created successfully!');
      }
  
      router.push("/admin/category");
      router.refresh();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
      setValue('image', selectedFile.name, { shouldValidate: true });
    } else {
      setImagePreview(null);
    }
  };

  const handleCancel = () => {
    if (formModified && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return;
    }
    reset()
    router.push("/admin/category");
  };

  // Watched values for character counters
  const watchNameEn = watch("name.en");
  const watchNameAm = watch("name.am");
  const watchDescEn = watch("description.en");
  const watchDescAm = watch("description.am");
  const isTraditional = watch("isTraditional")

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <ToastContainer position="top-right" autoClose={3000} />
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
              <InputGroup
                label="English Name"
                type="text"
                placeholder="Enter English Name"
                className="w-full"
                name="name.en"
                control={control}
                errors={errors.name}
                required
              />
              <p className="mt-1 text-xs text-body-color">
                {watchNameEn?.length || 0}/{CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters
              </p>
              
              <div className="mb-6 mt-6">
                <label className="text-dark dark:text-white font-medium mb-2.5 block">
                  Description (English) <span className="text-red">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  {...register("description.en", { 
                    required: "Description is required",
                    maxLength: {
                      value: CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH,
                      message: `Description cannot exceed ${CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`
                    }
                  })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.en && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.en.message}
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
              <InputGroup
                label="Name (Amharic)"
                type="text"
                placeholder="Enter Name (Amharic)"
                className="w-full"
                name="name.am"
                control={control}
                errors={errors.name}
                required
              />
              <p className="mt-1 text-xs text-body-color">
                {watchNameAm?.length || 0}/{CATEGORY_CONSTANTS.MAX_NAME_LENGTH} characters
              </p>
              
              <div className="mb-6 mt-6">
                <label className="text-dark dark:text-white font-medium mb-2.5 block">
                  Description (Amharic) <span className="text-red">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  {...register("description.am", { 
                    required: "Description is required",
                    maxLength: {
                      value: CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH,
                      message: `Description cannot exceed ${CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters`
                    }
                  })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.am && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.am.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-body-color">
                  {watchDescAm?.length || 0}/{CATEGORY_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3 my-4">
          <label className="text-dark dark:text-white font-medium mb-2.5 block">
            Category Image <span className="text-red">*</span>
          </label>
          <div className="flex items-center gap-x-3">
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="border border-gray-300 px-3 py-2 w-full"
              accept="image/*"
            />
           
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div>

          {errors.image && (
            <p className="mt-1 text-xs text-red">
              {errors.image.message}
            </p>
          )}
          <p className="mt-1 text-xs text-body-color">
            Accepted formats: JPEG, PNG, WebP (Max 5MB)
          </p>

          {imagePreview && (
            <div className="flex flex-col items-center space-y-3">
              <Image
                src={imagePreview}
                width={400}
                height={200}
                alt="Category Image"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="text-dark dark:text-white font-medium mb-2.5 block">
            Status
          </label>
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
        <div className="mb-6">
          <label className="text-dark dark:text-white font-medium mb-2.5 block">
            For Traditional
          </label>
          <div className="flex items-center">
            <Controller
              name="isTraditional"
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
              {watch("isTraditional") ? "Traditional" : "Normal"}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outlinePrimary"
            className="border border-stroke bg-white text-primary px-6 py-3 rounded-full hover:border-primary hover:bg-white dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary dark:hover:bg-gray-dark"
            isRounded
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        
          <Button
            variant="primary"
            className={`px-6 py-3 rounded-full text-white hover:bg-primary-dark ${
              (isSubmitting || (!isDirty && isEditing)) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            isRounded
            type="submit"
            isLoading={isLoadingCreate || isSubmitting}
            disabled={
              isSubmitting || 
              (!isDirty && isEditing) || 
              isLoadingCreate
            }
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}