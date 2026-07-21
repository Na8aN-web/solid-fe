import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

export interface CouponResponse {
  success: boolean;
  discountPercentage: number;
  message?: string;
}

export interface CheckoutState {
  couponLoading: boolean;
  couponError: string | null;
  couponDiscount: number | null;
  appliedCouponCode: string | null;
}

const initialState: CheckoutState = {
  couponLoading: false,
  couponError: null,
  couponDiscount: null,
  appliedCouponCode: null,
};

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

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckoutError: (state) => {
      state.couponError = null;
    },
    clearCoupon: (state) => {
      state.couponDiscount = null;
      state.appliedCouponCode = null;
      state.couponError = null;
    },
    resetCheckoutState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.couponLoading = true;
        state.couponError = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.couponLoading = false;
        if (action.payload.success) {
          state.couponDiscount = action.payload.discountPercentage;
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
  },
});

export const { clearCheckoutError, clearCoupon, resetCheckoutState } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
