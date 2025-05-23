"use client"
import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { Upload, ArrowRight, ArrowLeft, X } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import Image from "next/image";
import { useAddHallToPackageMutation } from "@/store/services";
import { useParams } from 'next/navigation';
import { toast } from "react-toastify";

interface HallPackageFormProps {
  defaultValues: CreatePackageFormData;
  onContinue: () => void;
  onSkip: () => void;
  onPrevious?: () => void;
  packageIds: string; 
}

export default function HallPackageForm({ 
  defaultValues, 
  onContinue, 
  onSkip,
  onPrevious,
  packageIds
}: HallPackageFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePackageFormData>({
    defaultValues,
  });

  const [addHallToPackage, { isLoading }] = useAddHallToPackageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [packageId, setPackageIdUrl] = useState("");
  const hallImages = watch("hall.images");
  const hallCapacity = watch("hall.capacity");
  const params = useParams();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pkgId = urlParams.get("pkg_id") || "";
    setPackageIdUrl(pkgId);
  }, [params]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const newFiles = Array.from(files);
      const currentImages = watch("hall.images") || [];
      
      for (const file of newFiles) {
        if (file.size > 10 * 1024 * 1024) {
          toast.error("File size must be less than 10MB");
          return;
        }
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
          toast.error("Only JPG, PNG, and GIF files are allowed");
          return;
        }
      }

      setValue("hall.images", [...currentImages, ...newFiles], { shouldValidate: true });
    }
  };

  const removeImage = (index: number) => {
    const currentImages = [...(watch("hall.images") || [])];
    currentImages.splice(index, 1);
    setValue("hall.images", currentImages, { shouldValidate: true });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: CreatePackageFormData) => {
    try {
      const hasHallInfo = (data.hall?.capacity && data.hall.capacity > 0) || 
                         (data.hall?.images && data.hall.images.length > 0);

      if (!hasHallInfo) {
        onSkip();
        return;
      }

      const formData = new FormData();
      console.log("PACKAGE ID", packageId)
     
      if (data.hall?.capacity) {
        formData.append("capacity ", data.hall.capacity.toString());
      }

      if (data.hall?.images) {
        data.hall.images.forEach((file, index) => {
          formData.append(`hallImages`, file);
        });
      }
console.log("packageId",packageId)
      await addHallToPackage({packageId, formData}).unwrap();
      toast.success('Hall information added successfully!');
      onContinue();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error?.data?.message || "Failed to add hall information. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Hall Information</h3>
        <Button
          label="Skip Hall (Optional)"
          variant="outlinePrimary"
          onClick={onSkip}
          type="button"
        />
      </div>
      
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
          Hall Capacity (People) (Optional)
        </label>
        <Controller
          name="hall.capacity"
          control={control}
          rules={{
            validate: value => 
              value === null || value === undefined || value > 0 || 
              "If provided, hall capacity must be greater than 0"
          }}
          render={({ field }) => (
            <>
              <input
                {...field}
                id="capacity"
                type="number"
                min="1"
                className={`block w-full rounded-md py-2 px-3 border ${
                  errors.hall?.capacity ? "border-red-500" : "border-gray-300"
                } focus:border-primary focus:outline-none focus:ring-primary`}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                placeholder="e.g., 100"
              />
              {errors.hall?.capacity && (
                <p className="mt-1 text-sm text-red-500">{errors.hall.capacity.message}</p>
              )}
            </>
          )}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hall Images (Optional)
        </label>
        <Controller
          name="hall.images"
          control={control}
          render={({ field }) => (
            <>
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  errors.hall?.images ? "border-red-500" : "border-gray-300"
                } hover:border-primary cursor-pointer`}
                onClick={triggerFileInput}
              >
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {errors.hall?.images && (
                <p className="mt-1 text-sm text-red-500">{errors.hall.images.message}</p>
              )}
            </>
          )}
        />
      </div>
      
      {hallImages?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {hallImages.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                  <div className="relative w-full h-32">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Hall image ${index + 1}`}
                      fill
                      className="object-cover"
                      onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 rounded-full p-1
                    text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        {onPrevious && (
          <Button
            label="Previous"
            icon={<ArrowLeft className="h-4 w-4 mr-2" />}
            variant="outlinePrimary"
            onClick={onPrevious}
            type="button"
          />
        )}
        <Button
          label="Continue to Foods & Drinks"
          icon={<ArrowRight className="h-4 w-4 ml-2" />}
          variant="primary"
          type="submit"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}