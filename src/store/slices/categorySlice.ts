import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: {
    en: string;
    am: string;
  };
  image: string;
  slug: string;
  tags: string[];
}

interface CategoryState {
  categories: Category[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [
    {
      id: 'cat-1',
      name: {
        en: 'Main Dishes',
        am: 'ዋና ምግቦች'
      },
      image: '/images/categories/main-dishes.jpg',
      slug: 'main-dishes',
      tags: ['popular', 'traditional']
    },
    {
      id: 'cat-2',
      name: {
        en: 'Vegetarian',
        am: 'አትክልታዊ'
      },
      image: '/images/categories/vegetarian.jpg',
      slug: 'vegetarian',
      tags: ['healthy', 'vegan-options']
    },
    {
      id: 'cat-3',
      name: {
        en: 'Appetizers',
        am: 'ቅድመ ምግቦች'
      },
      image: '/images/categories/appetizers.jpg',
      slug: 'appetizers',
      tags: ['starters', 'shareable']
    },
    {
      id: 'cat-4',
      name: {
        en: 'Beverages',
        am: 'መጠጦች'
      },
      image: '/images/categories/beverages.jpg',
      slug: 'beverages',
      tags: ['drinks', 'refreshing']
    },
    {
      id: 'cat-5',
      name: {
        en: 'Desserts',
        am: 'ጣፋጭ ምግቦች'
      },
      image: '/images/categories/desserts.jpg',
      slug: 'desserts',
      tags: ['sweet', 'traditional']
    }
  ],
  selectedCategory: null,
  loading: false,
  error: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
    fetchCategoriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  setSelectedCategory,
  clearSelectedCategory,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} = categorySlice.actions;

export default categorySlice.reducer;
