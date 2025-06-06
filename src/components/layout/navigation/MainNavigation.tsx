"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  Info,
  Clock,
  MapPin,
  Box,
  MenuIcon
} from "lucide-react";
import { RouteEnums } from "@/routes/Routes";
import Image from "next/image";
import { useSelector } from "react-redux";

const MainNavigation = ({landing}: {landing?: boolean}) => {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const path = usePathname();
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled || isMenuOpen ? `bg-white  dark:bg-gray-900 shadow-md` : `${landing ? "bg-transparent  " : "bg-white/80 shadow-md"}  dark:bg-gray-900/80`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-serif font-semibold tracking-wide ${
              isScrolled || isMenuOpen ? "text-primary" : "text-primary"
            }`}>
             <Image src={ isScrolled ? "/images/logo/tin-cup-plus-logo-2.png" :  "/images/logo/tin-cup-plus-logo.jpg"} width={65} height={35} 
             alt="" className="bg-contain" />
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div >
            <Link 
                  href={RouteEnums.FOREIGN_DISHES} 
                  className="block px-4 py-2 text-gray-700 dark:text-white  dark:hover:
                  "
                >
              <button 
                className={`flex items-center gap-1 font-medium ${isScrolled ? "hover:text-primary" : landing ? "hover:text-white" : "hover:text-primary"} transition-colors ${
                  isScrolled ? "text-gray-700 dark:text-white" : `${landing ? "text-white" : "text-gray-700"}`
                }`}
              >
                 <MenuIcon size={16}/>
                <span>Menu</span>
               
              </button>
              </Link>
              {/* <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link 
                  href={RouteEnums.ETHIOPIAN_DISHES} 
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  VIP Traditional Dishes
                </Link>
                <Link 
                  href={RouteEnums.FOREIGN_DISHES} 
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  American Dishes
                </Link>
              </div> */}
            </div>
            <Link 
              href={RouteEnums.HOURS_LOCATION} 
              className={`flex items-center gap-1 font-medium ${isScrolled ? "hover:text-primary" : landing ? "hover:text-white" : "hover:text-primary"} transition-colors ${
                isScrolled ? "text-gray-700 dark:text-white" : `${landing ?  "text-white": "text-gray-700"} `
              }`}
            >
              <Clock size={18} />
              <span>Hours & Location</span>
            </Link>
            {(path.includes("packages") || path.includes("ethiopian-dishes")) &&
              <Link 
              href="/packages" 
              className={`flex items-center gap-1 font-medium ${isScrolled ? "hover:text-primary" : landing ? "hover:text-white" : "hover:text-primary"} transition-colors ${
                isScrolled ? "text-gray-700 dark:text-white" : `${landing ?  "text-white": "text-gray-700"} `
              }`}
            >
             <Box size={16}/>
              <span>Packages</span>
            </Link>
            }
            
            {/* <div className="relative">
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
            </div> */}
            
            {/* User Account */}
            <div className="relative group">
              <button className={`flex items-center space-x-1  dark:text-white hover:text-primary dark:hover:text-primary transition-colors ${isScrolled ? "text-gray-700 dark:text-white" : `${landing ? "text-white" : "text-gray-700"}`}`}>
                <User size={20} />
                {isAuthenticated && user ? (
                  <span className="ml-2 font-medium">{user.firstName}</span>
                ) : null}
                <ChevronDown size={16} />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {isAuthenticated && user ? (
                  <>
                    <div className="block px-4 py-2 text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium">{user.firstName} {user.lastName}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {/* <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      My Profile
                    </Link> */}
                    <button 
                      onClick={() => {
                        localStorage.removeItem('tin-cup-token');
                        window.location.reload(); 
                      }}
                      className="w-full text-left block px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
            <button 
              onClick={() => router.push(RouteEnums.FOREIGN_DISHES)}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Order Now
            </button>
          </nav>
          <button 
            className="md:hidden text-2xl p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className={isScrolled ? "text-gray-700 dark:text-white" : "text-gray-700 dark:text-white"} />
            ) : (
              <Menu size={24} className={isScrolled ? "text-gray-700 dark:text-white" : `${landing ? "text-white": "text-gray-700"} dark:text-white`} />
            )}
          </button>
        </div>
      </div>
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {/* <Link 
            href="/about" 
            className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <Info size={18} />
            <span>About Us</span>
          </Link>
           */}
          <Link 
            href={RouteEnums.HOURS_LOCATION} 
            className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <MapPin size={18} />
            <span>Hours & Location</span>
          </Link>
          
          {/* <Link 
            href={RouteEnums.ETHIOPIAN_DISHES} 
            className="py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            VIP Traditional Dishes
          </Link> */}
          
          <Link 
            href={RouteEnums.FOREIGN_DISHES} 
            className="py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            American Dishes
          </Link>
          
          {/* <Link 
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
          </Link> */}
           {
            (path.includes("packages") || path.includes("ethiopian-dishes")) &&
            <Link 
            href="/packages" 
            className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <Box size={20} />
            <span>Packages</span>
          </Link>
           }
          
          {isAuthenticated && user ? (
            <>
              <div className="py-2 text-gray-700 dark:text-white border-b border-gray-200 dark:border-gray-700">
                <span className="font-medium">{user.firstName} {user?.lastName}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              {user.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              {/* <Link 
                href="/profile" 
                className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>My Profile</span>
              </Link> */}
              <button 
                onClick={() => {
                  localStorage.removeItem('tin-cup-token');
                  window.location.reload(); 
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2 text-red-600 dark:text-red-400"
              >
                <User size={20} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <Link 
              href={RouteEnums.SIGN_IN} 
              className="flex items-center gap-2 py-2 text-gray-700 dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} />
              <span>Sign In</span>
            </Link>
          )}
          
          <button 
            onClick={() => {
              router.push(RouteEnums.FOREIGN_DISHES);
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
