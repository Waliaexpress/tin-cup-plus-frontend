"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Hero from "@/components/localfood/hero/Hero";
import Categories from "@/components/localfood/categories/Categories";
import MenuItems from "@/components/localfood/menu/MenuItems";
import { TraditionalFoodGallery } from "@/components/localfood";

export default function EthiopianLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <MainNavigation />
      <Hero />
      <Categories />
      <div className="flex flex-col gap-14">
        <MenuItems />
        <MenuItems title="Popular Dishes" />
      </div>
      {/* About Section */}
      <section className="py-16 bg-white">
        <TraditionalFoodGallery />
      </section>
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
