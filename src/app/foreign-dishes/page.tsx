"use client";
import { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import MenuItems from "@/components/localfood/menu/MenuItems";
import foreignMenuData from "@/data/foreignMenuItems.json";
import { setSelectedCategory } from "@/store/slices/categorySlice";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import { useGetPublicCategoriesQuery } from "@/store/services/category.service";
import { usePathname } from "next/navigation";
import Footer from "@/components/Landingpage/Footer";
import CategoriesRender from "@/components/localfood/categories/CategoriesRender";


const MenuSkeleton = () => (
  <div className="animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="py-4 px-3 border-b border-dashed border-gray-800/30">
        <div className="flex gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md bg-gray-200/50"></div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-5 bg-gray-200/50 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200/50 rounded w-1/2"></div>
          </div>
          <div className="flex items-start">
            <div className="w-16 h-6 bg-gray-200/50 rounded self-center"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CategorySkeleton = () => (
  <section className="py-8 bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            className="px-6 py-2 rounded-full bg-gray-200 animate-pulse h-9 w-24"
          ></div>
        ))}
      </div>
    </div>
  </section>
);

export default function ForeignDishesPage() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: categoriesResponse, isLoading } = useGetPublicCategoriesQuery({ isTraditional: false, page: 1, limit: 10 });
  const pathname = usePathname();
  const [searchParamsState, setSearchParamsState] = useState<URLSearchParams>(
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  );
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParamsState(new URLSearchParams(window.location.search));
    }
  }, [pathname]);

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('category', categoryId);
    const newUrl = `${pathname}?${params.toString()}`;
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
            src="/images/slider_food/amdish.jpg"
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
     {isLoading ? (
        <CategorySkeleton />
      ) : (
        <CategoriesRender 
          categoriesResponse={categoriesResponse} 
          activeCategory={activeCategory} 
          handleCategoryChange={handleCategoryChange} 
        />
      )}
      <section className="md:py-8 py-3">
        <div className="md:container mx-auto md:px-4">
          <div className="md:max-w-6xl w-full mx-auto rounded-lg md:p-6 p-3 ">
            <div className="border-double  md:p-5 p-3">
              
              <div className="mb-10">
                <h2 className="text-3xl font-serif font-bold text-center text-amber-900 mb-6  pb-3">
                  Special Dishes
                </h2>
                <Suspense fallback={<MenuSkeleton />}>
                  <MenuItems type="food" title="Special Dishes" isTraditional={false} />
                </Suspense>
              </div>
              
              <div className="mb-10">
                <h2 className="text-3xl font-serif font-bold text-center text-amber-900 mb-6  pb-3">
                 Dishes
                </h2>
                <Suspense fallback={<MenuSkeleton />}>
                  <MenuItems type="food" title="Dishes" isSpecial={false} isTraditional={false} />
                </Suspense>
              </div>
              
              <div>
                <h2 className="text-3xl font-serif font-bold text-center text-amber-900 mb-6  pb-3">
                    Drinks
                </h2>
                <Suspense fallback={<MenuSkeleton />}>
                  <MenuItems type="drink" title="Drinks" isTraditional={false} isSpecial={false} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer/>
    </div>
  );
}
