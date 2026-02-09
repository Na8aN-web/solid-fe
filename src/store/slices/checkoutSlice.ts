// checkoutSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Types
export interface CouponResponse {
  success: boolean;
  discountPercentage: number;
  message?: string;
}

export interface InitiatePaymentRequest {
  provider: "opay" | "paystack" | "flutterwave"; // Adjust based on actual providers
  amount: number;
  orderId: string;
  email: string;
  phone: string;
  user: Record<string, any>; // Generic user object
}

export interface InitiatePaymentResponse {
  success: boolean;
  paymentLink: string;
  reference?: string;
  message?: string;
}

export interface CheckoutState {
  couponLoading: boolean;
  couponError: string | null;
  couponDiscount: number | null;
  
  paymentLoading: boolean;
  paymentError: string | null;
  paymentLink: string | null;
  
  // Optional: Store applied coupon code
  appliedCouponCode: string | null;
}

const initialState: CheckoutState = {
  couponLoading: false,
  couponError: null,
  couponDiscount: null,
  
  paymentLoading: false,
  paymentError: null,
  paymentLink: null,
  
  appliedCouponCode: null,
};

// Async thunks
export const applyCoupon = createAsyncThunk(
  "checkout/applyCoupon",
  async (
    { code, userId }: { code: string; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<CouponResponse>(
        "/checkout/coupon",
        { code, userId }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to apply coupon"
      );
    }
  }
);

export const initiatePayment = createAsyncThunk(
  "checkout/initiatePayment",
  async (paymentData: InitiatePaymentRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<InitiatePaymentResponse>(
        "/checkout/initiate",
        paymentData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to initiate payment"
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckoutError: (state) => {
      state.couponError = null;
      state.paymentError = null;
    },
    clearCoupon: (state) => {
      state.couponDiscount = null;
      state.appliedCouponCode = null;
      state.couponError = null;
    },
    clearPaymentLink: (state) => {
      state.paymentLink = null;
      state.paymentError = null;
    },
    resetCheckoutState: (state) => {
      state.couponLoading = false;
      state.couponError = null;
      state.couponDiscount = null;
      state.paymentLoading = false;
      state.paymentError = null;
      state.paymentLink = null;
      state.appliedCouponCode = null;
    },
  },
  extraReducers: (builder) => {
    // Apply coupon
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.couponLoading = true;
        state.couponError = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.couponLoading = false;
        if (action.payload.success) {
          state.couponDiscount = action.payload.discountPercentage;
          // Note: You might want to store the coupon code in the request arguments
          // This would require modifying the thunk or using meta in the action
        } else {
          state.couponError = action.payload.message || "Coupon application failed";
          state.couponDiscount = null;
        }
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.couponLoading = false;
        state.couponError = action.payload as string;
        state.couponDiscount = null;
      });

    // Initiate payment
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentLink = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        if (action.payload.success && action.payload.paymentLink) {
          state.paymentLink = action.payload.paymentLink;
        } else {
          state.paymentError = action.payload.message || "Payment initiation failed";
          state.paymentLink = null;
        }
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
        state.paymentLink = null;
      });
  },
});

export const {
  clearCheckoutError,
  clearCoupon,
  clearPaymentLink,
  resetCheckoutState,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;