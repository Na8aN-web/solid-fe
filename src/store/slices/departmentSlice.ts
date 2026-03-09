// src/store/slices/departmentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import { Department, DepartmentState } from "../../services/departments/types";

const initialState: DepartmentState = {
    departments: [],
    department: null,
    loading: false,
    error: null,
    totalDepartments: 0,
};

export const fetchDepartments = createAsyncThunk(
    "departments/fetchDepartments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/departments");
            // Transform the response to match DepartmentsResponse
            return {
                departments: response.data, // The array from response.data
                total: response.data.length
            };
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch departments");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to fetch a single department by ID
export const fetchDepartmentById = createAsyncThunk<
  { department: Department },
  string,
  { rejectValue: string }
>(
    "departments/fetchDepartmentById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<{ department: Department }>(`/departments/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch department");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to create a new department
export const createDepartment = createAsyncThunk<
  Department,
  Omit<Department, '_id' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>(
    "departments/createDepartment",
    async (departmentData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<Department>("/departments", departmentData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to create department");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to update a department
export const updateDepartment = createAsyncThunk<
  Department,
  { id: string; departmentData: Partial<Department> },
  { rejectValue: string }
>(
    "departments/updateDepartment",
    async ({ id, departmentData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put<Department>(`/departments/${id}`, departmentData);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to update department");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Async thunk to delete a department
export const deleteDepartment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
    "departments/deleteDepartment",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/departments/${id}`);
            return id;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to delete department");
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const departmentSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        clearDepartmentError: (state) => {
            state.error = null;
        },
        clearSelectedDepartment: (state) => {
            state.department = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all departments
        builder.addCase(fetchDepartments.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDepartments.fulfilled, (state, action) => {
            state.loading = false;
            state.departments = action.payload.departments || [];
            state.totalDepartments = action.payload.total || (action.payload.departments ? action.payload.departments.length : 0);
        });
        builder.addCase(fetchDepartments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch department by ID
        builder.addCase(fetchDepartmentById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDepartmentById.fulfilled, (state, action) => {
            state.loading = false;
            state.department = action.payload.department;
        });
        builder.addCase(fetchDepartmentById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create department
        builder.addCase(createDepartment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createDepartment.fulfilled, (state, action) => {
            state.loading = false;
            if (state.departments) {
                state.departments.push(action.payload);
                state.totalDepartments += 1;
            }
        });
        builder.addCase(createDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update department
        builder.addCase(updateDepartment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateDepartment.fulfilled, (state, action) => {
            state.loading = false;
            if (state.departments) {
                const index = state.departments.findIndex(department => department._id === action.payload._id);
                if (index !== -1) {
                    state.departments[index] = action.payload;
                }
            }
            if (state.department && state.department._id === action.payload._id) {
                state.department = action.payload;
            }
        });
        builder.addCase(updateDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete department
        builder.addCase(deleteDepartment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteDepartment.fulfilled, (state, action) => {
            state.loading = false;
            if (state.departments) {
                state.departments = state.departments.filter(department => department._id !== action.payload);
                state.totalDepartments -= 1;
            }
            if (state.department && state.department._id === action.payload) {
                state.department = null;
            }
        });
        builder.addCase(deleteDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    clearDepartmentError,
    clearSelectedDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;