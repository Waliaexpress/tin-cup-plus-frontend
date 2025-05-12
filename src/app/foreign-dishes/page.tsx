"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MenuItems from "@/components/localfood/menu/MenuItems";
import foreignMenuData from "@/data/foreignMenuItems.json";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import MainNavigation from "@/components/layout/navigation/MainNavigation";

export default function ForeignDishesPage() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Get categories from the JSON data
  const categories = foreignMenuData.categories;

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Special handling for "all" category
    if (categoryId === "all") {
      // For "all" category, we need a special approach
      // First reset by using a temporary different category
      dispatch(setSelectedCategory("temp-reset"));
      
      // Then set it back to "all" after a short delay
      setTimeout(() => {
        dispatch(setSelectedCategory("all"));
      }, 50);
    } else {
      // For other categories, just dispatch normally
      dispatch(setSelectedCategory(categoryId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <section className="relative h-80 flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://c7.alamy.com/comp/2D4Y728/traditional-indian-cuisine-indian-recipes-food-various-panorama-banner-2D4Y728.jpg"
            alt="Foreign Dishes"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Foreign Dishes
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore international flavors from around the world, prepared with authentic recipes and techniques
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <MenuItems type="foreign" title="Foreign Dishes" />

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Try Our Ethiopian Specialties
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            While you're here, don't miss our authentic Ethiopian dishes prepared with traditional recipes and spices.
          </p>
          <Link 
            href="/" 
            className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Explore Ethiopian Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
