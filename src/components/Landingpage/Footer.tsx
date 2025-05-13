"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  ExternalLink,
  ArrowRight,
  Clock
} from "lucide-react";

const Footer = () => {
  const businessHours = {
    "Monday": "9:00 AM - 9:00 PM",
    "Tuesday": "9:00 AM - 9:00 PM",
    "Wednesday": "9:00 AM - 9:00 PM",
    "Thursday": "9:00 AM - 9:00 PM",
    "Friday": "9:00 AM - 9:00 PM",
    "Saturday": "9:00 AM - 10:00 PM",
    "Sunday": "9:00 AM - 10:00 PM"
  };

  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={20} />,
      label: "Email",
      value: "Tincupplusmn@gmail.com",
      action: "mailto:Tincupplusmn@gmail.com",
    },
    {
      icon: <Phone className="text-primary" size={20} />,
      label: "Phone",
      value: "+1 612-703-4169",
      action: "tel:+16127034169",
    },
    {
      icon: <MapPin className="text-primary" size={20} />,
      label: "Address",
      value: "2720 RICE STREET, Saint Paul, MN, United States, Minnesota",
      action: "https://www.google.com/maps/search/2720+RICE+STREET,+Saint+Paul,+MN,+United+States,+Minnesota",
    },
  ];

  const socialLinks = [
    {
      icon: <Instagram size={24} />,
      url: "https://www.instagram.com/tincupplusmn/?igsh=MWQ2NHVwb3JwaTh3MQ%3D%3D&utm_source=qr#",
      label: "Instagram",
    },
    {
      icon: <Facebook size={24} />,
      url: "https://web.facebook.com/people/Tin-Cup-Plus-%25E1%258B%25A8%25E1%2589%25A3%25E1%2588%2585%25E1%2588%258B%25E1%258B%258A-%25E1%258A%25A0%25E1%258B%25B3%25E1%2588%25AB%25E1%2588%25BD/61576067886301/?mibextid=wwXIfr&rdid=5LlFAoEaEhCiiBhD&share_url=https%253A%252F%252Fweb.facebook.com%252Fshare%252F16gEcGKdVj%252F%253Fmibextid%253DwwXIfr%2526_rdc%253D1%2526_rdr",
      label: "Facebook",
    },
  ];

  const footerLinks = [
    {
      title: "Menu",
      links: [
        { label: "Ethiopian Dishes", href: "/ethiopian-dishes" },
        { label: "Foreign Dishes", href: "/foreign-dishes" },
        { label: "Special Offers", href: "/special-offers" },
      ],
    },
  ];

  return (
    <footer className="w-full">
      <div
        className="relative w-full h-[300px] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/images/landing_pages/land2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="bg-[#8B2500] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-span-1 lg:col-span-1"
            >
              <div className="flex items-center mb-6">
                <Image
                  src="/images/logo/tin-cup-plus-logo.png"
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
                Experience authentic Ethiopian and international cuisine in a warm,
                welcoming environment.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
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
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {footerLinks.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * columnIndex }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <h3 className="text-lg font-bold mb-6 text-white font-playfair">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                      <Link
                        href={link.href}
                        className="text-white hover:text-gray-200 flex items-center font-montserrat"
                      >
                        <ArrowRight size={16} className="mr-2 text-primary" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
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
                  <ul className="space-y-4">
                    {contactInfo.map((contact, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                      >
                        <div className="mt-1 mr-3">{contact.icon}</div>
                        <div>
                          <p className="text-sm text-gray-200 font-montserrat">
                            {contact.label}
                          </p>
                          <a
                            href={contact.action}
                            target={contact.label === "Address" ? "_blank" : undefined}
                            rel={contact.label === "Address" ? "noopener noreferrer" : undefined}
                            className="text-white hover:text-gray-200 flex items-center font-montserrat"
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
              className="col-span-3 lg:col-span-1"
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
