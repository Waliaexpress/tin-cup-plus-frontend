"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuresData } from "./constants";
import { FeatureSection } from "./FeatureSection";

interface FeatureProps {
  image: string;
  title: string;
  description: string;
  isReversed?: boolean;
  index: number;
  menuLink: string;
}



const Features = () => {
 

  return (
    <section className="container mx-auto px-4 md:py-16 pb-2 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-playfair">
          Our Dining Experience
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-montserrat">
          Discover the unique dining experiences we offer at <span className="text-primary">Tin Cup Plus Restaurant</span>
        </p>
      </motion.div>

      <div className="space-y-16 md:space-y-32">
        {featuresData.map((feature, index) => (
          <FeatureSection
            key={index}
            image={feature.image}
            title={feature.title}
            description={feature.description}
            isReversed={index % 2 !== 0}
            index={index}
            menuLink={feature.menuLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
