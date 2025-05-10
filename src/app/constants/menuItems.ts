export const MENU_ITEM_CONSTANTS = {
  // Form validation
  MIN_PRICE: 0.01,
  MAX_PRICE: 999.99,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  
  // Image upload
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES: 5,
  
  // Form sections
  SECTIONS: {
    BASIC_INFO: 'basic_info',
    CATEGORIZATION: 'categorization',
    DIETARY_INGREDIENTS: 'dietary_ingredients',
    MEDIA: 'media',
    AVAILABILITY: 'availability'
  },
  
  // Languages
  LANGUAGES: {
    ENGLISH: 'en',
    AMHARIC: 'am'
  }
};
