"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Plus, Minus, ArrowLeft, Facebook, Twitter, Instagram, Share2, Copy, Check } from "lucide-react";
import Link from "next/link";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import MenuItems from "@/components/localfood/menu/MenuItems";
import { useDispatch } from "react-redux";
import { useGetPublicMenuItemByIdQuery } from "@/store/services/menuItem.service";

interface ApiMenuItem {
  _id: string;
  name: {
    am: string;
    en: string;
  };
  description: {
    am: string;
    en: string;
  };
  price: number;
  category: any;
  dietaryTag: Array<{
    _id: string;
    name: {
      en: string;
      am: string;
    };
    description: {
      en: string;
      am: string;
    };
    colorCode: string;
    isActive: boolean;
  }>;
  images: Array<{
    _id: string;
    fileUrl: string;
    fileType: string;
    fileName: string;
    storageType: string;
  }>;
  ingredients: Array<{
    _id: string;
    name: {
      am: string;
      en: string;
    };
    description: {
      am: string;
      en: string;
    };
    isActive: boolean;
  }>;
  isActive: boolean;
  isAvailable: boolean;
  isTraditional: boolean;
  isSpecial: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MenuItemDetail() {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Fetch menu item data using the API
  const { data: menuItemResponse, isLoading, isError } = useGetPublicMenuItemByIdQuery(id);
  const menuItem = menuItemResponse?.data;

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!menuItem) return;
    
    dispatch({
      type: "cart/addItem",
      payload: {
        id: menuItem._id,
        name: menuItem.name.en,
        price: menuItem.price,
        quantity: quantity,
        image: menuItem.images && menuItem.images.length > 0 ? menuItem.images[0].fileUrl : ''
      }
    });
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this delicious ${menuItem?.name?.en} at Tin Cup Plus Restaurant!`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, but we'll include it for UI consistency
        alert('Instagram sharing is not directly supported. Please copy the link and share manually.');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <MainNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !menuItem) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <MainNavigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Menu item not found</h2>
          <p className="mb-6">The menu item you're looking for doesn't exist or has been removed.</p>
          <Link href="/menu" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <MainNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <Link href="/menu" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to Menu
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden">
              <img
                src={menuItem.images && menuItem.images.length > 0 ? menuItem.images[0].fileUrl : '/images/placeholder-food.jpg'}
                alt={menuItem.name.en}
                width={500}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{menuItem.name.en}</h1>
              <h2 className="text-xl font-medium text-gray-600 mb-4">{menuItem.name.am}</h2>
            
              <div className="text-2xl text-primary font-medium mb-4">
                ${menuItem.price.toFixed(2)}
              </div>
              
              {menuItem.dietaryTag && menuItem.dietaryTag.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {menuItem.dietaryTag.map(tag => (
                    <span 
                      key={tag._id} 
                      className="px-3 py-1 text-white text-xs rounded-full"
                      style={{ backgroundColor: tag.colorCode || '#757575' }}
                    >
                      {tag.name.en}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-600 mb-4">{menuItem.description.en}</p>
              <p className="text-gray-500 mb-8">{menuItem.description.am}</p>
              
              {/* Quantity Selector */}
              {/* <div className="flex items-center mb-6">
                <span className="mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={handleDecrement}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div> */}
            
            {/* Add to Cart Button */}
            {/* <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Add to Cart - ${(menuItem.price * quantity).toFixed(2)}
            </button> */}
            
            {/* Share Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Share this dish</h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleShare('facebook')} 
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={20} />
                </button>
                <button 
                  onClick={() => handleShare('twitter')} 
                  className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={20} />
                </button>
                <button 
                  onClick={() => handleShare('instagram')} 
                  className="p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full hover:opacity-90 transition-opacity"
                  aria-label="Share on Instagram"
                >
                  <Instagram size={20} />
                </button>
                <button 
                  onClick={handleCopyLink} 
                  className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center gap-1"
                  aria-label="Copy link"
                >
                  {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                  <span className="text-sm">{copied ? 'Copied!' : 'Copy link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <MenuItems 
            isTraditional={menuItem.isTraditional}
            title={`Related Dishes`} 
          />
        </div>
      </div>
    </div>
    </div>
  );
}
