import { apiSlice } from './rootAPI';

export const menuItemApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Get paginated menu items (admin)
    getMenuItems: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        return {
          url: `/admin/menu-items?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['MenuItem'],
    }),

    // Get menu item by ID (admin)
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `/admin/menu-items/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'MenuItem', id }],
    }),

    // Create menu item (admin)
    createMenuItem: builder.mutation({
      query: (formData) => ({
        url: '/admin/menu-items',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['MenuItem'],
    }),

    // Update menu item by ID (admin)
    updateMenuItem: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/menu-items/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'MenuItem', id: arg.id }],
    }),

    // Delete menu item by ID (admin)
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/admin/menu-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'MenuItem', id }],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuItemApiSlice;
