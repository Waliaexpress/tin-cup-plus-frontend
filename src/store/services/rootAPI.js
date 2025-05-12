import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '@/utils/baseURL';
import { getToken } from '@/utils/localStorage';
// Define the root apiSlice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: baseURL, 
      prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ['Category', 'Menu', 'DietaryTag'], 
    endpoints: (builder) => ({}), // Empty, as endpoints are injected later
  });