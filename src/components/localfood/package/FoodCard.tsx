import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Utensils } from "lucide-react";
import { PackageFood } from "@/types/packages";


const FoodCard = ({ food }: { food: PackageFood }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-44 w-full overflow-hidden">
        {food.images && food.images.length > 0 ? (
          <Image
            src={food.images[0].fileUrl}
            alt={food.name?.en || food.name?.am || 'Food image'}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-500 hover:scale-110"
            priority
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100">
            <Utensils size={32} className="text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">
          {food.name?.en || food.name?.am || 'Unnamed Food'}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {food.description?.en || food.description?.am || 'No description available'}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-primary font-medium">${food.price?.toFixed(2)}</span>
          {food.isSpecial && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Special
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
