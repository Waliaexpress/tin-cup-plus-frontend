"use client";

import { Home, MapPin, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { RouteEnums } from "@/routes/Routes";
import { useEffect, useState } from "react";

const MobileNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuNavigation = () => {
    if (pathname === RouteEnums.ETHIOPIAN_DISHES) {
      router.push(RouteEnums.ETHIOPIAN_DISHES);
    } else {
      router.push(RouteEnums.FOREIGN_DISHES);
    }
  };

  const navItems = [
    {
      name: "Home",
      icon: <Home size={24} />,
      route: "/",
      active: pathname === "/",
      onClick: () => router.push("/")
    },
    {
      name: "Menu",
      icon: <Menu size={24} />,
      route: "#",
      active: pathname === RouteEnums.ETHIOPIAN_DISHES || pathname === RouteEnums.FOREIGN_DISHES,
      onClick: handleMenuNavigation
    },
    {
      name: "Location",
      icon: <MapPin size={24} />,
      route: RouteEnums.HOURS_LOCATION,
      active: pathname === RouteEnums.HOURS_LOCATION,
      onClick: () => router.push(RouteEnums.HOURS_LOCATION)
    }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden" 
      initial={{ y: 100 }}
      animate={{ 
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
    >
      <div className="bg-white border-t border-gray-200 shadow-lg px-2 py-3 flex justify-around items-center">
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            className={`flex flex-col items-center justify-center w-20 py-1 rounded-lg ${
              item.active ? "text-primary-600" : "text-gray-600"
            }`}
            onClick={item.onClick}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.icon}
            </motion.div>
            <span className="text-xs font-medium mt-1">{item.name}</span>
            {item.active && (
              <motion.div
                className="h-1 w-6 bg-primary-600 rounded-full mt-1"
                layoutId="activeTab"
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
