"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "@/components/FormElements/InputGroup";
import { DietaryTag, DietaryTagName } from "@/types/dietary-tag";
import {  useCreateDietaryTagMutation,  useUpdateDietaryTagMutation,} from "@/store/services"

interface DietaryTagFormProps {
  initialData?: DietaryTag;
  isEditing: boolean;
}

export default function DietaryTagForm({ initialData, isEditing }: DietaryTagFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("english");
  const [isSubmitting, setIsSubmitting] = useState(false);



  const [createDietaryTag, {isLoading: isLoadingCreate}]  =   useCreateDietaryTagMutation()
  const [updateDietaryTag, {isLoading: isLaodingUpdate}] =  useUpdateDietaryTagMutation()
  const defaultValues = {
    name: {
      en: initialData?.name.en || "",
      am: initialData?.name.am || "",
    },
    description: {
      en: initialData?.description.en || "",
      am: initialData?.description.am || "",
    },
    color: initialData?.color || "#4CAF50",
    active: initialData?.active ?? true,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues,
  });

  const watchColor = watch("color");
  const watchActive = watch("active");
  const watchNameEn = watch("name.en");
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
    
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
      if (isEditing && initialData?._id) {
        await updateDietaryTAg({ id: initialData._id, body: trimmedData }).unwrap();
        toast.success('Dietary tag updated successfully!');
      } else {
        await createDietaryTag(trimmedData).unwrap();
        toast.success('Dietary tag created successfully!');
      }
  
      
      toast.success(`Dietary tag ${isEditing ? 'updated' : 'created'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      // In a real app, this would be an API call
      // For now, redirect back to the list page
      router.push("/admin/dietarytag");
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
    router.back();
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
                label="Tag Name (English)"
                placeholder="Select a tag name"
                name="name.en"
                control={control}
                errors={errors}
                required
              />
              
              <div className="mb-6 mt-6">
                <div className="text-dark dark:text-white font-medium mb-2.5">
                  Description (English)
                </div>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  {...register("description.en", { maxLength: 150 })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.en && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.en.message as string}
                  </p>
                )}
                <p className="mt-1 text-xs text-body-color">
                  Max 150 characters
                </p>
              </div>
            </div>
          )}

          {activeTab === "amharic" && (
            <div>
              <InputGroup
                label="Tag Name (Amharic)"
                placeholder="Select a tag name"
                name="name.am"
                control={control}
                errors={errors}
              />
              
              <div className="mb-6 mt-6">
                <div className="text-dark dark:text-white font-medium mb-2.5">
                  Description (Amharic)
                </div>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  {...register("description.am", { maxLength: 150 })}
                  className="w-full rounded border border-stroke bg-white px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
                />
                {errors.description?.am && (
                  <p className="mt-1 text-xs text-red">
                    {errors.description.am.message as string}
                  </p>
                )}
                <p className="mt-1 text-xs text-body-color">
                  Max 150 characters
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="text-dark dark:text-white font-medium mb-2.5">
            Color <span className="text-red">*</span>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-md border"
              style={{ backgroundColor: watchColor }}
            />
            <input
              type="color"
              {...register("color", { required: "Color is required" })}
              className="h-10 w-20"
            />
            <input
              type="text"
              value={watchColor}
              onChange={(e) => setValue("color", e.target.value)}
              className="h-10 rounded border border-stroke bg-white px-5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-[#F5F7FD] dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:focus:border-primary"
              placeholder="#RRGGBB"
            />
          </div>
          {errors.color && (
            <p className="mt-1 text-xs text-red">
              {errors.color.message as string}
            </p>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="text-dark dark:text-white font-medium">
              Active
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                {...register("active")} 
                className="sr-only" 
                id="active-toggle"
                onChange={(e) => setValue("active", e.target.checked)}
                checked={watchActive}
              />
              <label 
                htmlFor="active-toggle"
                className={`block h-8 w-14 cursor-pointer rounded-full ${watchActive ? 'bg-primary' : 'bg-gray-3 dark:bg-[#5A616B]'}`}
              >
                <span 
                  className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform ${watchActive ? 'translate-x-6' : ''}`}
                ></span>
              </label>
            </div>
          </div>
          <p className="mt-1 text-xs text-body-color">
            Toggle to enable or disable this dietary tag
          </p>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 text-lg font-medium text-dark dark:text-white">
            Preview
          </h3>
          <div className="flex flex-col gap-4 rounded-lg border p-4 dark:border-dark-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="h-6 w-6 rounded-full" 
                  style={{ backgroundColor: watchColor }}
                />
                <span className="font-medium text-dark dark:text-white">
                  {watchNameEn || "Select a tag name"}
                </span>
              </div>
              <div className={`rounded-full px-2 py-1 text-xs ${watchActive ? 'bg-[#219653]/[0.08] text-[#219653]' : 'bg-[#D34053]/[0.08] text-[#D34053]'}`}>
                {watchActive ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <Button 
            label="Cancel"
            onClick={handleCancel}
            variant="outlinePrimary"
            className="border-stroke bg-white hover:border-primary hover:bg-white dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary dark:hover:bg-gray-dark"
          />
          <Button 
            label={isSubmitting ? 'Saving...' : isEditing ? 'Update Tag' : 'Create Tag'}
            variant="primary"
            className="hover:bg-primary-dark"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </div>
  );
}
