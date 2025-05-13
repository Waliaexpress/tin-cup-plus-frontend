"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/buttons/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "@/components/FormElements/InputGroup";
import { Ingredient } from "@/types/ingredient";
import { useCreateIngridientMutation, useUpdateIngridientMutation } from "@/store/services";

interface IngredientFormProps {
  initialData?: Ingredient;
  isEditing: boolean;
}

interface IngredientFormValues {
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
}

export default function IngredientForm({ initialData, isEditing }: IngredientFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"english" | "amharic">("english");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);
  


 const [createIngridient,{isLoading: isLoadingCreate }] = useCreateIngridientMutation();
 const [updateIngridient, {isLoading: isUpdateLoading}] = useUpdateIngridientMutation();



  const defaultValues: IngredientFormValues = {
    name: {
      en: initialData?.name.en || "",
      am: initialData?.name.am || "",
    },
    description: {
      en: initialData?.description.en || "",
      am: initialData?.description.am || "",
    },
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    reset,
    trigger,
  } = useForm<IngredientFormValues>({
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

  // Validate if ingredient name already exists
  const validateIngredientName = async (value: string, field: 'en' | 'am') => {
    if (!value.trim()) return true; // Let required validation handle empty fields
    
    // In a real app, you would call your API here
    // const exists = await checkIngredientNameExists(value, field);
    // For demo purposes, we'll simulate this
    const exists = false; // Replace with actual API call
    
    if (exists) {
      // If editing, allow keeping the same name
      if (isEditing && initialData) {
        return initialData.name[field] === value.trim();
      }
      return false;
    }
    return true;
  };
  
  const onSubmit = async (data: IngredientFormValues) => {
    setIsSubmitting(true);
    
    try {
      const trimmedData = {
        name: {
          en: data?.name?.en?.trim?.() || '',
          am: data?.name?.am?.trim?.() || '',
        },
        description: {
          en: data?.description?.en?.trim?.() || '',
          am: data?.description?.am?.trim?.() || '',
        },
      };
      
      
      // First validate both names
      const isNameEnValid = await validateIngredientName(trimmedData.name.en, 'en');
      const isNameAmValid = await validateIngredientName(trimmedData.name.am, 'am');
      
      if (!isNameEnValid || !isNameAmValid) {
        throw new Error('Ingredient with this name already exists');
      }
      
      if (isEditing && initialData?._id) {
        await updateIngridient({ id: initialData._id, body: trimmedData }).unwrap();
        toast.success('Ingridient updated successfully!');
      } else {
        await createIngridient(trimmedData).unwrap();
        toast.success('Ingridient  created successfully!');
      }
  
        
      toast.success(`Ingredient ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      // Redirect back to the list page
      router.push("/admin/ingredient");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formModified && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return;
    }
    router.back();
  };

  const handleReset = () => {
    reset(defaultValues);
    setFormModified(false);
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <div className="flex mb-6 border-b border-stroke">
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === "english" ? "border-b-2 border-primary text-primary" : "text-body-color"}`}
              onClick={() => setActiveTab("english")}
            >
              English
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === "amharic" ? "border-b-2 border-primary text-primary" : "text-body-color"}`}
              onClick={() => setActiveTab("amharic")}
            >
              Amharic
            </button>
          </div>

          {activeTab === "english" && (
            <div>
              <InputGroup
                label="Name (English)"
                placeholder="Enter ingredient name"
                name="name.en"
                control={control}
                errors={errors}
              />
              <p className="mt-1 text-xs text-body-color">
                {watchNameEn?.length || 0}/100 characters
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
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters"
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
                  {watchDescEn?.length || 0}/500 characters
                </p>
              </div>
            </div>
          )}

          {activeTab === "amharic" && (
            <div>
              <InputGroup
                label="Name (Amharic)"
                placeholder="Enter ingredient name"
                name="name.am"
                control={control}
                errors={errors}
              />
              <p className="mt-1 text-xs text-body-color">
                {watchNameAm?.length || 0}/100 characters
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
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters"
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
                  {watchDescAm?.length || 0}/500 characters
                </p>
              </div>
            </div>
          )}
        </div>

        {isEditing && initialData && (
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-dark dark:text-white font-medium mb-2.5">
                Created At
              </div>
              <input
                type="text"
                value={new Date(initialData.createdAt).toLocaleString()}
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
                value={new Date(initialData.updatedAt).toLocaleString()}
                disabled
                className="w-full rounded border border-stroke bg-[#F5F7FD] px-5 py-3 text-dark outline-none transition disabled:cursor-not-allowed dark:border-dark-3 dark:bg-gray-dark dark:text-white"
              />
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-end gap-4">
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
            isLoading={isLoadingCreate || isSubmitting || isUpdateLoading}
            disabled={
              isSubmitting || 
              (!isDirty && isEditing) || 
              isLoadingCreate || isUpdateLoading
            }
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}