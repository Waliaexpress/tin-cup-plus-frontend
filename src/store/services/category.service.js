
import { apiSlice } from './rootAPI';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: ({ page, limit }) => {
        const queryParams = new URLSearchParams()
        Object.entries({
          page, 
          limit
        }).forEach(([key,value]) => {
          if(value) queryParams.set(key, value);
        });
        return {
          url: `/admin/categories?${queryParams.toString()}`,
          method: 'GET'
        }
      },
    }),

    getCategoryById: builder.query({
      query: ({ id }) => ({
        url: `/admin/categories/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Category', id: arg.id }],
    }),

    searchCategory: builder.query({
      query: ({ amName, enName, start, limit }) => {
        const params = new URLSearchParams();
        if (amName) params.append('amName', amName);
        if (enName) params.append('enName', enName);
        if (limit) params.append('limit', limit);
        if (start) params.append('start', start);
      
        return {
          url: `/categories/search?${params.toString()}`,
          method: 'GET',
        }
      }
    }),

    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Category', id: arg.id }],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: '/admin/categories',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Category'],
    }),
    
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Category', id: arg.id }],
    }),
    getPublicCategories: builder.query({
      query: ({isTraditional, limit, page}) => ({
        url: `/public/categories?isTraditional=${isTraditional}&limit=${limit}&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useSearchCategoryQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetPublicCategoriesQuery
} = categoryApiSlice;


