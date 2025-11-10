// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import brandReducer from './slices/brandSlice';
import categoriesReducer from './slices/categoriesSlice'
import vehicleReducer from './slices/vehicleSlice'
import wishlistReducer from './slices/wishlistSlice'
import cartReducer from './slices/cartSlice'
import kycReducer from './slices/kycSlice'
import departmentReducer from './slices/departmentSlice'
import adminDashboardReducer from './slices/adminDashboardSlice'
import { deprecate } from 'util';
import addressReducer from './slices/addressSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    brands: brandReducer, 
    departments: departmentReducer,
    categories: categoriesReducer,
    vehicle: vehicleReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    kyc: kycReducer,
    adminDashboard: adminDashboardReducer,
    address: addressReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for non-serializable values like Date objects
        ignoredActions: ['auth/loginSuccess', 'auth/updateUser'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;