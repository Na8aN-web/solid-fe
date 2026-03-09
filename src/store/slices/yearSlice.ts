// src/store/slices/yearSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Year type based on Swagger schema
export interface Year {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Response types
export interface YearsResponse {
  years: Year[];
  total: number;
}

export interface YearResponse {
  year: Year;
}

// State interface
export interface YearState {
  years: Year[];
  year: Year | null;
  loading: boolean;
  error: string | null;
  totalYears: number;
}

const initialState: YearState = {
  years: [],
  year: null,
  loading: false,
  error: null,
  totalYears: 0,
};

// Async thunk to fetch all years
export const fetchYears = createAsyncThunk<
  YearsResponse,
  void,
  { rejectValue: string }
>(
  "years/fetchYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Year[]>("/years");
      return {
        years: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch years");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch year count
export const fetchYearCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>(
  "years/fetchYearCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<number>("/years/count");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch year count");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch a single year by ID
export const fetchYearById = createAsyncThunk<
  Year,
  string,
  { rejectValue: string }
>(
  "years/fetchYearById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Year>(`/years/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch year");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to create a new year
export const createYear = createAsyncThunk<
  Year,
  Omit<Year, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
  "years/createYear",
  async (yearData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Year>("/years", yearData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to create year");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to update a year
export const updateYear = createAsyncThunk<
  Year,
  { id: string; yearData: Partial<Omit<Year, '_id' | 'createdAt' | 'updatedAt'>> },
  { rejectValue: string }
>(
  "years/updateYear",
  async ({ id, yearData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<Year>(`/years/${id}`, yearData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to update year");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to delete a year
export const deleteYear = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "years/deleteYear",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/years/${id}`);
      return id;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to delete year");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const yearSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    clearYearError: (state) => {
      state.error = null;
    },
    clearSelectedYear: (state) => {
      state.year = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all years
    builder.addCase(fetchYears.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchYears.fulfilled, (state, action) => {
      state.loading = false;
      state.years = action.payload.years || [];
      state.totalYears = action.payload.total || (action.payload.years ? action.payload.years.length : 0);
    });
    builder.addCase(fetchYears.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch year count
    builder.addCase(fetchYearCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchYearCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalYears = action.payload;
    });
    builder.addCase(fetchYearCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch year by ID
    builder.addCase(fetchYearById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchYearById.fulfilled, (state, action) => {
      state.loading = false;
      state.year = action.payload;
    });
    builder.addCase(fetchYearById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create year
    builder.addCase(createYear.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createYear.fulfilled, (state, action) => {
      state.loading = false;
      state.years.push(action.payload);
      state.totalYears += 1;
    });
    builder.addCase(createYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update year
    builder.addCase(updateYear.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateYear.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.years.findIndex(year => year._id === action.payload._id);
      if (index !== -1) {
        state.years[index] = action.payload;
      }
      if (state.year && state.year._id === action.payload._id) {
        state.year = action.payload;
      }
    });
    builder.addCase(updateYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete year
    builder.addCase(deleteYear.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteYear.fulfilled, (state, action) => {
      state.loading = false;
      state.years = state.years.filter(year => year._id !== action.payload);
      state.totalYears -= 1;
      if (state.year && state.year._id === action.payload) {
        state.year = null;
      }
    });
    builder.addCase(deleteYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  clearYearError,
  clearSelectedYear,
} = yearSlice.actions;

export default yearSlice.reducer;