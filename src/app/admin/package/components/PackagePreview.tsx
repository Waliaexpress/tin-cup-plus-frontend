import { useEffect, useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { Check, ArrowLeft, MapPin, Users, Coffee, Wine, Utensils, DollarSign } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import Image from "next/image";
import Toggle from "@/components/common/Toggle";
import { Controller, useForm } from "react-hook-form";
import { useActivatePackageMutation } from "@/store/services/package.service";
import { toast } from "react-toastify";

interface PackagePreviewProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onSubmit: () => void;
  onPrevious?: () => void;
  defaultValues: CreatePackageFormData;
}


export default function PackagePreview({ formData, updateFormData, onSubmit, onPrevious, defaultValues }: PackagePreviewProps) {
const [active, setActive] = useState(false)
const [activatePackage] = useActivatePackageMutation()
const [packageId, setPackageIdUrl] = useState("")
  const {
      control,
      handleSubmit,
      setValue,
      watch,
      reset,
      formState: { errors, isDirty },
    } = useForm<CreatePackageFormData>({
      defaultValues,
    });
  const handleToggleActive = (isActive: boolean) => {
    updateFormData({ isActive });
  };
   useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const pkgId = urlParams.get("pkg_id") || "";
      setPackageIdUrl(pkgId);
    }, []);
  const handleFinalSubmit = async () => {
    const toastId = toast.loading("Activating package...")
    await activatePackage({ id: packageId, isActive: active })
    onSubmit()
    toast.dismiss(toastId)
    toast.success("Package activated successfully", {
      autoClose: 5000,
      toastId: "activate"
    })
  
  }
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Package Summary & Activation</h3>
      <p className="text-gray-600">
      Activate this package to make it visible to customers
      </p>
      <div className="mb-6">
        <label className="text-dark dark:text-white font-medium mb-2.5 block">
          Active/Inactive
        </label>
        <div className="flex items-center">
          <Controller
            name="isActive"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Toggle
                checked={active}
                onChange={()=> {
                  setActive(value)
                  onChange(value)
                }}
                className="mr-2"
              />
            )}
          />
          <span className="text-sm text-dark dark:text-white">
            {active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          label="Previous"
          variant="outlinePrimary"
          onClick={onPrevious}
        />
        <Button
          label="Create Package"
          variant="primary"
          onClick={handleFinalSubmit}
        />
      </div>
     
    </div>
  );
}
