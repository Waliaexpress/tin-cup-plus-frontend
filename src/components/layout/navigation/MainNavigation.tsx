"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  Info
} from "lucide-react";
import { RouteEnums } from "@/routes/Routes";
import Image from "next/image";

const MainNavigation = ({landing}: {landing?: boolean}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? `bg-white  dark:bg-gray-900` : `${landing ? "bg-transparent " : "bg-white/80 shadow-md"}  dark:bg-gray-900/80`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-serif font-semibold tracking-wide ${
              isScrolled || isMenuOpen ? "text-primary" : "text-primary"
            }`}>
             <Image src={"/images/logo/tin-cup-plus-logo.png"} width={65} height={35} 
             alt="" className="bg-contain" />
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                isScrolled ? "text-gray-700 dark:text-white" : `${landing ?  "text-white": "text-gray-700"} `
              }`}
            >
              <Info size={18} />
              <span>About Us</span>
            </Link>
            
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-gray-700 dark:text-white" : `${landing ? "text-white" : "text-gray-700"}`
                }`}
              >
                <span>Menu</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link 
                  href="/" 
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Ethiopian Dishes
                </Link>
                <Link 
                  href="/foreign-dishes" 
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Foreign Dishes
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Link 
                href="/cart" 
                className={`flex items-center gap-2 font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-gray-700 dark:text-white" : `${landing ? "text-white" : "text-gray-700"}`
                }`}
              >
                <ShoppingCart size={20} />
                <span>${cartTotal.toFixed(2)}</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
            
            {/* User Account */}
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-gray-700 dark:text-white" : `${landing ? "text-white" : "text-gray-700"}`
                }`}
              >
                <User size={20} />
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link 
                  href={RouteEnums.SIGN_IN} 
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign In
                </Link>
                <Link 
                  href={RouteEnums.SIGN_UP} 
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            
            {/* Order Now Button */}
            <button 
              onClick={() => router.push("/order")}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Order Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled ? "text-gray-700 dark:text-white" : "text-gray-700 dark:text-white"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-gray-700 dark:text-white" : "text-gray-700 dark:text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link 
            href="/about" 
            className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <Info size={18} />
            <span>About Us</span>
          </Link>
          
          <Link 
            href="/menu" 
            className="py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Ethiopian Dishes
          </Link>
          
          <Link 
            href="/foreign-dishes" 
            className="py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Foreign Dishes
          </Link>
          
          <Link 
            href="/cart" 
            className="flex items-center justify-between py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Cart</span>
              <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </div>
            <span>${cartTotal.toFixed(2)}</span>
          </Link>
          
          <Link 
            href={RouteEnums.SIGN_IN} 
            className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <User size={20} />
            <span>Sign In</span>
          </Link>
          
          <button 
            onClick={() => {
              router.push("/order");
              setIsMenuOpen(false);
            }}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
