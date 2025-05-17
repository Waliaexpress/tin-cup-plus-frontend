"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import { useGetPublicCategoriesQuery } from "@/store/services/category.service";

const getRandomColor = () => {
  const colors = [
    { bg: '#FEF3C7', text: '#92400E', hoverBg: '#FDE68A' },
    { bg: '#DCFCE7', text: '#166534', hoverBg: '#BBF7D0' },
    { bg: '#DBEAFE', text: '#1E40AF', hoverBg: '#BFDBFE' },
    { bg: '#E0E7FF', text: '#3730A3', hoverBg: '#C7D2FE' },
    { bg: '#FCE7F3', text: '#9D174D', hoverBg: '#FBCFE8' },
    { bg: '#FEE2E2', text: '#991B1B', hoverBg: '#FECACA' },
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Categories = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { data: categoriesResponse, isLoading } = useGetPublicCategoriesQuery({ isTraditional: false });
  const categories = categoriesResponse?.data || [];

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.length > 0) {
      const foundCategory = categories.find((cat: any) => cat._id === categoryParam);
      if (foundCategory) {
        setSelectedCategoryId(foundCategory._id);
        dispatch(setSelectedCategory(foundCategory._id));
      }
    }
  }, [searchParams, categories, dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    dispatch(setSelectedCategory(categoryId));
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    const newUrl = `/?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
          Explore Our Categories
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((category: any) => {
            const color = getRandomColor();
            const isSelected = selectedCategoryId === category._id;
            
            return (
              <div 
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className="flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: isSelected ? color.hoverBg : color.bg,
                  borderColor: isSelected ? color.text : 'transparent',
                  border: isSelected ? `2px solid ${color.text}` : '2px solid transparent'
                }}
              >
                <div className="w-16 h-16 mb-2 rounded-lg overflow-hidden relative">
                  {category.image && category.image.fileUrl ? (
                    <Image 
                      src={category?.image?.fileUrl} 
                      alt={category?.name?.en}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: `${color.bg}90`, color: color.text }}
                    >
                      {category.name.en.charAt(0)}
                    </div>
                  )}
                </div>
                
                <h3 className="text-center text-sm font-medium" style={{ color: color.text }}>
                  {category.name.en}
                </h3>
                
                {category.description && (
                  <p className="text-xs text-center mt-1 line-clamp-1" style={{ color: color.text + '99' }}>
                    {category.description.en}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            href="/menu" 
            className="inline-block px-5 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors text-sm"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
