import { apiSlice } from './rootAPI';

export const packageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create basic package (admin)
    createBasicPackage: builder.mutation({
      query: (formData) => ({
        url: '/admin/packages',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Package'],
    }),

    // Add hall to package (admin)
    addHallToPackage: builder.mutation({
      query: ({ packageId, formData }) => ({
        url: `/admin/halls/packages/${packageId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Package', id: arg.packageId }],
    }),

    // Add items to package (admin)
    addItemsToPackage: builder.mutation({
      query: ({ packageId, items }) => ({
        url: `/admin/items/packages/${packageId}`,
        method: 'PUT',
        body: { items },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Package', id: arg.packageId }],
    }),

    // Add services to package (admin)
    addServicesToPackage: builder.mutation({
      query: ({ packageId, services }) => ({
        url: `/admin/services/packages/${packageId}`,
        method: 'PUT',
        body: { services },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Package', id: arg.packageId }],
    }),

    // Activate package (admin)
    activatePackage: builder.mutation({
      query: (id) => ({
        url: `/admin/packages/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Package', id },
        { type: 'PublicPackage', id },
      ],
    }),

    // Get paginated packages (admin)
    getPackagesWithPagination: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        return {
          url: `/admin/packages?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Package'],
    }),

    // Get package by ID (admin)
    getPackageById: builder.query({
      query: (id) => ({
        url: `/admin/packages/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Package', id }],
    }),

    // Delete package (admin)
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/admin/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Package'],
    }),

    // Get all active packages (public)
    getAllActivePackages: builder.query({
      query: () => ({
        url: '/public/active/packages',
        method: 'GET',
      }),
      providesTags: ['PublicPackage'],
    }),

    // Get package by ID (public)
    getPublicPackageById: builder.query({
      query: (id) => ({
        url: `/public/packages/${id}`,
        method: 'GET',
      }), 
      providesTags: (result, error, id) => [{ type: 'PublicPackage', id }],
    }),
    addFoodAndDrinkToPackage: builder.mutation({
      query: ({ packageId, items }) => (
        {
        url: `/admin/items/packages/${packageId}`,
        method: 'PUT',
        body: { itemIds: items.itemIds, type: items.type },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Package', id: arg.packageId }],
    })
  }),
});

export const {
  useCreateBasicPackageMutation,
  useAddHallToPackageMutation,
  useAddItemsToPackageMutation,
  useAddServicesToPackageMutation,
  useActivatePackageMutation,
  useGetPackagesWithPaginationQuery,
  useGetPackageByIdQuery,
  useDeletePackageMutation,
  useGetAllActivePackagesQuery,
  useAddFoodAndDrinkToPackageMutation,
} = packageApiSlice;