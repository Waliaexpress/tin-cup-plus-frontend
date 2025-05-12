"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface FeatureProps {
  image: string;
  title: string;
  description: string;
  isReversed?: boolean;
  index: number;
}

const FeatureSection = ({ image, title, description, isReversed, index }: FeatureProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="w-full md:w-1/2"
      >
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-xl shadow-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
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
          className="text-lg text-gray-600 leading-relaxed font-montserrat"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const featuresData = [
    {
      image: "/images/landing_pages/land1.jpg",
      title: "Traditional Ethiopian Dining Experience",
      description:
        "Immerse yourself in the authentic ambiance of our traditional Ethiopian dining hall. Experience the rich cultural heritage of Ethiopia through our meticulously designed space that honors centuries-old traditions. Our hall features handcrafted furniture and traditional décor, creating the perfect setting for enjoying our authentic Ethiopian cuisine served on traditional injera.",
    },
    {
      image: "/images/landing_pages/land2.jpg",
      title: "Communal Dining & Cultural Celebrations",
      description:
        "Our traditional Ethiopian restaurant hall is designed for communal dining experiences that bring people together. Perfect for family gatherings, cultural celebrations, and special occasions, our space accommodates both intimate dinners and larger groups. Experience the Ethiopian tradition of sharing food from a common plate, symbolizing unity and friendship while enjoying our carefully prepared authentic dishes.",
    },
    {
      image: "/images/landing_pages/land3.jpg",
      title: "Exquisite Buffet Selection",
      description:
        "Indulge in our extensive buffet offering a wide variety of both Ethiopian and international cuisines. Our buffet features a rotating selection of freshly prepared dishes, allowing you to sample multiple flavors in one visit. From traditional Ethiopian stews and injera to international favorites, our buffet caters to all palates. Perfect for those who want to explore a diverse range of culinary delights in a modern, elegant setting.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
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
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
