import { MenuItem } from "@/types/menu-item";

export interface Ingredient {
  id: string;
  name: string | { en: string; am: string };
}

export interface DietaryTag {
  id: string;
  name: string | { en: string; am: string };
}

export interface Category {
  id: string;
  name: string | { en: string; am: string };
}

export interface Image {
  id?: string;
  url?: string;
  file?: File;
  isMain?: boolean;
}

export interface MenuItemFormProps {
  initialData?: MenuItem;
  isEditing: boolean;
}

export interface FormValues {
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  price: number;
  categoryId: string;
  dietaryTagIds: string[];
  ingredientIds: string[];
  images: any[];
  isActive: boolean;
  isAvailable: boolean;
  is_traditional?: boolean;
}
