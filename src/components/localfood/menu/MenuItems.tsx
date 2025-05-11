"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import traditionalMenuData from "@/data/menuItems.json";
import foreignMenuData from "@/data/foreignMenuItems.json";

const MenuItem = dynamic(() => import("./MenuItem"), { ssr: false });
const SwiperComponent = dynamic(() => import("./SwiperMenu"), { ssr: false });

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const MenuItems = ({title, type = "traditional"}: {title?: string, type?: "traditional" | "foreign"}) => {
  
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("special-dishes");
  const [items, setItems] = useState<any[]>([]);
  const [menuTitle, setMenuTitle] = useState<string>("");
  useEffect(() => {
    setMenuTitle(title || "Special Dishes");
  }, [title]);
  const selectedCategory = useSelector((state: any) => 
    mounted ? state.category?.selectedCategory : null
  );

  const menuData = type === "traditional" ? traditionalMenuData : foreignMenuData;

  useEffect(() => {
    setMounted(true);
    
    const defaultCategoryId = type === "traditional" ? "special-dishes" : "all";
    const defaultCategory = menuData.categories.find(cat => cat.id === defaultCategoryId);
    if (defaultCategory) {
      if (type === "foreign" && defaultCategoryId === "all") {
        const allItems = menuData.categories
          .filter(cat => cat.id !== "all")
          .flatMap(cat => cat.items);
        setItems(allItems);
      } else {
        setItems(defaultCategory.items);
      }
    }
  }, [type, menuData]);
  
  useEffect(() => {
    if (!mounted) return;
    
    if (selectedCategory) { 
      setActiveCategory(selectedCategory);
    }

    const category = menuData.categories.find((cat) => cat.id === activeCategory);
    if (category) {
      setItems(category.items);
    }
  }, [selectedCategory, activeCategory, mounted]);

  const handleAddToCart = (itemId: string) => {
    if (!mounted) return;
    
    const itemToAdd = items.find((item) => item.id === itemId);
    if (itemToAdd) {
      dispatch({
        type: "cart/addItem",
        payload: {
          id: itemToAdd.id,
          name: itemToAdd.name,
          price: itemToAdd.price,
          quantity: 1,
          image: itemToAdd.image
        }
      });
    }
  };

  const activeCategoryName = title || "Special Dishes"; 
  
  useEffect(() => {
    if (mounted) {
      const categoryName = menuData.categories.find(cat => cat.id === activeCategory)?.name || "Special Dishes";
      const titleElement = document.getElementById('category-title');
      if (titleElement) {
        titleElement.textContent = categoryName;
      }
    }
  }, [activeCategory, mounted]);
  if (!mounted) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
           {menuTitle}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((placeholder) => (
              <div 
                key={placeholder} 
                className="bg-white rounded-lg shadow-md overflow-hidden h-72 animate-pulse"
              >
                <div className="h-48 w-full bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 id="category-title" className="text-3xl font-serif font-semibold mb-8 text-center">
          {activeCategoryName}
        </h2>

        {/* Mobile View: Swiper for smaller screens */}
        <div className="md:hidden">
          <SwiperComponent 
            items={items} 
            onAddToCart={handleAddToCart} 
          />
        </div>

        {/* Desktop View: Grid for larger screens */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              unit={item.unit}
              image={item.image}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
