"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { ArrowLeft, Check } from "lucide-react";
import { RouteEnums } from "@/routes/Routes";
import { CreatePackageFormData, PackageStepType } from "@/types/package";
import BasePackageForm from "@/app/admin/package/components/BasePackageForm";
import HallPackageForm from "@/app/admin/package/components/HallPackageForm";
import FoodPackageForm from "@/app/admin/package/components/FoodPackageForm";
import ServicesPackageForm from "@/app/admin/package/components/ServicesPackageForm";
import PackagePreview from "@/app/admin/package/components/PackagePreview";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetPackageByIdQuery } from "@/store/services/package.service";

const defaultFormData: CreatePackageFormData = {
  name: { en: "", am: "" },
  description: { en: "", am: "" },
  basePrice: 0,
  minGuests: null,
  maxGuests: null,
  bannerImage: null,
  includesHall: false,
  hall: {
    capacity: null,
    images: []
  },
  foods: [],
  drinks: [],
  services: [],
  isActive: false,
  forCatering: false,
  isCustom: false,
  isCatering: false,
  perPerson: false,
  perPersonPrice: 0
};

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.id as string;
  
  const { data: packageData, isLoading, error } = useGetPackageByIdQuery(packageId);
  
  const [currentStep, setCurrentStep] = useState<PackageStepType>("base");
  const [formData, setFormData] = useState<CreatePackageFormData>(defaultFormData);
  const [completedSteps, setCompletedSteps] = useState<PackageStepType[]>([]);
  const [isCustomPackage, setIsCustomPackage] = useState<boolean>(false);

  // Set form data when package data is loaded
  useEffect(() => {
    console.log("packageData: ",packageData);
    if (packageData?.data) {
      const pkg = packageData.data;
      setFormData({
        name: pkg.name,
        description: pkg.description || { en: "", am: "" },
        basePrice: pkg.basePrice,
        minGuests: pkg.minGuests || null,
        maxGuests: pkg.maxGuests || null,
        bannerImage: null, // Can't set the file object from API response
        includesHall: !!pkg.hall,
        hall: {
          capacity: pkg.hall?.capacity || null,
          images: []
        },
        foods: pkg.foods?.map(food => food._id) || [],
        drinks: pkg.drinks?.map(drink => drink._id) || [],
        services: pkg.services || [],
        isActive: pkg.isActive,
        forCatering: pkg.forCategring || false, // Note: API has a typo 'forCategring'
        isCustom: pkg.isCustom || false,
        isCatering: pkg.isCatering || false,
        perPerson: pkg.perPerson || false,
        perPersonPrice: pkg.perPersonPrice || 0
      });
      
      setIsCustomPackage(pkg.isCustom || false);
      // Mark all steps as completed initially for edit mode
      setCompletedSteps(['base', 'hall', 'food', 'services']);
    }
  }, [packageData]);

  const steps: { id: PackageStepType; label: string }[] = [
    { id: "base", label: "Package Details" },
    { id: "hall", label: "Hall Information" },
    { id: "food", label: "Foods & Drinks" },
    { id: "services", label: "Additional Services" },
    { id: "preview", label: "Activate" }
  ];

  const updateFormData = (data: Partial<CreatePackageFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    
    if (data.hasOwnProperty('isCustom')) {
      setIsCustomPackage(!!data.isCustom);
    }
  };

  const handleStepComplete = (nextStep: PackageStepType) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    
    if (isCustomPackage && currentStep === 'base') {
      setCurrentStep('preview');
      setCompletedSteps(['base', 'hall', 'food', 'services']);
    } else {
      setCurrentStep(nextStep);
    }
  };
  
  const handlePrevious = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleSkipHall = () => {
    updateFormData({ includesHall: false });
    handleStepComplete("food");
  };

  const handleUpdatePackage = () => {
    toast.success("Package updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    
    setTimeout(() => {
      router.push(RouteEnums.PACKAGE);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="ml-2">Loading package data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">Failed to load package data</div>
        <Button 
          label="Go Back" 
          variant="primary" 
          onClick={() => router.push(RouteEnums.PACKAGE)}
        />
      </div>
    );
  }

  const renderFormStep = () => {
    switch (currentStep) {
      case "base":
        return (
          <BasePackageForm
            defaultValues={formData}
            onContinue={(data) => {
              updateFormData(data);
              handleStepComplete("hall");
            }}
            setIsCustomPackage={setIsCustomPackage}
          />
        );
      case "hall":
        return (
          <HallPackageForm
            defaultValues={formData}
            onContinue={() => handleStepComplete("food")}
            onSkip={handleSkipHall}
            onPrevious={handlePrevious}
            packageIds={packageId}
          />
        );
      case "food":
        return (
          <FoodPackageForm
            formData={formData}
            updateFormData={updateFormData}
            onContinue={() => handleStepComplete("services")}
            onPrevious={handlePrevious}
          />
        );
      case "services":
        return (
          <ServicesPackageForm
            formData={formData}
            updateFormData={updateFormData}
            onContinue={() => handleStepComplete("preview")}
            onPrevious={handlePrevious}
          />
        );
      case "preview":
        return (
          <PackagePreview
            defaultValues={formData}
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleUpdatePackage}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto px-4 md:px-8 2xl:px-0">
      <ToastContainer />
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-dark dark:text-white">
            Edit Package
          </h2>
          <p className="text-body-color dark:text-dark-6 mt-1">
            Update package information by completing all steps
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            label="Cancel"
            variant="outlinePrimary"
            onClick={() => router.push(RouteEnums.PACKAGE)}
          />
          {currentStep !== "base" && (
            <Button
              label="Back"
              icon={<ArrowLeft className="h-4 w-4 mr-2" />}
              variant="outlinePrimary"
              onClick={handlePrevious}
            />
          )}
        </div>
      </div>

      {isCustomPackage && currentStep !== 'base' && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
          <p className="font-medium">Custom Package Mode</p>
          <p className="text-sm">This is a custom package. The intermediate steps are skipped as customers will contact you to customize their package.</p>
        </div>
      )}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = completedSteps.includes(step.id);
            const isDisabled = isCustomPackage && step.id !== 'base' && step.id !== 'preview';
            
            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-primary text-white' : isCompleted ? 'bg-success text-white' : 'bg-gray-200 text-gray-500 dark:bg-dark-3 dark:text-dark-6'} ${isDisabled ? 'opacity-50' : ''}`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="ml-2 hidden md:block">
                  <p
                    className={`text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-body-color dark:text-dark-6'} ${isDisabled ? 'opacity-50' : ''}`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`ml-auto mr-auto h-px w-full max-w-[100px] ${isCompleted && steps[index + 1].id === currentStep ? 'bg-primary' : isCompleted ? 'bg-success' : 'bg-gray-200 dark:bg-dark-3'} ${isDisabled ? 'opacity-50' : ''}`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>{renderFormStep()}</div>
    </div>
  );
}