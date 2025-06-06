"use client";

import { DietaryTag } from "@/types/menu-item";
import Link from "next/link";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category?: { name?: { en?: string }; _id?: string };
  dietaryTag?: DietaryTag[];
  onAddToCart: (id: string) => void;
}

const MenuItem = ({ id, name, description, price, unit, image, category, dietaryTag = [], onAddToCart }: MenuItemProps) => {
  
  return (
    <Link href={`/menu/${id}`}
      className="py-4 px-3 border-b border-dashed border-amber-800/30 hover:bg-amber-50/50 transition-colors cursor-pointer"
    >
      <div className="flex gap-4">
        {image && (
          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden border border-amber-800/20">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 justify-between items-start">
          <div className="flex-1">
           
            <h3 className="text-lg font-serif font-semibold text-amber-900">{name}</h3>
            {description && (
              <p className="text-sm text-amber-800/70 mt-1 line-clamp-2 italic">{description}</p>
            )}
            {dietaryTag && dietaryTag.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 mb-1">
                {dietaryTag.map((tag) => (
                  <span
                    key={tag._id}
                    className="px-2 py-0.5 rounded-full text-xs font-medium border"
                    style={{
                      backgroundColor: tag?.colorCode || '#8B2500', 
                      color: tag.colorCode ? '#fff' : '#92400e',
                      borderColor: tag.colorCode || '#fef3c7',
                      maxWidth: '90vw',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={tag.name.en}
                  >
                    {tag.name.en}
                  </span>
                ))}
              </div>
            )}
            {category?.name?.en && (
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mb-1">
                {category.name.en}
              </span>
            )}
          </div>
          
          <div className="flex items-center ml-2">
            <div className="font-serif font-bold text-amber-900 whitespace-nowrap">
              ${price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
