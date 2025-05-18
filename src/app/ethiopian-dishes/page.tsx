"use client";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Hero from "@/components/localfood/hero/Hero";
import Categories from "@/components/localfood/categories/Categories";
import DietaryTags from "@/components/localfood/DietaryTags";
import MenuItems from "@/components/localfood/menu/MenuItems";
import { TraditionalFoodGallery } from "@/components/localfood";
import Footer from "@/components/Landingpage/Footer";

export default function EthiopianLandingPage() {

  return (
    <div className="min-h-screen">
      <MainNavigation />
      <Hero />
      <Categories />
      {/* <DietaryTags /> */}
      <div className="flex flex-col gap-14">
        <MenuItems isSpecial={true} />
        <MenuItems title="Popular Dishes" isSpecial={false} />
      </div>
      <section className="py-16 bg-white">
        <TraditionalFoodGallery />
      </section>
     <Footer/>
    </div>
  );
}
