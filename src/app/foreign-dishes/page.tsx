"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import MenuItems from "@/components/localfood/menu/MenuItems";
import foreignMenuData from "@/data/foreignMenuItems.json";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import { useGetPublicCategoriesQuery } from "@/store/services/category.service";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Landingpage/Footer";

export default function ForeignDishesPage() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: categoriesResponse, isLoading } = useGetPublicCategoriesQuery({ isTraditional: false, page: 1, limit: 10 });
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    const newUrl = `/?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
    setActiveCategory(categoryId);
    
    if (categoryId === "all") {
      dispatch(setSelectedCategory("temp-reset"));
      setTimeout(() => {
        dispatch(setSelectedCategory("all"));
      }, 50);
    } else {
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
            American Dishes
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            prepared with authentic recipes and techniques
          </p>
        </div>
      </section>
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categoriesResponse?.data?.map((category: any) => (
              <button
                key={category._id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category._id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleCategoryChange(category._id)}
              >
                {category.name.en}
              </button>
            ))}
          </div>
        </div>
      </section>
      <MenuItems type="foreign" title="Foreign Dishes" isTraditional={false} />
      <Footer/>
    </div>
  );
}
