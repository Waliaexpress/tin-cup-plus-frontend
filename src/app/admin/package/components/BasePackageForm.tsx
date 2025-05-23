"use client"
import { useForm, Controller } from "react-hook-form";
import { useRef, useState } from "react";
import { Button } from "@/components/ui-elements/buttons/Buttons";
import { Upload } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import Image from "next/image";
import { useCreateBasicPackageMutation } from "@/store/services";
import Toggle from "@/components/common/Toggle";
import { Info } from "lucide-react";

interface BasePackageFormProps {
  defaultValues: CreatePackageFormData;
  onContinue: (data: CreatePackageFormData) => void;
  setIsCustomPackage?: (isCustom: boolean) => void;
}

export default function BasePackageForm({ defaultValues, onContinue, setIsCustomPackage }: BasePackageFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreatePackageFormData>({
    defaultValues: {
      ...defaultValues,
      isCustom: defaultValues.isCustom || false,
      isCatering: defaultValues.isCatering || false,
      perPerson: defaultValues.perPerson || false,
      perPersonPrice: defaultValues.perPersonPrice || 0,
    },
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createBasicPackage] = useCreateBasicPackageMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerImage = watch("bannerImage");
  const packageType = watch("forCatering");
  const isCustom = watch("isCustom");
  const isCatering = watch("isCatering");
  const perPerson = watch("perPerson");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        toast.error("Only JPG, PNG, and GIF files are allowed");
        return;
      }
      setValue("bannerImage", file, { shouldValidate: true });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: CreatePackageFormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
  
      if(data?.name.en){
        formData.append("name[en]", data.name.en.trim());
      }
      if(data?.name.am){
        formData.append("name[am]", data.name.am.trim());
      }
     
      if (data.description?.en) {
        formData.append("description[en]", data.description.en.trim());
      }
      if (data.description?.am) {
        formData.append("description[am]", data.description.am.trim());
      }
  
      formData.append("basePrice", data.basePrice.toString());
      
      if (data.minGuests) {
        formData.append("minGuests", data.minGuests.toString());
      }
      if (data.maxGuests) {
        formData.append("maxGuests", data.maxGuests.toString());
      }
  
      if (data.bannerImage) {
        formData.append("banner", data.bannerImage);
      }
  
      formData.append("forCatering", data.forCatering.toString());
      formData.append("isCustom", data.isCustom.toString());
      // formData.append("isCatering", data.isCatering.toString());
      
      if (data.perPerson) {
        formData.append("perPerson", data.perPerson.toString());
        if (data.perPersonPrice) {
          formData.append("perPersonPrice", data.perPersonPrice.toString());
        }
      }
  
      const result = await createBasicPackage(formData).unwrap();
      toast.success('Package created successfully!');
      
      if (setIsCustomPackage) {
        setIsCustomPackage(data.isCustom);
      }
      
      onContinue(result); 
      console.log("API RES", result) 
      router.push(`${window.location.pathname}?pkg_id=${result.data?._id}`);

    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error?.data?.message || "Failed to create package. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isDirty && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return;
    }
    reset();
    router.push("/admin/package");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Package Basic Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name-en" className="block text-sm font-medium text-gray-700 mb-1">
            Package Name (English) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="name.en"
            control={control}
            rules={{ required: "English name is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  id="name-en"
                  type="text"
                  className={`block w-full rounded-md py-2 px-3 border ${
                    errors.name?.en ? "border-red-500" : "border-gray-300"
                  } focus:border-primary focus:outline-none focus:ring-primary`}
                  placeholder="e.g., Wedding Package"
                />
                {errors.name?.en && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.en.message}</p>
                )}
              </>
            )}
          />
        </div>
        
        <div>
          <label htmlFor="name-am" className="block text-sm font-medium text-gray-700 mb-1">
            Package Name (Amharic) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="name.am"
            control={control}
            rules={{ required: "Amharic name is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  id="name-am"
                  type="text"
                  className={`block w-full rounded-md py-2 px-3 border ${
                    errors.name?.am ? "border-red-500" : "border-gray-300"
                  } focus:border-primary focus:outline-none focus:ring-primary`}
                  placeholder="e.g., የጋብቻ ፓኬጅ"
                />
                {errors.name?.am && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.am.message}</p>
                )}
              </>
            )}
          />
        </div>
      </div>
      
      <div>
          <label htmlFor="description-en" className="block text-sm font-medium text-gray-700 mb-1">
            English Description
          </label>
          <Controller
            name="description.en"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                id="description-en"
                rows={4}
                className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="(English) Describe what this package offers..."
                value={field.value as string} // Ensure value is treated as a string
              />
            )}
          />
        </div>
      <div>
        <label htmlFor="description-am" className="block text-sm font-medium text-gray-700 mb-1">
          Amharic Description
        </label>
        <Controller
          name="description.am"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="description-am"
              rows={4}
              className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
              placeholder="(Amharic) Describe what this package offers..."
            />
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-1">
            Base Price ($) <span className="text-red-500">*</span>
          </label>
          <Controller
            name="basePrice"
            control={control}
            rules={{
              required: "Base price is required",
              min: { value: 0.01, message: "Base price must be greater than 0" },
            }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  id="basePrice"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className={`block w-full rounded-md py-2 px-3 border ${
                    errors.basePrice ? "border-red-500" : "border-gray-300"
                  } focus:border-primary focus:outline-none focus:ring-primary`}
                  placeholder="0.00"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                {errors.basePrice && (
                  <p className="mt-1 text-sm text-red-500">{errors.basePrice.message}</p>
                )}
              </>
            )}
          />
        </div>
        
        <div>
          <label htmlFor="minGuests" className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Guests
          </label>
          <Controller
            name="minGuests"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="minGuests"
                type="number"
                min="0"
                className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Optional"
                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
              />
            )}
          />
        </div>
        
        <div>
          <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Guests
          </label>
          <Controller
            name="maxGuests"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="maxGuests"
                type="number"
                min="0"
                className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
                placeholder="Optional"
                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
              />
            )}
          />
        </div>
      </div>
      
      {watch("minGuests") !== null && watch("maxGuests") !== null && 
        watch("minGuests") > watch("maxGuests") && (
          <p className="mt-1 text-sm text-red-500">
            Minimum guests cannot be greater than maximum guests
          </p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-dark dark:text-white font-medium mb-2.5 block">
            Is Custom Package
          </label>
          <div className="flex items-center">
            <Controller
              name="isCustom"
              control={control}
              render={({ field: { value, onChange } }) => {
                const handleChange = (newValue: boolean) => {
                  onChange(newValue);
                  if (setIsCustomPackage) {
                    setIsCustomPackage(newValue);
                  }
                };
                
                return (
                  <Toggle
                    checked={value ?? false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                );
              }}
            />
            <span className="text-sm text-dark dark:text-white mr-2">
              {isCustom ? "Yes" : "No"}
            </span>
            <div className="relative group ml-1">
              <Info size={16} className="text-gray-400 cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                If enabled, this will be a custom package. Users will skip adding items and services, and will contact us for customization.
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="text-dark dark:text-white font-medium mb-2.5 block">
            Is Catering Package
          </label>
          <div className="flex items-center">
            <Controller
              name="isCatering"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Toggle
                  checked={value ?? false}
                  onChange={onChange}
                  className="mr-2"
                />
              )}
            />
            <span className="text-sm text-dark dark:text-white">
              {isCatering ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
      
      {isCatering && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <div>
            <label className="text-dark dark:text-white font-medium mb-2.5 block">
              Price Per Person
            </label>
            <div className="flex items-center">
              <Controller
                name="perPerson"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Toggle
                    checked={value ?? false}
                    onChange={onChange}
                    className="mr-2"
                  />
                )}
              />
              <span className="text-sm text-dark dark:text-white">
                {perPerson ? "Yes" : "No"}
              </span>
            </div>
          </div>
          
          {perPerson && (
            <div>
              <label htmlFor="perPersonPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Per Person Price ($)
              </label>
              <Controller
                name="perPersonPrice"
                control={control}
                rules={{
                  required: perPerson ? "Per person price is required" : false,
                  min: { value: 0.01, message: "Price must be greater than 0" },
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      id="perPersonPrice"
                      type="number"
                      min="0.01"
                      step="0.01"
                      className={`block w-full rounded-md py-2 px-3 border ${errors.perPersonPrice ? "border-red-500" : "border-gray-300"} focus:border-primary focus:outline-none focus:ring-primary`}
                      placeholder="0.00"
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                    {errors.perPersonPrice && (
                      <p className="mt-1 text-sm text-red-500">{errors.perPersonPrice.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          )}
        </div>
      )}
      
      <div className="mb-6">
        <label className="text-dark dark:text-white font-medium mb-2.5 block">
          Package Category
        </label>
        <div className="flex items-center">
          <Controller
            name="forCatering"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Toggle
                checked={value ?? false}
                onChange={onChange}
                className="mr-2"
              />
            )}
          />
          <span className="text-sm text-dark dark:text-white">
            {packageType ? "Catering" : "Normal"}
          </span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Banner Image <span className="text-red-500">*</span>
        </label>
        <Controller
          name="bannerImage"
          control={control}
          rules={{ required: "Banner image is required" }}
          render={({ field }) => (
            <>
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                  errors.bannerImage ? "border-red-500" : "border-gray-300"
                } hover:border-primary cursor-pointer`}
                onClick={triggerFileInput}
              >
                <div className="space-y-1 text-center">
                  {bannerImage ? (
                    <div className="relative w-full h-40 mx-auto">
                      <Image 
                        src={URL.createObjectURL(bannerImage)} 
                        alt="Banner preview" 
                        fill 
                        className="object-contain" 
                        priority
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
                        accept="image/jpeg,image/png,image/gif"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {errors.bannerImage && (
                <p className="mt-1 text-sm text-red-500">{errors.bannerImage.message}</p>
              )}
            </>
          )}
        />
      </div>
      
      <div className="flex justify-end mt-6 gap-4">
        <Button
          variant="outlinePrimary"
          className="border border-stroke bg-white text-primary px-6 py-3 rounded-full hover:border-primary hover:bg-white dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary dark:hover:bg-gray-dark"
          isRounded
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        
        <Button
          variant="primary"
          className="px-6 py-3 rounded-full text-white hover:bg-primary-dark"
          isRounded
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Create
        </Button>
      </div>
    </form>
  );
}