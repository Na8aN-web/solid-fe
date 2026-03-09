// src/store/slices/modelSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Model type based on Swagger schema
export interface Model {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Response types
export interface ModelsResponse {
  models: Model[];
  total: number;
}

export interface ModelResponse {
  model: Model;
}

// State interface
export interface ModelState {
  models: Model[];
  model: Model | null;
  loading: boolean;
  error: string | null;
  totalModels: number;
}

const initialState: ModelState = {
  models: [],
  model: null,
  loading: false,
  error: null,
  totalModels: 0,
};

// Async thunk to fetch all models
export const fetchModels = createAsyncThunk<
  ModelsResponse,
  void,
  { rejectValue: string }
>(
  "models/fetchModels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Model[]>("/models");
      return {
        models: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch models");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch model count
export const fetchModelCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>(
  "models/fetchModelCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<number>("/models/count");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch model count");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to fetch a single model by ID
export const fetchModelById = createAsyncThunk<
  Model,
  string,
  { rejectValue: string }
>(
  "models/fetchModelById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Model>(`/models/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to fetch model");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to create a new model
export const createModel = createAsyncThunk<
  Model,
  Omit<Model, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
  "models/createModel",
  async (modelData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Model>("/models", modelData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to create model");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to update a model
export const updateModel = createAsyncThunk<
  Model,
  { id: string; modelData: Partial<Omit<Model, '_id' | 'createdAt' | 'updatedAt'>> },
  { rejectValue: string }
>(
  "models/updateModel",
  async ({ id, modelData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put<Model>(`/models/${id}`, modelData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to update model");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Async thunk to delete a model
export const deleteModel = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "models/deleteModel",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/models/${id}`);
      return id;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Failed to delete model");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    clearModelError: (state) => {
      state.error = null;
    },
    clearSelectedModel: (state) => {
      state.model = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all models
    builder.addCase(fetchModels.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchModels.fulfilled, (state, action) => {
      state.loading = false;
      state.models = action.payload.models || [];
      state.totalModels = action.payload.total || (action.payload.models ? action.payload.models.length : 0);
    });
    builder.addCase(fetchModels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch model count
    builder.addCase(fetchModelCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchModelCount.fulfilled, (state, action) => {
      state.loading = false;
      state.totalModels = action.payload;
    });
    builder.addCase(fetchModelCount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch model by ID
    builder.addCase(fetchModelById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchModelById.fulfilled, (state, action) => {
      state.loading = false;
      state.model = action.payload;
    });
    builder.addCase(fetchModelById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create model
    builder.addCase(createModel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createModel.fulfilled, (state, action) => {
      state.loading = false;
      state.models.push(action.payload);
      state.totalModels += 1;
    });
    builder.addCase(createModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update model
    builder.addCase(updateModel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateModel.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.models.findIndex(model => model._id === action.payload._id);
      if (index !== -1) {
        state.models[index] = action.payload;
      }
      if (state.model && state.model._id === action.payload._id) {
        state.model = action.payload;
      }
    });
    builder.addCase(updateModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete model
    builder.addCase(deleteModel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteModel.fulfilled, (state, action) => {
      state.loading = false;
      state.models = state.models.filter(model => model._id !== action.payload);
      state.totalModels -= 1;
      if (state.model && state.model._id === action.payload) {
        state.model = null;
      }
    });
    builder.addCase(deleteModel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  clearModelError,
  clearSelectedModel,
} = modelSlice.actions;

export default modelSlice.reducer;