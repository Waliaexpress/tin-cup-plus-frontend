"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Utensils, Coffee, Pizza, Salad, IceCream } from "lucide-react";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import type { RootState } from "@/store/store";

const categoryColors = {
  'cat-1': { bg: '#FEF3C7', text: '#92400E', icon: Utensils, hoverBg: '#FDE68A' },  // Amber for main dishes
  'cat-2': { bg: '#DCFCE7', text: '#166534', icon: Salad, hoverBg: '#BBF7D0' },      // Green for vegetarian
  'cat-3': { bg: '#DBEAFE', text: '#1E40AF', icon: Pizza, hoverBg: '#BFDBFE' },      // Blue for appetizers
  'cat-4': { bg: '#E0E7FF', text: '#3730A3', icon: Coffee, hoverBg: '#C7D2FE' },     // Indigo for beverages
  'cat-5': { bg: '#FCE7F3', text: '#9D174D', icon: IceCream, hoverBg: '#FBCFE8' },   // Pink for desserts
};

const Categories = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector((state: RootState) => state.category);

  // Sync selected category with URL query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const category = categories.find(cat => cat.slug === categoryParam);
      if (category) {
        dispatch(setSelectedCategory(category.id));
      }
    }
  }, [searchParams, categories, dispatch]);

  const handleCategoryClick = (categoryId: string, slug: string) => {
    // First dispatch the action to update the Redux store
    dispatch(setSelectedCategory(categoryId));
    
    // Update URL without causing a navigation/refresh
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', slug);
    
    // Use window.history to update the URL without navigation
    const newUrl = `/?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
          Explore Our Categories
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((category) => {
            const color = categoryColors[category.id as keyof typeof categoryColors] || 
                        { bg: '#F3F4F6', text: '#374151', icon: Utensils, hoverBg: '#E5E7EB' };
            const IconComponent = color.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <div 
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.slug)}
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? `bg-${color.hoverBg} border-2 border-${color.text} shadow-md` 
                    : `bg-${color.bg} hover:bg-${color.hoverBg} border-2 border-transparent`
                }`}
                style={{
                  backgroundColor: isSelected ? color.hoverBg : color.bg,
                  borderColor: isSelected ? color.text : 'transparent',
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${color.bg}40`, color: color.text }}
                >
                  <IconComponent size={24} />
                </div>
                
                <h3 className="text-center font-medium" style={{ color: color.text }}>
                  {category.name.en}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {category.tags.slice(0, 1).map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: `${color.bg}80`, color: color.text }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/menu" 
            className="inline-block px-6 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            View All Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
