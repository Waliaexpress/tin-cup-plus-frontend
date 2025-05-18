import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { ArrowRight, ArrowLeft, Plus, Trash } from "lucide-react";
import { CreatePackageFormData, PackageService } from "@/types/package";

interface ServicesPackageFormProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onContinue: () => void;
  onPrevious?: () => void;
}

export default function ServicesPackageForm({ formData, updateFormData, onContinue, onPrevious }: ServicesPackageFormProps) {
  const [newService, setNewService] = useState<PackageService>({ name: { en: "", am: "" }, description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleServiceChange = (field: string, value: string) => {
    if (field === "name.en" || field === "name.am") {
      const [parent, child] = field.split(".");
      setNewService({
        ...newService,
        [parent]: {
          ...newService.name,
          [child]: value
        }
      });
    } else {
      setNewService({
        ...newService,
        [field]: value
      });
    }
  };

  const validateNewService = () => {
    const newErrors: Record<string, string> = {};

    if (!newService.name.en.trim()) {
      newErrors.nameEn = "English name is required";
    }

    if (!newService.name.am.trim()) {
      newErrors.nameAm = "Amharic name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addService = () => {
    if (validateNewService()) {
      updateFormData({
        services: [...formData.services, { ...newService }]
      });
      setNewService({ name: { en: "", am: "" }, description: "" });
      setErrors({});
    }
  };

  const removeService = (index: number) => {
    const updatedServices = [...formData.services];
    updatedServices.splice(index, 1);
    updateFormData({ services: updatedServices });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Additional Services</h3>
      <p className="text-gray-600 text-sm mb-6">
        Add optional services for this package (e.g., DJ, Decoration, Mestengdo, etc.). These services will be included in the package price.
      </p>

      {/* Existing Services List */}
      {formData.services.length > 0 && (
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3">Added Services</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="divide-y divide-gray-200">
              {formData.services.map((service, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div>
                    <h5 className="font-medium text-gray-800">{service.name.en}</h5>
                    <div className="text-sm text-gray-600 flex gap-3">
                      <span>Amharic: {service.name.am}</span>
                      {service.description && <span>| {service.description}</span>}
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                    onClick={() => removeService(index)}
                    aria-label="Remove service"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-md font-medium mb-4">Add New Service</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="service-name-en" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name (English) <span className="text-red-500">*</span>
            </label>
            <input
              id="service-name-en"
              type="text"
              className={`block w-full rounded-md py-2 px-3 border ${
                errors.nameEn ? "border-red-500" : "border-gray-300"
              } focus:border-primary focus:outline-none focus:ring-primary`}
              value={newService.name.en}
              onChange={(e) => handleServiceChange("name.en", e.target.value)}
              placeholder="e.g., Professional DJ"
            />
            {errors.nameEn && <p className="mt-1 text-sm text-red-500">{errors.nameEn}</p>}
          </div>
          
          <div>
            <label htmlFor="service-name-am" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name (Amharic) <span className="text-red-500">*</span>
            </label>
            <input
              id="service-name-am"
              type="text"
              className={`block w-full rounded-md py-2 px-3 border ${
                errors.nameAm ? "border-red-500" : "border-gray-300"
              } focus:border-primary focus:outline-none focus:ring-primary`}
              value={newService.name.am}
              onChange={(e) => handleServiceChange("name.am", e.target.value)}
              placeholder="e.g., ፕሮፌሽናል ዲጄይ"
            />
            {errors.nameAm && <p className="mt-1 text-sm text-red-500">{errors.nameAm}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="service-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="service-description"
            rows={3}
            className="block w-full rounded-md py-2 px-3 border border-gray-300 focus:border-primary focus:outline-none focus:ring-primary"
            value={newService.description || ""}
            onChange={(e) => handleServiceChange("description", e.target.value)}
            placeholder="Describe this service..."
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            label="Add Service"
            icon={<Plus className="h-4 w-4 mr-2" />}
            variant="outlinePrimary"
            onClick={addService}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        {onPrevious && (
          <Button
            label="Previous"
            icon={<ArrowLeft className="h-4 w-4 mr-2" />}
            variant="outlinePrimary"
            onClick={onPrevious}
          />
        )}
        <Button
          label="Continue to Preview"
          icon={<ArrowRight className="h-4 w-4 ml-2" />}
          variant="primary"
          onClick={onContinue}
          className="ml-auto"
        />
      </div>
    </div>
  );
}
