import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";
import {
  SignupData,
  AuthResponse,
  LoginResponse,
  EmailVerificationResponse,
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
  emailVerification: {
    isRequired: boolean;
    isLoading: boolean;
    isVerified: boolean;
    error: string | null;
    redirectToLogin: boolean;
    otpToken: string | null;
  };
  passwordReset: {
    otpRequested: boolean;
    otpVerified: boolean;
    otpToken: string | null;
    resetToken: string | null;
    resetSuccess: boolean;
  };
}

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
  emailVerification: {
    isRequired: false,
    isLoading: false,
    isVerified: false,
    error: null,
    redirectToLogin: false,
    otpToken: localStorage.getItem("otpToken")
  },
  passwordReset: {
    otpRequested: false,
    otpVerified: false,
    otpToken: localStorage.getItem("passwordResetOtpToken"),
    resetToken: null,
    resetSuccess: false,
  },
};

// Google OAuth login thunk
export const initiateGoogleLogin = createAsyncThunk(
  "auth/initiateGoogleLogin",
  async (_, { rejectWithValue }) => {
    try {
      // Get the base URL from your axios instance or environment
      const baseURL = axiosInstance.defaults.baseURL || '';
      const googleAuthURL = `${baseURL}auth/google`;

      // Redirect to Google OAuth endpoint
      window.location.href = googleAuthURL;

      // Return null since we're redirecting
      return null;
    } catch (error: any) {
      return rejectWithValue("Failed to initiate Google authentication");
    }
  }
);

