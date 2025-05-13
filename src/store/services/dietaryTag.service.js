import { apiSlice } from './rootAPI';

export const dietaryTagApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Get paginated dietary tags (admin)
    getDietaryTags: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        return {
          url: `/admin/dietry-tags?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['DietaryTag'],
    }),

    // Get active dietary tags (public)
    getActiveDietaryTags: builder.query({
      query: () => ({
        url: `/admin/active/dietry-tags`,
        method: 'GET',
      }),
    }),

    // Get dietary tag by ID (admin)
    getDietaryTagById: builder.query({
      query: (id) => ({
        url: `/admin/dietry-tags/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'DietaryTag', id }],
    }),

    // Create dietary tag (admin)
    createDietaryTag: builder.mutation({
      query: (body) => ({
        url: `/admin/dietry-tags`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['DietaryTag'],
    }),

    // Update dietary tag by ID (admin)
    updateDietaryTag: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/dietry-tags/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'DietaryTag', id: arg.id }],
    }),
  }),
});

export const {
  useGetDietaryTagsQuery,
  useGetActiveDietaryTagsQuery,
  useGetDietaryTagByIdQuery,
  useCreateDietaryTagMutation,
  useUpdateDietaryTagMutation,
} = dietaryTagApiSlice;
