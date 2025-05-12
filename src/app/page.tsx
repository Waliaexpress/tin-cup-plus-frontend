"use client";

import { useRouter } from "next/navigation";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Hero from "@/components/Landingpage/Hero";
import Features from "@/components/Landingpage/Features";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <MainNavigation landing={true} />
      <Hero />
      <Features />
    </div>
  );
}
