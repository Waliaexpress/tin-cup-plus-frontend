import { apiSlice } from './rootAPI';

export const ingridientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // ✅ Get paginated ingredients (admin)
    getIngridients: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        return {
          url: `/admin/ingridients?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Ingridient'],
    }),

    // ✅ Get active ingredients (admin only)
    getActiveIngridients: builder.query({
      query: () => ({
        url: '/admin/active/ingridients',
        method: 'GET',
      }),
    }),

    // ✅ Get ingredient by ID
    getIngridientById: builder.query({
      query: (id) => ({
        url: `/admin/ingridients/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Ingridient', id }],
    }),

    // ✅ Create ingredient
    createIngridient: builder.mutation({
      query: (formData) => ({
        url: '/admin/ingridients',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Ingridient'],
    }),

    // ✅ Update ingredient by ID
    updateIngridient: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/ingridients/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Ingridient', id: arg.id }],
    }),
  }),
});

export const {
  useGetIngridientsQuery,
  useGetActiveIngridientsQuery,
  useGetIngridientByIdQuery,
  useCreateIngridientMutation,
  useUpdateIngridientMutation,
} = ingridientApiSlice;
