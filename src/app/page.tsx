"use client";

import MainNavigation from "@/components/layout/navigation/MainNavigation";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
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
      {/* <SocialLinks/> */}
      <div className="px-4">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="bg-amber-900/95 rounded-xl p-5 mt-4 mb-2 shadow-lg flex flex-col items-center w-full  mx-auto"
        >
          <h2 className="text-white font-playfair font-bold text-2xl sm:text-3xl mb-4 text-center">
            Hall Reservations & Catering
          </h2>
          <div className="flex flex-col md:items-center gap-3 w-full">
            <a
              href="tel:16127034169"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-800/80 hover:bg-amber-700 active:bg-amber-600 transition-colors text-white font-montserrat text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Call Tin Cup Plus"
            >
              <Phone size={22} className="flex-shrink-0" />
              <span>(612) 703-4169</span>
            </a>
            <a
              href="mailto:order@tincupplus.com"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-800/80 hover:bg-amber-700 active:bg-amber-600 transition-colors text-white font-montserrat text-base sm:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Email Tin Cup Plus"
            >
              <Mail size={22} className="flex-shrink-0" />
              <span>order@tincupplus.com</span>
            </a>
          </div>
        </motion.div>
      </div>
      <FindUs/>
      <Footer />
    </div>
  );
}
