

import { apiSlice } from './rootAPI';

// Define the API service
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // User Signup
    adminSignup: builder.mutation({
      query: (credentials) => ({
        url: 'admin/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

   customerSignup: builder.mutation({
    query: (credentials) => ({
      url: 'customer/signup',
      method: 'POST',
      body: credentials,
    }),
  }),
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      // Optional: Handle token storage on successful login
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('accessToken', data.accessToken);
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),

    // Get User Info
    getUserInfo: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
    }),

    // Uncomment and implement these endpoints as needed
    /*
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),

    refresh: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: 'refresh',
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: 'forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<void, { token: string; password: string }>({
      query: (data) => ({
        url: 'reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    */
  }),
});

// Export hooks for usage in components
export const {
  useAdminSignupMutation,
  useCustomerSignupMutation,
  useLoginMutation,
  useGetUserInfoQuery,
  
  // useLogoutMutation,
  // useRefreshMutation,
  // useForgotPasswordMutation,
  // useResetPasswordMutation,
} = authApi;

export default authApi;