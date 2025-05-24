"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import Footer from "@/components/Landingpage/Footer";
import PackageComponent from "@/components/localfood/package/Package";
import { useGetAllActivePackagesQuery } from "@/store/services/package.service";
import { PlusCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PackagesPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      const yOffset = -80; 
      const y = packagesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <MainNavigation />
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-24 md:py-32 mb-6"
      >
        <div className="container mx-auto md:px-4 px-1 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Catering Packages</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8">
            Perfect for weddings, birthdays, corporate events, and special occasions
          </p>
          <a 
            href="#packages"
            onClick={handleExploreClick}
            className="inline-flex items-center bg-white text-primary hover:bg-gray-100 py-3 px-6 rounded-full font-medium transition-colors duration-300"
          >
            Explore Packages <ArrowRight className="ml-2" size={18} />
          </a>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto md:px-4 px-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white md:p-6 p-3 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Cuisine</h3>
              <p className="text-gray-600">Experience the rich flavors of traditional Ethiopian dishes prepared by our master chefs.</p>
            </div>
            
            <div className="bg-white md:p-6 p-3 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
              <p className="text-gray-600">Our attentive staff ensures your event runs smoothly from setup to cleanup.</p>
            </div>
            
            <div className="bg-white md:p-6 p-3 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Options</h3>
              <p className="text-gray-600">Tailor your package to perfectly match your event's needs and preferences.</p>
            </div>
          </div>
        </div>
      </motion.section>
      
      <section id="packages" className="py-16">
        <PackageComponent />
      </section>
      <Footer />
    </div>
  );
}
