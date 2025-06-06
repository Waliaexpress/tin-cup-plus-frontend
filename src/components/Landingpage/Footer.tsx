"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Clock
} from "lucide-react";
import { businessHours, contactInfo, footerLinks, socialLinks } from "@/constants/hours";

interface FooterProps {
  isTraditional?: boolean;
}

const Footer = ({ isTraditional = false }: FooterProps) => {
  return (
    <footer className="w-full">
      <div
        className="relative w-full h-[300px] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: isTraditional ? "url('/images/landing_pages/trad9.jpg')" : "url('/images/landing_pages/res5.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="bg-[#8B2500] text-white">
        <div className="container mx-auto md:px-4 py-16 px-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-1"
            >
              <div className="flex items-center mb-6">
                <Image
                  src={"/images/logo/tin-cup-plus-logo.jpg"}
                  width={60}
                  height={60}
                  alt="Tin Cup Plus Logo"
                  loading="lazy"
                  className="mr-3"
                />
                <h3 className="text-xl font-bold font-playfair text-white">
                  Tin Cup Plus
                </h3>
              </div>
              <p className="text-white mb-6 font-montserrat">
                Experience authentic cuisine in a warm,
                welcoming environment.
              </p>
              <p className="text-white mb-6 font-montserrat text-base md:text-lg md:block hidden">
                For Hall Reservations and Catering, call <a href="tel:16127034169" className="underline hover:text-amber-200">(612) 703-4169</a> or email <a href="mailto:order@tincupplus.com" className="underline hover:text-amber-200">order@tincupplus.com</a>.
              </p>
              {/* <div className="flex space-x-4">
                {socialLinks.map((social: any, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-dark transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                   {social.type == "img" ?
                   <Image src={social.icon} alt={social.label} width={24} height={24} />
                   :
                   social.icon
                   }
                  </motion.a>
                ))}
              </div> */}
            </motion.div>

            {footerLinks.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * columnIndex }}
                viewport={{ once: true }}
                className="col-span-1 mb-8 md:mb-0"
              >
                <h3 className="text-lg font-bold mb-6 text-white font-playfair">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                      <Link
                        href={link.href}
                        className="text-white hover:text-gray-200 flex items-center font-montserrat "
                      >
                        <ArrowRight size={16} className="md:mr-2 text-primary hidden md:block" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <p className="text-white mb-6 font-montserrat text-base md:text-lg md:hidden mt-8">
                For Hall Reservations and Catering, call <a href="tel:16127034169" className="underline hover:text-amber-200">(612) 703-4169</a> or email <a href="mailto:order@tincupplus.com" className="underline hover:text-amber-200">order@tincupplus.com</a>.
              </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-1"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-6 text-white font-playfair">
                    Contact Us  
                  </h3>
                  <ul className="md:space-y-4 space-y-2 ">
                    {contactInfo.map((contact, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                      >
                        <div className="mt-1 mr-3 hidden md:block">{contact.icon}</div>
                        <div>
                          <p className="text-sm text-gray-200 font-montserrat break-words flex flex-wrap">
                            {contact.label}
                          </p>
                          <a
                            href={contact.action}
                            target={contact.label === "Address" ? "_blank" : undefined}
                            rel={contact.label === "Address" ? "noopener noreferrer" : undefined}
                            className="text-white hover:text-gray-200 flex items-center font-montserrat break-words flex-wrap"
                          >
                            {contact.value}
                            {contact.label === "Address" && (
                              <ExternalLink size={14} className="ml-1 text-primary" />
                            )}
                          </a>
                        </div>
                      </motion.li>
                      
                    ))}
                  </ul>
                </div>

              
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-1 lg:col-span-1 mb-8 md:mb-0"
            >
                <div className=" md:border-l md:px-2 border-white border-opacity-20 ">
                  <h3 className="text-lg font-bold mb-6 text-white font-playfair flex items-center">
                    <Clock className="text-primary mr-2" size={20} />
                    Business Hours
                  </h3>
                  <ul className="space-y-2">
                    {Object.entries(businessHours).map(([day, hours], index) => (
                      <motion.li
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex justify-between font-montserrat"
                      >
                        <span className="text-gray-200">{day}:</span>
                        <span className="text-white">{hours}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
          </div>



          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white border-opacity-20 mt-12 pt-8 text-center"
          >
            <p className="text-white text-opacity-80 text-sm font-montserrat">
              © {new Date().getFullYear()} Tin Cup Plus Restaurant. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
