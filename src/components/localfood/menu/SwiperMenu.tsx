"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MenuItem from "./MenuItem";
import "swiper/css";
import "swiper/css/navigation";

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
}

interface SwiperMenuProps {
  items: MenuItemType[];
  onAddToCart: (id: string) => void;
}

const SwiperMenu = ({ items, onAddToCart }: SwiperMenuProps) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={16}
      slidesPerView={1.2}
      centeredSlides={false}
      className="pb-4"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <MenuItem
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            unit={item.unit}
            image={item.image}
            onAddToCart={onAddToCart}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperMenu;
