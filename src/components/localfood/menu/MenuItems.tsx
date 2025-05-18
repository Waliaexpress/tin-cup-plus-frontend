"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { useGetPublicMenuItemsQuery } from "@/store/services/menuItem.service";
import { useSearchParams } from "next/navigation";

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

const MenuItems = ({title, type = "traditional", isSpecial = true, isTraditional = true}: {title?: string, type?: "traditional" | "foreign", isSpecial?: boolean, isTraditional?: boolean}) => {
  
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("special-dishes");
  const [items, setItems] = useState<any[]>([]);
  const [menuTitle, setMenuTitle] = useState<string>("");
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const {data: menuItemsResponse, isLoading: menuItemsLoading} = useGetPublicMenuItemsQuery({ page: 1, limit: 10, isTraditional: isTraditional, categoryId: categoryId });
  useEffect(() => {
    setMenuTitle(title || "Special Dishes");
  }, [title]);
  const selectedCategory = useSelector((state: any) => 
    mounted ? state.category?.selectedCategory : null
  );

  console.log("menuItemsResponse", menuItemsResponse)
  useEffect(() => {
    setMounted(true);
    
    if (menuItemsResponse?.data?.menuItems && menuItemsResponse?.data?.menuItems.length > 0) {
      setItems(menuItemsResponse?.data?.menuItems);
    } else {
      setItems([]);
    }
  }, [menuItemsResponse]);
  
  useEffect(() => {
    if (!mounted) return;
    
    if (selectedCategory) { 
      setActiveCategory(selectedCategory);
    }

    if (menuItemsResponse?.data?.menuItems && menuItemsResponse?.data?.menuItems.length > 0) {
      if (categoryId) {
        const filteredItems = menuItemsResponse?.data?.menuItems.filter((item: any) => 
          item.category && item.category._id === categoryId
        );
        setItems(filteredItems.length > 0 ? filteredItems : menuItemsResponse?.data?.menuItems);
      } else {
        setItems(menuItemsResponse.data.menuItems);
      }
    } else {
      setItems([]);
    }
  }, [selectedCategory, activeCategory, mounted, menuItemsResponse, categoryId]);

  const handleAddToCart = (itemId: string) => {
    if (!mounted) return;
    
    const itemToAdd = items.find((item) => {
      return (item._id !== undefined) ? item._id === itemId : item.id === itemId;
    });
    
    if (itemToAdd) {
      const isApiItem = itemToAdd._id !== undefined;
      
      dispatch({
        type: "cart/addItem",
        payload: {
          id: isApiItem ? itemToAdd._id : itemToAdd.id,
          name: isApiItem ? itemToAdd.name.en : itemToAdd.name,
          price: itemToAdd.price,
          quantity: 1,
          image: isApiItem ? 
            (itemToAdd.images && itemToAdd.images.length > 0 ? itemToAdd.images[0].fileUrl : '') : 
            itemToAdd.image
        }
      });
    }
  };

  const activeCategoryName = title || "Menu Items"; 
  
  useEffect(() => {
    if (mounted) {
      let categoryName = "Menu Items";
      
      if (categoryId && menuItemsResponse?.data?.menuItems && menuItemsResponse.data.menuItems.length > 0) {
        const item = menuItemsResponse.data.menuItems.find((item: any) => 
          item.category && item.category._id === categoryId
        );
        if (item?.category?.name?.en) {
          categoryName = item.category.name.en;
        }
      }
      
      const titleElement = document.getElementById('category-title');
      if (titleElement) {
        titleElement.textContent = categoryName;
      }
    }
  }, [activeCategory, mounted, categoryId, menuItemsResponse, title]);
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

        <div className="md:hidden">
          <SwiperComponent 
            items={items.map(item => {
              const isApiItem = item._id !== undefined;
              return {
                id: isApiItem ? item._id : item.id,
                name: isApiItem ? item.name.en : item.name,
                description: isApiItem ? item.description.en : item.description,
                price: item.price,
                unit: isApiItem ? 'item' : item.unit,
                image: isApiItem ? (item.images && item.images.length > 0 ? item.images[0].fileUrl : '') : item.image
              };
            })} 
            onAddToCart={handleAddToCart} 
          />
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const isApiItem = item._id !== undefined;
            
            return (
              <MenuItem
                key={isApiItem ? item._id : item.id}
                id={isApiItem ? item._id : item.id}
                name={isApiItem ? item.name.en : item.name}
                description={isApiItem ? item.description.en : item.description}
                price={item.price}
                unit={isApiItem ? 'item' : item.unit}
                image={isApiItem ? (item.images && item.images.length > 0 ? item?.images?.[0]?.fileUrl : '') : item.image}
                onAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
