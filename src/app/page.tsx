"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/layout/navigation/MainNavigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">      
      <MainNavigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Tin Cup Plus Restaurant"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Tin Cup Plus Restaurant
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Experience authentic Ethiopian cuisine with a modern twist
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/menu" 
              className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              View Our Menu
            </Link>
            <Link 
              href="/foreign-dishes" 
              className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Foreign Dishes
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-center mb-12">
            Explore Our Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category Cards would go here */}
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 relative">
                <Image
                  src="/images/categories/main-dishes.jpg"
                  alt="Main Dishes"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-medium mb-2">Main Dishes</h3>
                <p className="text-gray-600 mb-4">
                  Explore our selection of traditional Ethiopian main courses
                </p>
                <Link 
                  href="/menu?category=main-dishes" 
                  className="text-primary font-medium hover:underline"
                >
                  View Dishes
                </Link>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 relative">
                <Image
                  src="/images/categories/vegetarian.jpg"
                  alt="Vegetarian Options"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-medium mb-2">Vegetarian Options</h3>
                <p className="text-gray-600 mb-4">
                  Delicious plant-based dishes full of flavor and tradition
                </p>
                <Link 
                  href="/menu?category=vegetarian" 
                  className="text-primary font-medium hover:underline"
                >
                  View Dishes
                </Link>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-64 relative">
                <Image
                  src="/images/categories/beverages.jpg"
                  alt="Beverages"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-medium mb-2">Beverages</h3>
                <p className="text-gray-600 mb-4">
                  Traditional drinks and refreshing options to complement your meal
                </p>
                <Link 
                  href="/menu?category=beverages" 
                  className="text-primary font-medium hover:underline"
                >
                  View Drinks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/restaurant-interior.jpg"
                  alt="Restaurant Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif font-semibold mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 mb-4">
                Tin Cup Plus Restaurant was founded with a passion for bringing authentic Ethiopian flavors to our community. Our chefs combine traditional recipes with modern techniques to create an unforgettable dining experience.
              </p>
              <p className="text-gray-700 mb-6">
                We source the freshest ingredients and authentic spices to ensure every dish represents the rich culinary heritage of Ethiopia while catering to contemporary tastes.
              </p>
              <Link 
                href="/about" 
                className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Ready to Experience Our Flavors?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience or order online for delivery and takeout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/reservations" 
              className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Make a Reservation
            </Link>
            <Link 
              href="/order" 
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
