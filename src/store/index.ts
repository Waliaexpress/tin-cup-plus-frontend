import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

//? Reducers
import { apiSlice } from './services/rootAPI'
import userReducer from './slices/user.slice'
import categoryReducer from './slices/categorySlice'
import cartReducer from './slices/cartSlice'

//? Actions
export * from './slices/user.slice'
export * from './slices/categorySlice'
export * from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)