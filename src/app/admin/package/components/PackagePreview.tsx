import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { Check, ArrowLeft, MapPin, Users, Coffee, Wine, Utensils, DollarSign } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import Image from "next/image";
import Toggle from "@/components/common/Toggle";

interface PackagePreviewProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onSubmit: () => void;
  onPrevious?: () => void;
}

// Mock data for demonstration
const mockFoods = [
  { id: "food1", name: { en: "Injera with Doro Wat", am: "ዶሮ ወጥ" }, price: 12.99, category: "Main Course" },
  { id: "food2", name: { en: "Tibs", am: "ጥብስ" }, price: 14.99, category: "Main Course" },
  { id: "food3", name: { en: "Kitfo", am: "ክትፎ" }, price: 15.99, category: "Main Course" },
  { id: "food4", name: { en: "Shiro", am: "ሽሮ" }, price: 10.99, category: "Main Course" },
  { id: "food5", name: { en: "Misir Wat", am: "ምስር ወጥ" }, price: 9.99, category: "Side Dish" },
  { id: "food6", name: { en: "Gomen", am: "ጎመን" }, price: 8.99, category: "Side Dish" },
  { id: "food7", name: { en: "Atakilt Wat", am: "አታክልት ወጥ" }, price: 8.99, category: "Side Dish" },
  { id: "food8", name: { en: "Azifa", am: "አዚፋ" }, price: 7.99, category: "Appetizer" }
];

const mockDrinks = [
  { id: "drink1", name: { en: "Ethiopian Coffee", am: "ቡና" }, price: 3.99, category: "Hot Beverages" },
  { id: "drink2", name: { en: "Tej (Honey Wine)", am: "ጠጅ" }, price: 6.99, category: "Alcoholic" },
  { id: "drink3", name: { en: "Mango Juice", am: "የማንጎ ጁስ" }, price: 4.99, category: "Juice" },
  { id: "drink4", name: { en: "Avocado Juice", am: "የአቮካዶ ጁስ" }, price: 5.99, category: "Juice" },
  { id: "drink5", name: { en: "Coca-Cola", am: "ኮካ-ኮላ" }, price: 2.99, category: "Soft Drinks" },
  { id: "drink6", name: { en: "Bottled Water", am: "ውሃ" }, price: 1.99, category: "Water" }
];

export default function PackagePreview({ formData, updateFormData, onSubmit, onPrevious }: PackagePreviewProps) {
  const selectedFoods = mockFoods.filter(food => formData.foods.includes(food.id));
  const selectedDrinks = mockDrinks.filter(drink => formData.drinks.includes(drink.id));
  
  const handleToggleActive = (isActive: boolean) => {
    updateFormData({ isActive });
  };
  
  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Package Summary & Activation</h3>
      <p className="text-gray-600">
        Review all the details of your package before activating it. Once activated, the package will be visible to customers.
      </p>
      
      {/* Banner and Basic Info */}
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        {formData.bannerImage && (
          <div className="relative w-full h-48 sm:h-64 bg-gray-200">
            <Image
              src={URL.createObjectURL(formData.bannerImage)}
              alt={formData.name.en}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{formData.name.en}</h2>
              <p className="text-lg text-gray-600">{formData.name.am}</p>
            </div>
            <div className="flex items-center bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full">
              <DollarSign className="h-5 w-5 mr-1" />
              <span className="font-semibold">${formData.basePrice.toFixed(2)}</span>
            </div>
          </div>
          
          {formData.description && (
            <p className="text-gray-700 mb-4">{formData.description}</p>
          )}
          
          <div className="flex flex-wrap gap-3">
            {formData.minGuests !== null && formData.maxGuests !== null && (
              <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                <Users className="h-4 w-4 mr-1" />
                <span>{formData.minGuests} - {formData.maxGuests} Guests</span>
              </div>
            )}
            
            {formData.includesHall && (
              <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Includes Hall</span>
              </div>
            )}
            
            <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              <Utensils className="h-4 w-4 mr-1" />
              <span>{selectedFoods.length} Foods</span>
            </div>
            
            <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              <Wine className="h-4 w-4 mr-1" />
              <span>{selectedDrinks.length} Drinks</span>
            </div>
            
            <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              <Coffee className="h-4 w-4 mr-1" />
              <span>{formData.services.length} Services</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hall Information */}
      {formData.includesHall && (
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Hall Information</h3>
          
          <p className="mb-4">
            <span className="font-medium">Capacity:</span> {formData.hall.capacity} people
          </p>
          
          {formData.hall.images.length > 0 && (
            <div>
              <h4 className="text-md font-medium mb-2">Hall Images</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.hall.images.map((image, index) => (
                  <div key={index} className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md">
                    <div className="relative w-full h-32">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Hall image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Food and Drinks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Food Items */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Food Items ({selectedFoods.length})</h3>
          
          {selectedFoods.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {selectedFoods.map((food) => (
                <li key={food.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium">{food.name.en}</h5>
                      <span className="text-sm text-gray-500">{food.name.am}</span>
                    </div>
                    <span className="text-gray-600">${food.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{food.category}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No food items selected</p>
          )}
        </div>
        
        {/* Drink Items */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Drink Items ({selectedDrinks.length})</h3>
          
          {selectedDrinks.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {selectedDrinks.map((drink) => (
                <li key={drink.id} className="py-3">
                  <div className="flex justify-between">
                    <div>
                      <h5 className="font-medium">{drink.name.en}</h5>
                      <span className="text-sm text-gray-500">{drink.name.am}</span>
                    </div>
                    <span className="text-gray-600">${drink.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{drink.category}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No drink items selected</p>
          )}
        </div>
      </div>
      
      {/* Services */}
      {formData.services.length > 0 && (
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Additional Services ({formData.services.length})</h3>
          
          <ul className="divide-y divide-gray-200">
            {formData.services.map((service, index) => (
              <li key={index} className="py-3">
                <div>
                  <h5 className="font-medium">{service.name.en}</h5>
                  <span className="text-sm text-gray-500">{service.name.am}</span>
                </div>
                {service.description && (
                  <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Activation Section */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Activate Package</h3>
            <p className="text-gray-600 text-sm">
              Toggle to make this package visible to customers
            </p>
          </div>
          <Toggle
            id="toggle-active"
            checked={formData.isActive}
            onChange={handleToggleActive}
          />
        </div>
      </div>
      
      {/* Submit Button */}
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
          label="Create Package"
          icon={<Check className="h-5 w-5 ml-2" />}
          variant="primary"
          onClick={onSubmit}
          className="px-8 ml-auto"
        />
      </div>
    </div>
  );
}
