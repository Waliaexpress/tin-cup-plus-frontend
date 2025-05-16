import { useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { ArrowRight, ArrowLeft, Search, Check, X } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";

interface FoodPackageFormProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onContinue: () => void;
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

export default function FoodPackageForm({ formData, updateFormData, onContinue, onPrevious }: FoodPackageFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [foodSearch, setFoodSearch] = useState("");
  const [drinkSearch, setDrinkSearch] = useState("");
  
  const filteredFoods = mockFoods.filter(food => 
    food.name.en.toLowerCase().includes(foodSearch.toLowerCase()) ||
    food.name.am.includes(foodSearch)
  );
  
  const filteredDrinks = mockDrinks.filter(drink => 
    drink.name.en.toLowerCase().includes(drinkSearch.toLowerCase()) ||
    drink.name.am.includes(drinkSearch)
  );
  
  const toggleFoodSelection = (foodId: string) => {
    if (formData.foods.includes(foodId)) {
      updateFormData({ 
        foods: formData.foods.filter(id => id !== foodId) 
      });
    } else {
      updateFormData({ 
        foods: [...formData.foods, foodId] 
      });
    }
  };
  
  const toggleDrinkSelection = (drinkId: string) => {
    if (formData.drinks.includes(drinkId)) {
      updateFormData({ 
        drinks: formData.drinks.filter(id => id !== drinkId) 
      });
    } else {
      updateFormData({ 
        drinks: [...formData.drinks, drinkId] 
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.foods.length === 0) {
      newErrors.foods = "Select at least one food item";
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
      <h3 className="text-xl font-semibold mb-4">Foods & Drinks Selection</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Foods Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Foods <span className="text-red-500">*</span></h4>
            <div className="relative w-48">
              <input
                type="text"
                placeholder="Search foods..."
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {errors.foods && <p className="mt-1 text-sm text-red-500 mb-2">{errors.foods}</p>}
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-80 overflow-y-auto">
              {filteredFoods.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFoods.map((food) => (
                      <tr 
                        key={food.id} 
                        onClick={() => toggleFoodSelection(food.id)}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          formData.foods.includes(food.id) ? "bg-primary bg-opacity-10" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-6 w-6 rounded-full border ${
                              formData.foods.includes(food.id) 
                                ? "border-primary text-primary" 
                                : "border-gray-300 text-transparent"
                            } flex items-center justify-center`}>
                              {formData.foods.includes(food.id) && <Check className="h-4 w-4" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{food.name.en}</div>
                          <div className="text-sm text-gray-500">{food.name.am}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {food.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${food.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-gray-500">No foods found matching your search</div>
              )}
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            Selected: {formData.foods.length} foods
          </div>
        </div>
        
        {/* Drinks Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Drinks</h4>
            <div className="relative w-48">
              <input
                type="text"
                placeholder="Search drinks..."
                value={drinkSearch}
                onChange={(e) => setDrinkSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-80 overflow-y-auto">
              {filteredDrinks.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDrinks.map((drink) => (
                      <tr 
                        key={drink.id} 
                        onClick={() => toggleDrinkSelection(drink.id)}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          formData.drinks.includes(drink.id) ? "bg-primary bg-opacity-10" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-6 w-6 rounded-full border ${
                              formData.drinks.includes(drink.id) 
                                ? "border-primary text-primary" 
                                : "border-gray-300 text-transparent"
                            } flex items-center justify-center`}>
                              {formData.drinks.includes(drink.id) && <Check className="h-4 w-4" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{drink.name.en}</div>
                          <div className="text-sm text-gray-500">{drink.name.am}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {drink.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${drink.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-6 text-center text-gray-500">No drinks found matching your search</div>
              )}
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            Selected: {formData.drinks.length} drinks
          </div>
        </div>
      </div>
      
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
          label="Continue to Services"
          icon={<ArrowRight className="h-4 w-4 ml-2" />}
          variant="primary"
          onClick={handleSubmit}
          className="ml-auto"
        />
      </div>
    </div>
  );
}
