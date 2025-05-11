"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  onAddToCart: (id: string) => void;
}

const MenuItem = ({ id, name, description, price, unit, image, onAddToCart }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(0);
  
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(id);
  };
  
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      // You might want to implement a removeFromCart function here
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-serif font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="text-primary font-medium">
            ${price} <span className="text-sm text-gray-500">/ {unit}</span>
          </div>
          <div className="flex items-center">
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition-colors"
                aria-label={`Add ${name} to cart`}
              >
                Add
              </button>
            ) : (
              <div className="flex items-center bg-primary text-white px-2 py-1 rounded-md">
                <button
                  onClick={handleDecrement}
                  className="p-0.5 hover:bg-primary-dark rounded-full"
                  aria-label={`Remove ${name} from cart`}
                >
                  <Minus size={14} />
                </button>
                <span className="font-medium text-white min-w-[24px] text-center mx-1">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-0.5 hover:bg-primary-dark rounded-full"
                  aria-label={`Add ${name} to cart`}
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
