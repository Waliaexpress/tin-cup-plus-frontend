"use client";

import React from "react";
import { motion } from "framer-motion";
import MainNavigation from "@/components/layout/navigation/MainNavigation";
import FindUs from "@/components/FindUs/FindUs";
import { Calendar, Clock, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { businessHours, contactInfo } from "@/constants/hours";
import { RouteEnums } from "@/routes/Routes";

export default function HoursLocationPage() {


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <MainNavigation />
      <motion.section 
        className="py-20 text-white relative overflow-hidden h-[400px] flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="bg-[url('/images/landing_pages/res5.jpg')] relative w-full h-full bg-fixed bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hours & Location
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto text-center opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Visit us to experience authentic Ethiopian cuisine in a vibrant atmosphere
          </motion.p>
        </div>
      </motion.section>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-serif font-bold text-gray-800">Business Hours</h2>
            </div>
            
            <div className="space-y-4 mt-8">
              {Object.entries(businessHours).map(([day, hours], index) => (
                <motion.div 
                  key={day}
                  className="flex justify-between items-center py-3 border-b border-gray-100"
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium text-gray-800">{day}</span>
                  </div>
                  <span className="text-gray-600">{hours}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <MapPin className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-serif font-bold text-gray-800">Our Location</h2>
            </div>
            
            <div className="mt-6 p-6 bg-gray-50 rounded-xl space-y-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-center mb-2">
                    {item.icon}
                    <span className="font-semibold ml-2">{item.label}:</span>
                  </div>
                  <a 
                    href={item.action} 
                    target={item.label === "Address" ? "_blank" : undefined}
                    rel={item.label === "Address" ? "noopener noreferrer" : undefined}
                    className="text-gray-700 hover:text-primary transition-colors pl-7"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
            
            {/* <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link 
                href="/reservations" 
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Make a Reservation
              </Link>
            </motion.div> */}
          </motion.div>
        </div>
      </div>

      <FindUs />
      <motion.section 
        className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Looking Forward to Serving You
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join us for an authentic Ethiopian dining experience with traditional flavors and warm hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={RouteEnums.FOREIGN_DISHES}
              className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View Our Menu
            </Link>
            {/* <Link
              href="/order"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Order Online
            </Link> */}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
