import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui-elements/button";
import { Upload, ArrowRight, ArrowLeft, X } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import Image from "next/image";

interface HallPackageFormProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onContinue: () => void;
  onSkip: () => void;
  onPrevious?: () => void;
}

export default function HallPackageForm({ 
  formData, 
  updateFormData, 
  onContinue, 
  onSkip,
  onPrevious 
}: HallPackageFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [previewImages, setPreviewImages] = useState<string[]>(
    formData.hall.images.map(file => URL.createObjectURL(file))
  );

  const handleCapacityChange = (value: string) => {
    const capacity = value === "" ? null : Number(value);
    updateFormData({
      hall: {
        ...formData.hall,
        capacity
      }
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const newFiles = Array.from(files);
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      
      updateFormData({
        hall: {
          ...formData.hall,
          images: [...formData.hall.images, ...newFiles]
        }
      });
      
      setPreviewImages([...previewImages, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.hall.images];
    const newPreviews = [...previewImages];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    updateFormData({
      hall: {
        ...formData.hall,
        images: newImages
      }
    });
    
    setPreviewImages(newPreviews);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.hall.capacity !== null && formData.hall.capacity <= 0) {
      newErrors.capacity = "If provided, hall capacity must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const hasHallInfo = (formData.hall.capacity !== null && formData.hall.capacity > 0) || formData.hall.images.length > 0;
    updateFormData({ includesHall: hasHallInfo });
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Hall Information</h3>
        <Button
          label="Skip Hall (Optional)"
          variant="outlinePrimary"
          onClick={onSkip}
        />
      </div>
      
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
          Hall Capacity (People) (Optional)
        </label>
        <input
          id="capacity"
          type="number"
          min="1"
          className={`block w-full rounded-md py-2 px-3 border ${
            errors.capacity ? "border-red-500" : "border-gray-300"
          } focus:border-primary focus:outline-none focus:ring-primary`}
          value={formData.hall.capacity || ""}
          onChange={(e) => handleCapacityChange(e.target.value)}
          placeholder="e.g., 100"
        />
        {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hall Images (Optional)
        </label>
        <div 
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
            errors.images ? "border-red-500" : "border-gray-300"
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
        {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
      </div>
      
      {previewImages.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                  <div className="relative w-full h-32">
                    <Image
                      src={preview}
                      alt={`Hall image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
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
          />
        )}
        <Button
          label="Continue to Foods & Drinks"
          icon={<ArrowRight className="h-4 w-4 ml-2" />}
          variant="primary"
          onClick={handleSubmit}
          className="ml-auto"
        />
      </div>
    </div>
  );
}
