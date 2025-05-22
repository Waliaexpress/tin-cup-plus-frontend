import { useEffect, useState } from "react";
import { Button } from "@/components/ui-elements/button";
import { ArrowRight, ArrowLeft, Search, Check, X } from "lucide-react";
import { CreatePackageFormData } from "@/types/package";
import Image from "next/image";

import {  useAddFoodAndDrinkToPackageMutation, useAddItemsToPackageMutation, useGetMenuItemsQuery, useGetPublicMenuItemsQuery,} from "@/store/services"

interface FoodPackageFormProps {
  formData: CreatePackageFormData;
  updateFormData: (data: Partial<CreatePackageFormData>) => void;
  onContinue: () => void;
  onPrevious?: () => void;
}
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
  const [addFoodAndDrinkToPackage, { isLoading: addItemsLoading }] =   useAddFoodAndDrinkToPackageMutation
  ();
  const [packageId, setPackageIdUrl] = useState("");
  const [foodSearch, setFoodSearch] = useState("");
  const [drinkSearch, setDrinkSearch] = useState("");
  const [limit, setLimit] = useState(50);
  const [type, setType] = useState("food");
  const [categoryId, setCategoryId] = useState<string | null>("");
  const { data: menuItemsData, isLoading: isLoadingMenuItems, error: menuItemError } = useGetMenuItemsQuery({
    page: 1, 
    limit: limit,
    enName: foodSearch,
    ...(categoryId ? { categoryId: categoryId } : {}),
    type: type,
  });

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const pkgId = urlParams.get("pkg_id") || "";
      setPackageIdUrl(pkgId);
    }, []);
  

  const toggleFoodSelection = (foodId: string, type: string) => {
    if (formData.foods?.includes(foodId)) {
      updateFormData({ 
        foods: formData.foods.filter(id => id !== foodId) 
      });
    } else {
      updateFormData({ 
        foods: [...formData.foods, foodId] 
      });
}
    }
  

  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.foods?.length === 0) {
      newErrors.foods = "Select at least one food item";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };
  
  const handleSubmit = async () => {
    if (validate()) {
      const data = {
        itemIds: formData.foods,
        type: type+"s",
      };
      console.log("DATA", data)
      await addFoodAndDrinkToPackage({
        packageId: packageId.toString(),
        items: data
      });
      
      onContinue();
    }
  };
  const setTypeofMenu = (type: string) => {
    setType(type);
  };
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Foods & Drinks Selection</h3>
      
      <div className="grid grid-cols-1 ">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Foods <span className="text-red-500">*</span></h4>
            <div className="relative max-w-[450px] w-full min-w-[300px] flex gap-3">
              <select
                value={type}
                onChange={(e) => setTypeofMenu(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-primary focus:border-primary"
              >
              
                <option value="food">Food</option>
                <option value="drink">Drink</option>
              </select>
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
              {menuItemsData?.data?.menuItems?.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Select
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Picture
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Special 
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {menuItemsData && menuItemsData?.data?.menuItems.map((menuItem : any) => (
                      <tr 
                        key={menuItem?._id} 
                        onClick={() => toggleFoodSelection(menuItem?._id, menuItem?.type)}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          formData.foods.includes(menuItem?._id) ? "bg-primary bg-opacity-10" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-6 w-6 rounded-full border ${
                              formData.foods.includes(menuItem._id) 
                                ? "border-primary text-primary" 
                                : "border-gray-300 text-transparent"
                            } flex items-center justify-center`}>
                              {formData.foods.includes(menuItem._id) && <Check className="h-4 w-4" />}
                            </div>
                          </div>
                        </td>
                        <td>
                          <Image 
                            src={menuItem?.images?.[0]?.fileUrl}
                            alt={menuItem?.name?.en}
                            width={50}
                            height={50}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{menuItem?.name?.en}</div>
                          <div className="text-sm text-gray-500">{menuItem?.name?.am}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {menuItem?.price} $
                        </td>
                        <td>
                          {
                            menuItem?.isSpecial ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Special
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Regular
                              </span>
                            )
                          }
                        </td>
                      </tr>
                    ))}
                    <tr className="flex items-center justify-center w-full">
                      <td className="flex items-center justify-center my-3">
                        <div
                        className="px-2 py-1 bg-primary text-white rounded-md cursor-pointer"
                          onClick={() => setLimit(limit + 10)}
                          
                        >{isLoadingMenuItems ? "Loading..." : "Load More"}</div>
                      </td>
                    </tr>
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
