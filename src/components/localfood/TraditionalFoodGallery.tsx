"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Image data for traditional Ethiopian restaurant halls
const traditionalHallImages = [
  {
    id: 1,
    src: "/images/landing_pages/trad1.jpg",
    title: "Main Dining Hall",
    description: "Our spacious main dining area featuring traditional Ethiopian décor and comfortable seating arrangements"
  },
  {
    id: 3,
    src: "/images/landing_pages/trad3.jpg",
    title: "Coffee Ceremony Area",
    description: "Dedicated space to experience the authentic Ethiopian coffee ceremony tradition"
  },
  {
    id: 7,
    src: "/images/landing_pages/trad7.jpg",
    title: "Event Space",
    description: "Versatile area for hosting cultural events, celebrations, and special occasions"
  },
  {
    id: 8,
    src: "/images/landing_pages/trad8.jpg",
    title: "Welcome Reception",
    description: "Entrance area showcasing Ethiopian artifacts, art, and cultural displays"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

const TraditionalFoodGallery: React.FC = () => {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedImage(expandedImage === id ? null : id);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 font-serif">Our Restaurant Spaces</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step into the warm, inviting atmosphere of our traditionally designed Ethiopian restaurant halls. 
            Each space is carefully crafted to provide an authentic cultural experience while ensuring your comfort and enjoyment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {traditionalHallImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover="hover"
              className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer 
                ${expandedImage === image.id ? 'sm:col-span-2 sm:row-span-2' : ''}`}
              onClick={() => toggleExpand(image.id)}
            >
              <div className="relative h-72 w-full">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={image.id <= 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>

              {expandedImage === image.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="p-4 bg-white text-gray-800"
                >
                  <h3 className="text-xl font-bold mb-2 text-primary">{image.title}</h3>
                  <p className="text-gray-600">{image.description}</p>
                  <p className="mt-3 text-sm italic">
                    Visit our restaurant to experience the warm hospitality and authentic atmosphere of Ethiopian dining culture.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TraditionalFoodGallery;
