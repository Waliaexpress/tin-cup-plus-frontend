"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const defaultFormData: CreatePackageFormData = {
  name: { en: "", am: "" },
  description: "",
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
  isActive: false
};

export default function CreatePackagePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PackageStepType>("base");
  const [formData, setFormData] = useState<CreatePackageFormData>(defaultFormData);
  const [completedSteps, setCompletedSteps] = useState<PackageStepType[]>([]);

  const steps: { id: PackageStepType; label: string }[] = [
    { id: "base", label: "Package Details" },
    { id: "hall", label: "Hall Information" },
    { id: "food", label: "Foods & Drinks" },
    { id: "services", label: "Additional Services" },
    { id: "preview", label: "Review & Activate" }
  ];

  const updateFormData = (data: Partial<CreatePackageFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleStepComplete = (nextStep: PackageStepType) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep(nextStep);
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

  const handleCreatePackage = () => {
    toast.success("Package created successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    
    console.log("Package data:", formData);
    
    setTimeout(() => {
      router.push(RouteEnums.PACKAGE);
    }, 2000);
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case "base":
        return (
          <BasePackageForm
            formData={formData}
            updateFormData={updateFormData}
            onContinue={() => handleStepComplete("hall")}
          />
        );
      case "hall":
        return (
          <HallPackageForm
            formData={formData}
            updateFormData={updateFormData}
            onContinue={() => handleStepComplete("food")}
            onSkip={handleSkipHall}
            onPrevious={handlePrevious}
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
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleCreatePackage}
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
      
      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-dark dark:text-white">
            Create New Package
          </h2>
          <p className="text-body-color dark:text-dark-6 mt-1">
            Create a new package by completing all steps
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

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = completedSteps.includes(step.id);
            const isDisabled = !isActive && !isCompleted;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      isActive
                        ? "border-primary bg-primary text-white"
                        : isCompleted
                        ? "border-primary bg-white text-primary"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-sm ${
                      isActive || isCompleted
                        ? "text-primary"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-12 md:w-28 ${
                      isCompleted ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-stroke p-6 md:p-8">
        {renderFormStep()}
      </div>
    </div>
  );
}
