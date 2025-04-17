// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api/axios';
import { SignupData, AuthResponse, UserRole, accountTypeToUserRole } from '../../services/auth/types';

// Define the shape of the auth state
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  selectedAccountType: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  isLoading: false,
  error: null,
  selectedAccountType: sessionStorage.getItem('selectedAccountType'),
};

// Create async thunks for API calls
export const registerUser = createAsyncThunk(
  'auth/register',
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/register', signupData);
      
      // If registration is successful, store the token
      if (response.data.user && response.data.user.token) {
        localStorage.setItem('authToken', response.data.user.token);
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Return server error message
        return rejectWithValue(error.response.data.message || 'Registration failed');
      }
      // Network or other errors
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

// Login thunk (we'll implement this for completeness)
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<{ message: string; user: any; token: string }>(
        '/auth/login',
        credentials
      );
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Login failed');
      }
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

// Helper function to prepare signup data
export const prepareSignupData = (accountType: string, userData: any): SignupData => {
  // Map the account type to the appropriate role
  const role = accountTypeToUserRole[accountType as keyof typeof accountTypeToUserRole];
  
  // Create the base signup data
  const signupData: SignupData = {
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    password: userData.password,
    role: role,
    firstName: userData.firstName,
    lastName: userData.lastName,
  };
  
  // Add optional fields if they exist
  if (userData.companyName) signupData.companyName = userData.companyName;
  
  // Add business-specific fields based on role
  if (role !== UserRole.Individual) {
    if (userData.businessName) signupData.businessName = userData.businessName;
    if (userData.businessAddress) signupData.businessAddress = userData.businessAddress;
    if (userData.businessRCNumber) signupData.businessRCNumber = userData.businessRCNumber;
    if (userData.businessWebsite) signupData.businessWebsite = userData.businessWebsite;
  }
  
  return signupData;
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccountType: (state, action: PayloadAction<string>) => {
      state.selectedAccountType = action.payload;
      sessionStorage.setItem('selectedAccountType', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('selectedAccountType');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.user?.token || null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    
    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions
export const { setAccountType, logout, clearError } = authSlice.actions;

// Export reducer
export default authSlice.reducer;