import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureProps {
    image: string;
    title: string;
    description: string;
    isReversed?: boolean;
    index: number;
    menuLink: string;
}

export const FeatureSection = ({ image, title, description, isReversed, index, menuLink }: FeatureProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [elementTop, setElementTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    
    const { scrollY } = useScroll();
    
    const scale = useTransform(
      scrollY,
      [elementTop - clientHeight, elementTop, elementTop + clientHeight],
      [0.9, 1.1, 0.9]
    );
  
    useEffect(() => {
      if (!imageRef.current) return;
      
      const element = imageRef.current;
      const rect = element.getBoundingClientRect();
      
      setElementTop(rect.top + window.scrollY);
      setClientHeight(window.innerHeight);
  
      const handleResize = () => {
        const rect = element.getBoundingClientRect();
        setElementTop(rect.top + window.scrollY);
        setClientHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [imageRef]);
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.1 * index,
        },
      },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    };
  
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={`flex flex-col ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-8 md:gap-16 py-16 md:py-24`}
      >
        <motion.div
          ref={imageRef}
          variants={itemVariants}
          style={{ scale }}
          // whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-1/2"
        >
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700"
            />
          </div>
        </motion.div>
  
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 px-4 md:px-0"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 font-playfair"
          >
            {title}
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-primary mb-6"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 leading-relaxed font-montserrat mb-6"
          >
            {description}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link 
              href={menuLink}
              className="inline-flex items-center px-6 py-3  text-primary animate-pulse rounded-lg font-medium hover:bg-opacity-90 transition-colors font-inter"
            >
             <span> View Menu</span>
             <ArrowRight/>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };