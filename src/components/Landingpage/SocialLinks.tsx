'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/constants/hours';
import Image from 'next/image';

const SocialLinks = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-full md:py-16 py-6 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 z-0 hidden lg:block">
        <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 0C100 100 0 150 50 250C100 350 0 400 0 400"
            stroke="#8B2500"
            strokeWidth="8"
            fill="none"
            opacity="0.1"
          />
          <circle cx="60" cy="300" r="20" fill="#8B2500" opacity="0.15" />
        </svg>
      </div>

      {/* === Right Side SVG Art === */}
      <div className="absolute top-0 right-0 z-0 hidden lg:block">
        <svg width="220" height="420" viewBox="0 0 220 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M180 0C130 100 220 150 180 250C140 350 220 420 220 420"
            stroke="#8B2500"
            strokeWidth="8"
            fill="none"
            opacity="0.1"
          />
          <rect x="160" y="280" width="30" height="30" rx="6" fill="#8B2500" opacity="0.15" />
        </svg>
      </div>

      {/* === Bottom Left Decorative Art === */}
      <div className="absolute bottom-0 left-0 z-0 hidden lg:block">
        <svg width="180" height="150" viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="90" cy="75" rx="80" ry="30" fill="#8B2500" opacity="0.1" />
          <line x1="30" y1="70" x2="150" y2="70" stroke="#8B2500" strokeWidth="4" opacity="0.1" />
        </svg>
      </div>

      {/* === Bottom Right Decorative Art === */}
      <div className="absolute bottom-0 right-0 z-0 hidden lg:block">
        <svg width="180" height="150" viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="90" cy="75" rx="70" ry="28" fill="#8B2500" opacity="0.1" />
          <path d="M80 50L90 30L100 50" stroke="#8B2500" strokeWidth="3" opacity="0.15" />
        </svg>
      </div>

      {/* === Main Content === */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="relative z-10 max-w-7xl mx-auto text-center"
      >
        <motion.h2
          variants={item}
          className="text-2xl md:text-3xl font-bold mb-6 text-primary"
        >
          Follow Us On
        </motion.h2>
        <motion.div
          variants={container}
          className="flex flex-wrap justify-center gap-6 items-center"
        >
          {socialLinks.map((link: any) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
            >
              {link.type === 'img' ? (
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              ) : (
                <span className="text-primary">{link.icon}</span>
              )}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialLinks;
