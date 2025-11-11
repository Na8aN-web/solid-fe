import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Types
export interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  direction?: string;
  city: string;
  state: string;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddressState {
  addresses: Address[];
  selectedAddress: Address | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddress: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Address[]>("/address");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

export const fetchAddressById = createAsyncThunk(
  "address/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Address>(`/address/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch address"
      );
    }
  }
);

export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData: Omit<Address, "_id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Address>("/address", addressData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async (
    { id, addressData }: { id: string; addressData: Partial<Address> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put<Address>(
        `/address/${id}`,
        addressData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/address/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },
    setSelectedAddress: (state, action: PayloadAction<Address | null>) => {
      state.selectedAddress = action.payload;
    },
    resetAddressState: (state) => {
      state.addresses = [];
      state.selectedAddress = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all addresses
    builder
      .addCase(fetchAllAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        // Auto-select default address if available
        const defaultAddress = action.payload.find((addr) => addr.isDefault);
        if (defaultAddress && !state.selectedAddress) {
          state.selectedAddress = defaultAddress;
        }
      })
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch address by ID
    builder
      .addCase(fetchAddressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAddress = action.payload;
      })
      .addCase(fetchAddressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create address
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
        // If this is the first address or marked as default, select it
        if (action.payload.isDefault || state.addresses.length === 1) {
          state.selectedAddress = action.payload;
        }
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update address
    builder
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
        if (state.selectedAddress?._id === action.payload._id) {
          state.selectedAddress = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete address
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
        if (state.selectedAddress?._id === action.payload) {
          state.selectedAddress = state.addresses[0] || null;
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAddressError, setSelectedAddress, resetAddressState } =
  addressSlice.actions;

export default addressSlice.reducer;