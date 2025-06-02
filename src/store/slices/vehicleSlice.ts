// src/store/slices/vehicleTypeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { VehicleType, VehicleTypesResponse, VehicleTypeState } from "../../services/vehicles/types";

const initialState: VehicleTypeState = {
    vehicleTypes: [],
    vehicleType: null,
    loading: false,
    error: null,
    totalVehicleTypes: 0,
};

export const fetchVehicleTypes = createAsyncThunk(
    "vehicleTypes/fetchVehicleTypes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/vehicle-types");
            return {
                vehicleTypes: response.data,
                total: response.data.length
            };
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch vehicle types");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const fetchVehicleTypeById = createAsyncThunk<
  { vehicleType: VehicleType },
  string,
  { rejectValue: string }
>(
    "vehicleTypes/fetchVehicleTypeById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/vehicle-types/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch vehicle type");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const createVehicleType = createAsyncThunk<
  VehicleType,
  Omit<VehicleType, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
    "vehicleTypes/createVehicleType",
    async (vehicleTypeData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/vehicle-types", vehicleTypeData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to create vehicle type");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const updateVehicleType = createAsyncThunk<
  VehicleType,
  { id: string; vehicleTypeData: Partial<VehicleType> },
  { rejectValue: string }
>(
    "vehicleTypes/updateVehicleType",
    async ({ id, vehicleTypeData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/vehicle-types/${id}`, vehicleTypeData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to update vehicle type");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const deleteVehicleType = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
    "vehicleTypes/deleteVehicleType",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/vehicle-types/${id}`);
            return id;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to delete vehicle type");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const vehicleTypeSlice = createSlice({
    name: "vehicleTypes",
    initialState,
    reducers: {
        clearVehicleTypeError: (state) => {
            state.error = null;
        },
        clearSelectedVehicleType: (state) => {
            state.vehicleType = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all vehicle types
        builder.addCase(fetchVehicleTypes.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchVehicleTypes.fulfilled, (state, action) => {
            state.loading = false;
            state.vehicleTypes = action.payload.vehicleTypes || [];
            state.totalVehicleTypes = action.payload.total || (action.payload.vehicleTypes ? action.payload.vehicleTypes.length : 0);
        });
        builder.addCase(fetchVehicleTypes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch vehicle type by ID
        builder.addCase(fetchVehicleTypeById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchVehicleTypeById.fulfilled, (state, action) => {
            state.loading = false;
            state.vehicleType = action.payload.vehicleType;
        });
        builder.addCase(fetchVehicleTypeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create vehicle type
        builder.addCase(createVehicleType.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createVehicleType.fulfilled, (state, action) => {
            state.loading = false;
            if (state.vehicleTypes) {
                state.vehicleTypes.push(action.payload);
                state.totalVehicleTypes += 1;
            }
        });
        builder.addCase(createVehicleType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update vehicle type
        builder.addCase(updateVehicleType.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateVehicleType.fulfilled, (state, action) => {
            state.loading = false;
            if (state.vehicleTypes) {
                const index = state.vehicleTypes.findIndex(vt => vt._id === action.payload._id);
                if (index !== -1) {
                    state.vehicleTypes[index] = action.payload;
                }
            }
            if (state.vehicleType && state.vehicleType._id === action.payload._id) {
                state.vehicleType = action.payload;
            }
        });
        builder.addCase(updateVehicleType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete vehicle type
        builder.addCase(deleteVehicleType.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteVehicleType.fulfilled, (state, action) => {
            state.loading = false;
            if (state.vehicleTypes) {
                state.vehicleTypes = state.vehicleTypes.filter(vt => vt._id !== action.payload);
                state.totalVehicleTypes -= 1;
            }
            if (state.vehicleType && state.vehicleType._id === action.payload) {
                state.vehicleType = null;
            }
        });
        builder.addCase(deleteVehicleType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    clearVehicleTypeError,
    clearSelectedVehicleType,
} = vehicleTypeSlice.actions;

export default vehicleTypeSlice.reducer;