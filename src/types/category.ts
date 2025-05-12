export interface Category {
  id: string;
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_CONSTANTS = {
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 200,
  LANGUAGES: {
    ENGLISH: "english",
    AMHARIC: "amharic"
  },
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
}
