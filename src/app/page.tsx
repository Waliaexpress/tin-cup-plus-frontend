"use client";

import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Hero from "@/components/Landingpage/Hero";
import Features from "@/components/Landingpage/Features";
import Footer from "@/components/Landingpage/Footer";
import FindUs from "@/components/FindUs/FindUs";



export default function LandingPage() {
 
  return (
    <div className="min-h-screen">
      <MainNavigation landing={true} />
      <Hero />
      <Features />
      <FindUs/>
      <Footer />
    </div>
  );
}
