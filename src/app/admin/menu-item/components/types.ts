import { MenuItem } from "@/types/menu-item";

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
}
