"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Plus, Minus, ArrowLeft, Facebook, Twitter, Instagram, Share2, Copy, Check } from "lucide-react";
import Link from "next/link";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import MenuItems from "@/components/localfood/menu/MenuItems";
import traditionalMenuData from "@/data/menuItems.json";
import foreignMenuData from "@/data/foreignMenuItems.json";
import { useDispatch } from "react-redux";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  dietaryTags?: string[];
}

export default function MenuItemDetail() {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch();
  
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [menuType, setMenuType] = useState<"traditional" | "foreign">("traditional");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Find the menu item in both data sources
    const findMenuItem = () => {
      setLoading(true);
      
      // Search in traditional menu data
      for (const category of traditionalMenuData.categories) {
        const item = category.items.find(item => item.id === id);
        if (item) {
          setMenuItem(item);
          setMenuType("traditional");
          setLoading(false);
          return;
        }
      }
      
      // Search in foreign menu data
      for (const category of foreignMenuData.categories) {
        const item = category.items.find(item => item.id === id);
        if (item) {
          setMenuItem(item);
          setMenuType("foreign");
          setLoading(false);
          return;
        }
      }
      
      setLoading(false);
    };
    
    findMenuItem();
  }, [id]);

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
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: quantity,
        image: menuItem.image
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
    const text = encodeURIComponent(`Check out this delicious ${menuItem?.name} at Tin Cup Plus Restaurant!`);
    
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

  if (loading) {
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

  if (!menuItem) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <MainNavigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif font-semibold mb-4">Menu Item Not Found</h1>
          <p className="text-gray-600 mb-8">The menu item you are looking for does not exist.</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
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
        <Link 
          href={menuType === "traditional" ? "/" : "/foreign-dishes"}
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to {menuType === "traditional" ? "Ethiopian" : "Foreign"} Menu
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden h-[300px] md:h-[400px] relative">
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-serif font-semibold mb-2">{menuItem.name}</h1>
            
            <div className="text-2xl text-primary font-medium mb-4">
              ${menuItem.price.toFixed(2)} <span className="text-sm text-gray-500">/ {menuItem.unit}</span>
            </div>
            
            {menuItem.dietaryTags && menuItem.dietaryTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {menuItem.dietaryTags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-gray-600 mb-8">{menuItem.description}</p>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
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
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Add to Cart - ${(menuItem.price * quantity).toFixed(2)}
            </button>
            
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
            type={menuType} 
            title={`Related Dishes`} 
          />
        </div>
      </div>
    </div>
  );
}
