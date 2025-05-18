
import { RouteEnums } from "@/routes/Routes";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

export   const businessHours = {
    "Monday": "9:00 AM - 9:00 PM",
    "Tuesday": "9:00 AM - 9:00 PM",
    "Wednesday": "9:00 AM - 9:00 PM",
    "Thursday": "9:00 AM - 9:00 PM",
    "Friday": "9:00 AM - 9:00 PM",
    "Saturday": "9:00 AM - 10:00 PM",
    "Sunday": "9:00 AM - 10:00 PM"
  };


  export  const contactInfo = [
      {
        icon: <Mail className="text-primary" size={20} />,
        label: "Email",
        value: "Tincupplusmn@gmail.com",
        action: "mailto:Tincupplusmn@gmail.com",
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
        value: "2720 RICE STREET, Saint Paul, MN, United States, Minnesota",
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
    ];
  
   export  const footerLinks = [
      {
        title: "Menu",
        links: [
          { label: "Traditional Dishes", href: RouteEnums.ETHIOPIAN_DISHES },
          { label: "American Dishes", href: RouteEnums.FOREIGN_DISHES },
        ],
      },
    ];