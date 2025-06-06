"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { useGetPublicMenuItemsQuery } from "@/store/services/menuItem.service";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Utensils } from "lucide-react";

const MenuItem = dynamic(() => import("./MenuItem"), { ssr: false });

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

const MenuItems = ({ title, type = "food", isSpecial = true, isTraditional = true }: { title?: string, type?: "food" | "drink", isSpecial?: boolean, isTraditional?: boolean }) => {

  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("special-dishes");
  const [items, setItems] = useState<any[]>([]);
  const [menuTitle, setMenuTitle] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    try {
      const category = searchParams?.get('category');
      if (category && category.trim() !== '') {
        setCategoryId(category);
      } else {
        setCategoryId(null);
      }
    } catch (error) {
      console.error('Error extracting category from URL:', error);
      setCategoryId(null);
    }
  }, [searchParams]);
  const { data: menuItemsResponse, isLoading: menuItemsLoading, refetch } = useGetPublicMenuItemsQuery({ page: 1, limit: limit, isSpecial: isSpecial, isTraditional: isTraditional, categoryId: categoryId, type: type });
  useEffect(() => {
    setMenuTitle(title || "Dishes");
  }, [title]);
  const selectedCategory = useSelector((state: any) =>
    mounted ? state.category?.selectedCategory : null
  );

  useEffect(() => {
    refetch();
  }, [categoryId]);

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

    if (menuItemsResponse?.data?.menuItems && menuItemsResponse?.data?.menuItems?.length > 0) {
      if (categoryId) {
        const filteredItems = menuItemsResponse?.data?.menuItems?.filter((item: any) =>
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
      return (item._id !== undefined) ? item?._id === itemId : item?.id === itemId;
    });

    if (itemToAdd) {
      const isApiItem = itemToAdd._id !== undefined;

      dispatch({
        type: "cart/addItem",
        payload: {
          id: isApiItem ? itemToAdd._id : itemToAdd.id,
          name: isApiItem ? itemToAdd?.name?.en : itemToAdd?.name,
          price: itemToAdd?.price,
          quantity: 1,
          image: isApiItem ?
            (itemToAdd?.images && itemToAdd?.images?.length > 0 ? itemToAdd?.images?.[0]?.fileUrl : '') :
            itemToAdd?.image
        }
      });
    }
  };

  const activeCategoryName = title || "Menu Items";

  useEffect(() => {
    if (mounted) {
      let categoryName = "Menu Items";

      if (categoryId && menuItemsResponse?.data?.menuItems && menuItemsResponse?.data?.menuItems.length > 0) {
        const item = menuItemsResponse?.data?.menuItems.find((item: any) =>
          item.category && item.category._id === categoryId
        );
        if (item?.category?.name?.en) {
          categoryName = item.category.name.en;
        }
      }
    }
  }, [activeCategory, mounted, categoryId, menuItemsResponse, title]);
  if (!mounted) {
    return (
      <div className="animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="py-4 px-3 border-b border-dashed border-gray-200/30">
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
  }
  if ( menuItemsResponse?.data?.menuItems?.length === 0 )
  {
    return <></>
  }
  return (
    <>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="divide-y divide-dashed divide-gray-200/30"
            >
              <h2 className="text-3xl font-serif font-bold text-center text-amber-900 mb-6  pb-3">
                  {menuTitle} 
                </h2>
              {items.map((item) => {
                const isApiItem = item._id !== undefined;

                return (
                  <motion.div 
                    key={isApiItem ? item._id : item?.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuItem
                      id={isApiItem ? item?._id : item?.id}
                      name={isApiItem ? item?.name?.en : item?.name}
                      description={isApiItem ? item?.description?.en : item?.description}
                      price={item?.price}
                      unit={isApiItem ? 'item' : item?.unit}
                      image={isApiItem ? (item?.images && item?.images.length > 0 ? item?.images?.[0]?.fileUrl : '') : item?.image}
                      category={isApiItem ? item?.category : null}
                      dietaryTag={isApiItem ? item?.dietaryTag : []}
                      onAddToCart={handleAddToCart}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {menuItemsResponse?.data?.count > items?.length && (
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-2 px-4 bg-gray-800 text-amber-50 font-serif rounded hover:bg-amber-700 transition-colors"
                  onClick={() => setLimit(prev => prev + 10)}
                >
                  Load More
                </motion.button>
              </div>
            )}
          </div> 
    </>
  );
};

export default MenuItems;
