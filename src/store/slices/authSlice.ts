import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import {
  SignupData,
  AuthResponse,
  UserRole,
  accountTypeToUserRole,
} from "../../services/auth/types";

// Define the shape of the auth state
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  selectedAccountType: string | null;
  passwordReset: {
    otpRequested: boolean;
    otpVerified: boolean;
    onetimePassword: string | null;
    resetSuccess: boolean;
  };
}

// Helper function to get user from localStorage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

// Initial state with proper user loading
const initialState: AuthState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!(localStorage.getItem("authToken") && getUserFromStorage()),
  isLoading: false,
  error: null,
  selectedAccountType: sessionStorage.getItem("selectedAccountType"),
  passwordReset: {
    otpRequested: false,
    otpVerified: false,
    onetimePassword: null,
    resetSuccess: false,
  },
};

// Create async thunks for API calls
export const registerUser = createAsyncThunk(
  "auth/register",
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        signupData
      );

      // If registration is successful, store the token and user
      if (response.data.user && response.data.user.token) {
        localStorage.setItem("authToken", response.data.user.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Return server error message
        return rejectWithValue(
          error.response.data.message || "Registration failed"
        );
      }
      // Network or other errors
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<{
        message: string;
        user: any;
        token: string;
      }>("/auth/login", credentials);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || "Login failed");
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Request OTP thunk
export const requestPasswordResetOTP = createAsyncThunk(
  "auth/requestOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/request-otp", { email });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to send reset code"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Verify OTP thunk
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otp: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify-otp", { otp });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to verify OTP"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Reset password thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: { onetime_password: string; new_password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to reset password"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Helper function to prepare signup data
export const prepareSignupData = (
  accountType: string,
  userData: any
): SignupData => {
  // Map the account type to the appropriate role
  const role =
    accountTypeToUserRole[accountType as keyof typeof accountTypeToUserRole];

  let signupData: SignupData;

  if (accountType === 'sub-distributors') {
    // For business accounts, map business fields to the expected API fields
    signupData = {
      email: userData.businessEmail || '', // Use business email
      phoneNumber: userData.businessPhoneNumber || '', // Use business phone
      password: userData.password,
      role: role,
      firstName: userData.businessOwnerName || '', // Map business owner name to firstName
      lastName: '', // You might want to split businessOwnerName or leave empty
      businessName: userData.businessName || '',
      businessAddress: userData.businessAddress || '',
      businessRCNumber: userData.businessRCNumber || '',
      businessWebsite: userData.businessWebsite || '',
    };
  } else {
    // For individual accounts (mechanics), use personal fields
    signupData = {
      email: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      password: userData.password,
      role: role,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
    };

    // Add optional company name for individuals
    if (userData.companyName) {
      signupData.companyName = userData.companyName;
    }
  }

  return signupData;
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      // Also persist to localStorage
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccountType: (state, action: PayloadAction<string>) => {
      state.selectedAccountType = action.payload;
      sessionStorage.setItem("selectedAccountType", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.selectedAccountType = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem('user');
      sessionStorage.removeItem("selectedAccountType");
    },
    clearError: (state) => {
      state.error = null;
    },
    resetPasswordState: (state) => {
      state.passwordReset = {
        otpRequested: false,
        otpVerified: false,
        onetimePassword: null,
        resetSuccess: false,
      };
    },
    // Add a new action to rehydrate user state (useful for app initialization)
    rehydrateAuth: (state) => {
      const token = localStorage.getItem("authToken");
      const user = getUserFromStorage();
      const selectedAccountType = sessionStorage.getItem("selectedAccountType");
      
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      }
      
      if (selectedAccountType) {
        state.selectedAccountType = selectedAccountType;
      }
    },
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
      // Clear selectedAccountType after successful registration
      state.selectedAccountType = null;
      sessionStorage.removeItem("selectedAccountType");
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

    // Request OTP cases
    builder.addCase(requestPasswordResetOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(requestPasswordResetOTP.fulfilled, (state) => {
      state.isLoading = false;
      state.passwordReset.otpRequested = true;
    });
    builder.addCase(requestPasswordResetOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Verify OTP cases
    builder.addCase(verifyOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.passwordReset.otpVerified = true;
      state.passwordReset.onetimePassword = action.payload.onetime_password;
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Reset password cases
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.passwordReset.resetSuccess = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions
export const {
  setUser,
  setAuthenticated,
  setAccountType,
  logout,
  clearError,
  resetPasswordState,
  rehydrateAuth
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;