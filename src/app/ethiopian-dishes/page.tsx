"use client";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Hero from "@/components/localfood/hero/Hero";
import Categories from "@/components/localfood/categories/Categories";
import MenuItems from "@/components/localfood/menu/MenuItems";
import { TraditionalFoodGallery } from "@/components/localfood";
import Footer from "@/components/Landingpage/Footer";
import { traditionalFeatures } from "@/components/Landingpage/constants";
import Package from "@/components/localfood/package/Package";
import { FeatureSection } from "@/components/Landingpage/FeatureSection";


export default function EthiopianLandingPage() {

  return (
    <div className="min-h-screen">
      <MainNavigation />
      <Hero />
      <Categories />
      {/* <div className="flex flex-col gap-14">
        <MenuItems title="Special Dishes" isSpecial={true} isTraditional={true} />
        <MenuItems title="Popular Dishes" isSpecial={false} isTraditional={true} />
      </div>
      <Package />
      <div className="space-y-16 md:space-y-32 md:mx-16 mx-6">
        {traditionalFeatures.map((feature, index) => (
          <FeatureSection
            key={index}
            image={feature?.image}
            title={feature?.title}
            description={feature?.description}
            isReversed={index % 2 !== 0}
            index={index}
            menuLink={feature?.menuLink}
          />
        ))}
      </div> */}
      <section className="py-16 bg-white">
        <TraditionalFoodGallery />
      </section>
      <Footer isTraditional={true} />
    </div>
  );
}
