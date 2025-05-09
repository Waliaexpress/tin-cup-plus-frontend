export interface Ingredient {
  id: string;
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IngredientFormData {
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
}
