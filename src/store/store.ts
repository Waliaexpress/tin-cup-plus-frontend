import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

//? Reducers
import { apiSlice } from './services/rootAPI'
import categoryReducer from './slices/categorySlice';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    category: categoryReducer,
    auth: authReducer,
    user: userReducer,
  },
middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)
