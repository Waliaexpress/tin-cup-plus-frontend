"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Hero from "@/components/localfood/hero/Hero";
import Categories from "@/components/localfood/categories/Categories";
import MenuItems from "@/components/localfood/menu/MenuItems";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">      
      <MainNavigation />
      
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />
      <div className="flex flex-col gap-14">
      <MenuItems />
      <MenuItems title="Popular Dishes" />
      </div>
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
