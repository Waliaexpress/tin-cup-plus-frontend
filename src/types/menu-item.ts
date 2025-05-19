import { Ingredient } from "./ingredient";
import { DietaryTag } from "./dietary-tag";

export interface MenuItem {
  id: string;
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  price: number;
  category: {
    id: string;
    name: string;
  };
  dietaryTags: DietaryTag[];
  ingredients: Ingredient[];
  images: {
    id: string;
    url: string;
    isMain: boolean;
  }[];
  isActive: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  is_traditional: boolean;
}
