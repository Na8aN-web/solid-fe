// src/store/slices/engineSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Engine type based on Swagger schema
export interface Engine {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Response types
export interface EnginesResponse {
  engines: Engine[];
  total: number;
}

export interface EngineResponse {
  engine: Engine;
}

// State interface
export interface EngineState {
  engines: Engine[];
  engine: Engine | null;
  loading: boolean;
  error: string | null;
  totalEngines: number;
}

const initialState: EngineState = {
  engines: [],
  engine: null,
  loading: false,
  error: null,
  totalEngines: 0,
};

// Async thunk to fetch all engines
export const fetchEngines = createAsyncThunk<
  EnginesResponse,
  void,
  { rejectValue: string }
>(
  "engines/fetchEngines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Engine[]>("/engines");
      return {
        engines: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch engines");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch engine count
export const fetchEngineCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>(
  "engines/fetchEngineCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<number>("/engines/count");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch engine count");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch a single engine by ID
export const fetchEngineById = createAsyncThunk<
  Engine,
  string,
  { rejectValue: string }
>(
  "engines/fetchEngineById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Engine>(`/engines/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch engine");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to create a new engine
export const createEngine = createAsyncThunk<
  Engine,
  Omit<Engine, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
  "engines/createEngine",
  async (engineData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Engine>("/engines", engineData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to create engine");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to update an engine
export const updateEngine = createAsyncThunk<
  Engine,
  { id: string; engineData: Partial<Omit<Engine, '_id' | 'createdAt' | 'updatedAt'>> },
  { rejectValue: string }
>(
  "engines/updateEngine",
  async ({ id, engineData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<Engine>(`/engines/${id}`, engineData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to update engine");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to delete an engine
export const deleteEngine = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "engines/deleteEngine",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/engines/${id}`);
      return id;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to delete engine");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const engineSlice = createSlice({
  name: "engines",
  initialState,
  reducers: {
    clearEngineError: (state) => {
      state.error = null;
    },
    clearSelectedEngine: (state) => {
      state.engine = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all engines
    builder.addCase(fetchEngines.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEngines.fulfilled, (state, action) => {
      state.loading = false;
      state.engines = action.payload.engines || [];
      state.totalEngines = action.payload.total || (action.payload.engines ? action.payload.engines.length : 0);
    });
    builder.addCase(fetchEngines.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch engine count
    builder.addCase(fetchEngineCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEngineCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalEngines = action.payload;
    });
    builder.addCase(fetchEngineCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch engine by ID
    builder.addCase(fetchEngineById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEngineById.fulfilled, (state, action) => {
      state.loading = false;
      state.engine = action.payload;
    });
    builder.addCase(fetchEngineById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create engine
    builder.addCase(createEngine.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEngine.fulfilled, (state, action) => {
      state.loading = false;
      state.engines.push(action.payload);
      state.totalEngines += 1;
    });
    builder.addCase(createEngine.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update engine
    builder.addCase(updateEngine.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateEngine.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.engines.findIndex(engine => engine._id === action.payload._id);
      if (index !== -1) {
        state.engines[index] = action.payload;
      }
      if (state.engine && state.engine._id === action.payload._id) {
        state.engine = action.payload;
      }
    });
    builder.addCase(updateEngine.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete engine
    builder.addCase(deleteEngine.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEngine.fulfilled, (state, action) => {
      state.loading = false;
      state.engines = state.engines.filter(engine => engine._id !== action.payload);
      state.totalEngines -= 1;
      if (state.engine && state.engine._id === action.payload) {
        state.engine = null;
      }
    });
    builder.addCase(deleteEngine.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  clearEngineError,
  clearSelectedEngine,
} = engineSlice.actions;

export default engineSlice.reducer;