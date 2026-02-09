// src/store/slices/makerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Maker type based on Swagger schema
export interface Maker {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Response types
export interface MakersResponse {
  makers: Maker[];
  total: number;
}

export interface MakerResponse {
  maker: Maker;
}

// State interface
export interface MakerState {
  makers: Maker[];
  maker: Maker | null;
  loading: boolean;
  error: string | null;
  totalMakers: number;
}

const initialState: MakerState = {
  makers: [],
  maker: null,
  loading: false,
  error: null,
  totalMakers: 0,
};

// Async thunk to fetch all makers
export const fetchMakers = createAsyncThunk<
  MakersResponse,
  void,
  { rejectValue: string }
>(
  "makers/fetchMakers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Maker[]>("/makers");
      return {
        makers: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch makers");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch maker count
export const fetchMakerCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>(
  "makers/fetchMakerCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<number>("/makers/count");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch maker count");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch a single maker by ID
export const fetchMakerById = createAsyncThunk<
  Maker,
  string,
  { rejectValue: string }
>(
  "makers/fetchMakerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Maker>(`/makers/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch maker");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to create a new maker
export const createMaker = createAsyncThunk<
  Maker,
  Omit<Maker, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
  "makers/createMaker",
  async (makerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Maker>("/makers", makerData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to create maker");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to update a maker
export const updateMaker = createAsyncThunk<
  Maker,
  { id: string; makerData: Partial<Omit<Maker, '_id' | 'createdAt' | 'updatedAt'>> },
  { rejectValue: string }
>(
  "makers/updateMaker",
  async ({ id, makerData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<Maker>(`/makers/${id}`, makerData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to update maker");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to delete a maker
export const deleteMaker = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "makers/deleteMaker",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/makers/${id}`);
      return id;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to delete maker");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const makerSlice = createSlice({
  name: "makers",
  initialState,
  reducers: {
    clearMakerError: (state) => {
      state.error = null;
    },
    clearSelectedMaker: (state) => {
      state.maker = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all makers
    builder.addCase(fetchMakers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMakers.fulfilled, (state, action) => {
      state.loading = false;
      state.makers = action.payload.makers || [];
      state.totalMakers = action.payload.total || (action.payload.makers ? action.payload.makers.length : 0);
    });
    builder.addCase(fetchMakers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch maker count
    builder.addCase(fetchMakerCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMakerCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalMakers = action.payload;
    });
    builder.addCase(fetchMakerCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch maker by ID
    builder.addCase(fetchMakerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMakerById.fulfilled, (state, action) => {
      state.loading = false;
      state.maker = action.payload;
    });
    builder.addCase(fetchMakerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create maker
    builder.addCase(createMaker.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createMaker.fulfilled, (state, action) => {
      state.loading = false;
      state.makers.push(action.payload);
      state.totalMakers += 1;
    });
    builder.addCase(createMaker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update maker
    builder.addCase(updateMaker.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateMaker.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.makers.findIndex(maker => maker._id === action.payload._id);
      if (index !== -1) {
        state.makers[index] = action.payload;
      }
      if (state.maker && state.maker._id === action.payload._id) {
        state.maker = action.payload;
      }
    });
    builder.addCase(updateMaker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete maker
    builder.addCase(deleteMaker.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMaker.fulfilled, (state, action) => {
      state.loading = false;
      state.makers = state.makers.filter(maker => maker._id !== action.payload);
      state.totalMakers -= 1;
      if (state.maker && state.maker._id === action.payload) {
        state.maker = null;
      }
    });
    builder.addCase(deleteMaker.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  clearMakerError,
  clearSelectedMaker,
} = makerSlice.actions;

export default makerSlice.reducer;