// Handle Google OAuth callback
export const handleGoogleCallback = createAsyncThunk(
  "auth/googleCallback",
  async (
    { code, state }: { code: string; state?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get<{
        success: boolean;
        token: string;
        user: any;
      }>("/auth/google/callback", {
        params: { code, state }
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Google authentication failed"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Create async thunks for API calls
export const registerUser = createAsyncThunk(
  "auth/register",
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/register",
        signupData
      );

      if (response.data.user) {
        localStorage.setItem("unverifiedUser", JSON.stringify(response.data.user));
      }

      if (response.data.otpToken) {
        localStorage.setItem("otpToken", response.data.otpToken);
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Registration failed"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const verifyEmailOTP = createAsyncThunk(
  "auth/verifyEmailOTP",
  async (
    { otp, otpToken }: { otp: string; otpToken: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<EmailVerificationResponse>(
        "/auth/verify-email-otp",
        { otp, otpToken }
      );
      return response.data;

    } catch (error: any) {
      console.error('OTP verification error:', error.response?.data || error.message);
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Email verification failed"
        );
      }
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        credentials
      );

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

export const requestPasswordResetOTP = createAsyncThunk(
  "auth/requestOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/request-otp", { email });

      if (response.data.otpToken) {
        localStorage.setItem("passwordResetOtpToken", response.data.otpToken);
      }

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

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    { otp, otpToken }: { otp: string; otpToken: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/auth/reset-password-otp",
        { otp, otpToken }
      );
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    data: { resetToken: string; new_password: string },
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

export const prepareSignupData = (
  accountType: string,
  userData: any
): SignupData => {
  const role = accountTypeToUserRole[accountType as keyof typeof accountTypeToUserRole];

  let signupData: SignupData;

  if (accountType === 'sub-distributors') {
    signupData = {
      email: userData.businessEmail || '',
      phoneNumber: userData.businessPhoneNumber || '',
      password: userData.password,
      role: role,
      name: userData.businessOwnerName || '',
      businessName: userData.businessName || '',
      businessAddress: userData.businessAddress || '',
      businessRCNumber: userData.businessRCNumber || '',
      businessWebsite: userData.businessWebsite || '',
    };
  } else {
    signupData = {
      email: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      password: userData.password,
      role: role,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      companyName: userData.companyName || '',
    };
  }

  return signupData;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    resetRedirectToLogin: (state) => {
      state.emailVerification.redirectToLogin = false;
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
      state.emailVerification = {
        isRequired: false,
        isLoading: false,
        isVerified: false,
        error: null,
        redirectToLogin: false,
        otpToken: null,
      };
      state.passwordReset = {
        otpRequested: false,
        otpVerified: false,
        otpToken: null,
        resetToken: null,
        resetSuccess: false,
      };
      localStorage.removeItem("authToken");
      localStorage.removeItem('user');
      localStorage.removeItem("unverifiedUser");
      localStorage.removeItem("otpToken");
      localStorage.removeItem("passwordResetOtpToken");
      sessionStorage.removeItem("selectedAccountType");
    },
    clearError: (state) => {
      state.error = null;
      state.emailVerification.error = null;
    },
    clearEmailVerificationError: (state) => {
      state.emailVerification.error = null;
    },
    resetPasswordState: (state) => {
      state.passwordReset = {
        otpRequested: false,
        otpVerified: false,
        otpToken: null,
        resetToken: null,
        resetSuccess: false,
      };
      localStorage.removeItem("passwordResetOtpToken");
    },
    resetEmailVerificationState: (state) => {
      state.emailVerification = {
        isRequired: false,
        isLoading: false,
        isVerified: false,
        error: null,
        redirectToLogin: false,
        otpToken: null,
      };
    },
    rehydrateAuth: (state) => {
      const token = localStorage.getItem("authToken");
      const user = getUserFromStorage();
      const selectedAccountType = sessionStorage.getItem("selectedAccountType");
      const passwordResetOtpToken = localStorage.getItem("passwordResetOtpToken");

      if (token && user && user.verified) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      }

      if (selectedAccountType) {
        state.selectedAccountType = selectedAccountType;
      }

      if (passwordResetOtpToken) {
        state.passwordReset.otpToken = passwordResetOtpToken;
      }

      const unverifiedUser = localStorage.getItem("unverifiedUser");
      if (unverifiedUser && !user) {
        state.emailVerification.isRequired = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Google OAuth cases
    builder.addCase(initiateGoogleLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(initiateGoogleLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(handleGoogleCallback.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(handleGoogleCallback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null; // Clear any previous errors
    });
    builder.addCase(handleGoogleCallback.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Register cases
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.emailVerification.isRequired = true;
      state.emailVerification.otpToken = action.payload.otpToken || null;
      state.selectedAccountType = null;
      sessionStorage.removeItem("selectedAccountType");

      if (action.payload.otpToken) {
        localStorage.setItem("otpToken", action.payload.otpToken);
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Email verification cases
    builder.addCase(verifyEmailOTP.pending, (state) => {
      state.emailVerification.isLoading = true;
      state.emailVerification.error = null;
      state.emailVerification.redirectToLogin = false;
    });
    builder.addCase(verifyEmailOTP.fulfilled, (state, action) => {
      state.emailVerification.isLoading = false;
      state.emailVerification.isRequired = false;
      state.emailVerification.isVerified = true;
      state.user = action.payload.user;
      state.emailVerification.redirectToLogin = true;
      state.emailVerification.otpToken = null;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.removeItem('unverifiedUser');
      localStorage.removeItem('otpToken');
    });
    builder.addCase(verifyEmailOTP.rejected, (state, action) => {
      state.emailVerification.isLoading = false;
      state.emailVerification.error = action.payload as string;
      state.emailVerification.redirectToLogin = false;
    });

    // Login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.user.verified) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      } else {
        state.user = action.payload.user;
        state.emailVerification.isRequired = true;
        localStorage.setItem("unverifiedUser", JSON.stringify(action.payload.user));
      }
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
    builder.addCase(requestPasswordResetOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.passwordReset.otpRequested = true;
      state.passwordReset.otpToken = action.payload.otpToken || null;
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
      state.passwordReset.resetToken = action.payload.resetToken || action.payload.onetime_password;
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
      state.passwordReset.otpToken = null;
      state.passwordReset.resetToken = null;
      localStorage.removeItem("passwordResetOtpToken");
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setUser,
  setAuthenticated,
  setAccountType,
  logout,
  clearError,
  clearEmailVerificationError,
  resetPasswordState,
  resetEmailVerificationState,
  rehydrateAuth,
  resetRedirectToLogin
} = authSlice.actions;

export default authSlice.reducer;