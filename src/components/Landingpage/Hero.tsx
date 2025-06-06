"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { RouteEnums } from "@/routes/Routes";

const Hero = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  

  const sliderImages = [
    "/images/landing_pages/res4.jpg",
  "/images/landing_pages/res5.jpg",
    "/images/landing_pages/modern_res",
    "/images/landing_pages/rest1.jpg",
     "/images/landing_pages/res6.jpg",
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Slider image ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={80}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 " />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
     
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair"
          >
            Experience Authentic Cuisine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto font-montserrat"
          >
            Discover a world of flavors at Tin Cup Plus Restaurant
          </motion.p>

        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 "
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(RouteEnums.FOREIGN_DISHES)}
              className="px-8 py-3 bg-white text-primary font-semibold rounded-lg text-lg transition-all hover:shadow-lg w-64 sm:w-auto font-inter"
            >
              Explore Menu
            </motion.button>
          </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-3 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute top-32 right-8 z-20 ">
        <motion.a
          href="tel:+16125567705"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-full shadow-lg border border-white/30"
        >
          <Phone className="text-white" size={20} />
          <span className="font-medium font-inter">(612) 556-7705</span>
          {/* {socialLinks.map((link: any) => (
                      <motion.a
                      title={"Follow us on " +link.label}
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
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
                    ))} */}
        </motion.a>
      </div>
    </div>
  );
};

export default Hero;
