
import { RouteEnums } from "@/routes/Routes";
import { Mail, Phone, MapPin, Instagram, Facebook, Music } from "lucide-react";

export   const businessHours = {
    "Monday": "11:00 AM - 11:00 PM",
    "Tuesday": "11:00 AM - 11:00 PM",
    "Wednesday": "11:00 AM - 11:00 PM",
    "Thursday": "11:00 AM - 11:00 PM",
    "Friday": "11:00 AM - 11:00 PM",
    "Saturday": "11:00 AM - 11:00 PM",
    "Sunday": "11:00 AM - 11:00 PM"
  };


  export  const contactInfo = [
      {
        icon: <Mail className="text-primary" size={20} />,
        label: "Email",
        value: "info@tincupplus.com",
        action: "mailto:info@tincupplus.com",
      },
      {
        icon: <Phone className="text-primary" size={20} />,
        label: "Phone",
        value: "(612) 556-7705",
        action: "tel: (612) 556-7705",
      },
      {
        icon: <MapPin className="text-primary" size={20} />,
        label: "Address",
        value: "1220 Rice Street St. Paul, MN 55117",
        action: "https://www.google.com/maps/search/2720+RICE+STREET,+Saint+Paul,+MN,+United+States,+Minnesota",
      },
    ];
  
  export  const socialLinks = [
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
      {
        icon: "/images/tiktok.svg",
        url: " https://www.tiktok.com/@tin.cup.plus?_t=ZM-8wSVNL5iLfq&_r=1",
        label: "Tiktok",
        type: "img"
      },
    ];
  
   export  const footerLinks = [
      {
        title: "Menu",
        links: [
          { label: "Dishes", href: RouteEnums.FOREIGN_DISHES },
        ],
      },
    ];