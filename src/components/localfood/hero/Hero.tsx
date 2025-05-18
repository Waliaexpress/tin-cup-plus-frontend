"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    id: 1,
    image: "/images/slider_food/home-slider-tibse.jpg",
    title: "Authentic Traditional Tibse",
    description: "Experience the rich flavors of our signature spiced beef dish",
    buttonText: "Explore Menu",
    buttonLink: "/menu"
  },
  {
    id: 2,
    image: "/images/slider_food/dulet.jpg",
    title: "Traditional Dulet",
    description: "A delicious Traditional specialty prepared with authentic spices",
    buttonText: "Our Specialties",
    buttonLink: "/menu?category=specialties"
  },
  {
    id: 3,
    image: "/images/slider_food/tiresega.jpeg",
    title: "Tiresega Special",
    description: "Our chef's special raw meat dish, prepared in the traditional way",
    buttonText: "Learn More",
    buttonLink: "/menu?category=specialties"
  }
];

const Hero = () => {
  return (
    <section className="relative w-full mt-20" style={{ height: "40vh" }}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            <div className="relative h-full z-10 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 md:mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-4 md:mb-6 max-w-2xl">
                {slide.description}
              </p>
              <Link 
                href={slide.buttonLink} 
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                {slide.buttonText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
