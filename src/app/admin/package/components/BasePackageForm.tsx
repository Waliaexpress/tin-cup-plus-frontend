import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui-elements/button";
import { Upload, ArrowRight } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import Image from "next/image";

interface BasePackageFormProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onContinue: () => void;
}

export default function BasePackageForm({ formData, updateFormData, onContinue }: BasePackageFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    formData.bannerImage ? URL.createObjectURL(formData.bannerImage) : null
  );

  const handleTextChange = (field: keyof CreatePackageFormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleMultiLangChange = (field: string, lang: string, value: string) => {
    updateFormData({
      name: {
        ...formData.name,
        [lang]: value
      }
    });
  };

  const handleNumberChange = (field: keyof CreatePackageFormData, value: string) => {
    const numberValue = value === "" ? null : Number(value);
    updateFormData({ [field]: numberValue });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      updateFormData({ bannerImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.en.trim()) {
      newErrors.nameEn = "English name is required";
    }

    if (!formData.name.am.trim()) {
      newErrors.nameAm = "Amharic name is required";
    }

    if (formData.basePrice <= 0) {
      newErrors.basePrice = "Base price must be greater than 0";
    }

    if (!formData.bannerImage) {
      newErrors.bannerImage = "Banner image is required";
    }

    if (formData.minGuests !== null && formData.maxGuests !== null) {
      if (formData.minGuests > formData.maxGuests) {
        newErrors.guests = "Minimum guests cannot be greater than maximum guests";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Package Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name-en" className="block text-sm font-medium text-gray-700 mb-1">
            Package Name (English) <span className="text-red-500">*</span>
          </label>
          <input
            id="name-en"
            type="text"
            className={`block w-full rounded-md py-2 px-3 border ${
              errors.nameEn ? "border-red-500" : "border-gray-300"
            } focus:border-primary focus:outline-none focus:ring-primary`}
            value={formData.name.en}
            onChange={(e) => handleMultiLangChange("name", "en", e.target.value)}
            placeholder="e.g., Wedding Package"
          />
          {errors.nameEn && <p className="mt-1 text-sm text-red-500">{errors.nameEn}</p>}
        </div>
        
        <div>
          <label htmlFor="name-am" className="block text-sm font-medium text-gray-700 mb-1">
            Package Name (Amharic) <span className="text-red-500">*</span>
          </label>
          <input
            id="name-am"
            type="text"
            className={`block w-full rounded-md py-2 px-3 border ${
              errors.nameAm ? "border-red-500" : "border-gray-300"
            } focus:border-primary focus:outline-none focus:ring-primary`}
            value={formData.name.am}
            onChange={(e) => handleMultiLangChange("name", "am", e.target.value)}
            placeholder="e.g., የጋብቻ ፓኬጅ"
          />
          {errors.nameAm && <p className="mt-1 text-sm text-red-500">{errors.nameAm}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
          value={formData.description}
          onChange={(e) => handleTextChange("description", e.target.value)}
          placeholder="Describe what this package offers..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-1">
            Base Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            id="basePrice"
            type="number"
            min="0"
            step="0.01"
            className={`block w-full rounded-md py-2 px-3 border ${
              errors.basePrice ? "border-red-500" : "border-gray-300"
            } focus:border-primary focus:outline-none focus:ring-primary`}
            value={formData.basePrice || ""}
            onChange={(e) => updateFormData({ basePrice: parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
          />
          {errors.basePrice && <p className="mt-1 text-sm text-red-500">{errors.basePrice}</p>}
        </div>
        
        <div>
          <label htmlFor="minGuests" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Guests
          </label>
          <input
            id="minGuests"
            type="number"
            min="0"
            className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
            value={formData.minGuests || ""}
            onChange={(e) => handleNumberChange("minGuests", e.target.value)}
            placeholder="Optional"
          />
        </div>
        
        <div>
          <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Guests
          </label>
          <input
            id="maxGuests"
            type="number"
            min="0"
            className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
            value={formData.maxGuests || ""}
            onChange={(e) => handleNumberChange("maxGuests", e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>
      {errors.guests && <p className="mt-1 text-sm text-red-500">{errors.guests}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Image <span className="text-red-500">*</span>
        </label>
        <div 
          className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
            errors.bannerImage ? "border-red-500" : "border-gray-300"
          } hover:border-primary cursor-pointer`}
          onClick={triggerFileInput}
        >
          <div className="space-y-1 text-center">
            {previewImage ? (
              <div className="relative w-full h-40 mx-auto">
                <Image 
                  src={previewImage} 
                  alt="Banner preview" 
                  fill 
                  className="object-contain" 
                />
              </div>
            ) : (
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {errors.bannerImage && <p className="mt-1 text-sm text-red-500">{errors.bannerImage}</p>}
      </div>
      
      <div className="flex justify-end mt-6">
        <Button
          label="Continue to Hall Information"
          icon={<ArrowRight className="h-4 w-4 ml-2" />}
          variant="primary"
          onClick={handleSubmit}
          iconPosition="right"
        />
      </div>
    </div>
  );
}
