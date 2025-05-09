"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "@/components/FormElements/InputGroup";
import { Ingredient } from "@/types/ingredient";

interface IngredientFormProps {
  initialData?: Ingredient;
  isEditing: boolean;
}

export default function IngredientForm({ initialData, isEditing }: IngredientFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("english");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formModified, setFormModified] = useState(false);
  
  const defaultValues = {
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
  } = useForm({
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
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Trim all text inputs
      const trimmedData = {
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
      
      toast.success(`Ingredient ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      // In a real app, this would be an API call
      // For now, redirect back to the list page
      router.push("/admin/ingredient");
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
                required
              />
              
              <div className="mb-6 mt-6">
                <div className="text-dark dark:text-white font-medium mb-2.5">
                  Description (English) <span className="text-red">*</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  {...register("description.en", { 
                    required: "Description is required",
                    maxLength: 500
                  })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.en && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.en.message as string}
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
                required
              />
              
              <div className="mb-6 mt-6">
                <div className="text-dark dark:text-white font-medium mb-2.5">
                  Description (Amharic) <span className="text-red">*</span>
                </div>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  {...register("description.am", { 
                    required: "Description is required",
                    maxLength: 500
                  })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.am && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.am.message as string}
                  </p>
                )}
                <p className="mt-1 text-xs text-body-color">
                  {watchDescAm?.length || 0}/500 characters
                </p>
              </div>
            </div>
          )}
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
            label={isSubmitting ? 'Saving...' : isEditing ? 'Update Ingredient' : 'Create Ingredient'}
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
