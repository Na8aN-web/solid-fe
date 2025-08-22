// src/store/slices/kycSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Types

export interface KYCSubmission {
    _id: string;
    businessName: string;
    registrationNumber: string;
    typeOfBusiness: string;
    dateOfIncorporation: string;
    businessAddress: string;
    taxId: string;
    emailAddress: string;
    website?: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Flagged';
    businessCert?: string;
    proofOfAddress?: string;
    proofOfSourcing?: string;
    reviewComment?: string;
    checklist?: {
        documentQuality: boolean;
        matchingDetails: boolean;
        validExpiryDates: boolean;
    };
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface KYCFormData {
    businessName: string;
    registrationNumber: string;
    typeOfBusiness: string;
    dateOfIncorporation: string;
    businessAddress: string;
    taxId: string;
    emailAddress: string;
    website?: string;
    businessCert: File;
    proofOfAddress: File;
    proofOfSourcing: File;
}

export interface KYCReviewData {
    status: 'Approved' | 'Rejected' | 'Flagged';
    checklist: {
        documentQuality: boolean;
        matchingDetails: boolean;
        validExpiryDates: boolean;
    };
    reviewComment: string;
}

export interface KYCCounters {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    flagged: number;
}

export interface KYCState {
    submissions: KYCSubmission[];
    userKYC: KYCSubmission | null;
    counters: KYCCounters | null;
    loading: boolean;
    submitting: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    totalSubmissions: number;
    formData: Partial<KYCFormData> | null;
}

const initialState: KYCState = {
    submissions: [],
    userKYC: null,
    counters: null,
    loading: false,
    submitting: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 20,
    totalSubmissions: 0,
    formData: null,
};

// Async thunks

// Submit KYC documents
export const submitKYC = createAsyncThunk(
    "kyc/submit",
    async (formData: KYCFormData, { rejectWithValue }) => {
        try {
            const data = new FormData();
            data.append('businessName', formData.businessName);
            data.append('registrationNumber', formData.registrationNumber);
            data.append('typeOfBusiness', formData.typeOfBusiness);
            data.append('dateOfIncorporation', formData.dateOfIncorporation);
            data.append('businessAddress', formData.businessAddress);
            data.append('taxId', formData.taxId);
            data.append('emailAddress', formData.emailAddress);

            if (formData.website) {
                data.append('website', formData.website);
            }

            data.append('businessCert', formData.businessCert);
            data.append('proofOfAddress', formData.proofOfAddress);
            data.append('proofOfSourcing', formData.proofOfSourcing);

            const response = await axiosInstance.post<{
                message: string;
                kyc: KYCSubmission
            }>("/kyc", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(
                    error.response.data.message || "Failed to submit KYC"
                );
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const saveKYCFormData = createAsyncThunk(
    "kyc/saveFormData",
    async (formData: Partial<KYCFormData>, { rejectWithValue }) => {
        try {
            // Store in localStorage/sessionStorage or make API call if needed
            sessionStorage.setItem('kycFormData', JSON.stringify(formData));
            return formData;
        } catch (error: any) {
            return rejectWithValue("Failed to save form data");
        }
    }
);

// Get all KYC submissions (Admin only)
export const fetchAllKYCSubmissions = createAsyncThunk(
    "kyc/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<{
                submissions: KYCSubmission[]
            }>("/kyc");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(
                    error.response.data.message || "Failed to fetch KYC submissions"
                );
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

export const fetchUserKYC = createAsyncThunk(
    "kyc/fetchUserKYC",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<KYCSubmission[] | KYCSubmission>("/kyc/my");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(
                    error.response.data.message || "Failed to fetch user KYC"
                );
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

// Admin review KYC submission
export const reviewKYC = createAsyncThunk<
    { message: string; kyc: KYCSubmission },
    { id: string; reviewData: KYCReviewData },
    { rejectValue: string }
>("kyc/review", async ({ id, reviewData }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put<{
            message: string;
            kyc: KYCSubmission
        }>(`/kyc/${id}/review`, reviewData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(
                error.response.data.message || "Failed to review KYC"
            );
        }
        return rejectWithValue("Network error. Please try again.");
    }
});

// Resubmit KYC documents after rejection
export const resubmitKYC = createAsyncThunk<
    { message: string; kyc: KYCSubmission },
    { id: string; files: { businessCert?: File; proofOfAddress?: File; proofOfSourcing?: File } },
    { rejectValue: string }
>("kyc/resubmit", async ({ id, files }, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        if (files.businessCert) {
            formData.append('businessCert', files.businessCert);
        }
        if (files.proofOfAddress) {
            formData.append('proofOfAddress', files.proofOfAddress);
        }
        if (files.proofOfSourcing) {
            formData.append('proofOfSourcing', files.proofOfSourcing);
        }

        const response = await axiosInstance.put<{
            message: string;
            kyc: KYCSubmission
        }>(`/kyc/${id}/resubmit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return rejectWithValue(
                error.response.data.message || "Failed to resubmit KYC"
            );
        }
        return rejectWithValue("Network error. Please try again.");
    }
});

// Get KYC status counters (admin dashboard)
export const fetchKYCCounters = createAsyncThunk(
    "kyc/fetchCounters",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<KYCCounters>("/kyc/admin/counters");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(
                    error.response.data.message || "Failed to fetch KYC counters"
                );
            }
            return rejectWithValue("Network error. Please try again.");
        }
    }
);

const kycSlice = createSlice({
    name: "kyc",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1; // Reset to first page when changing items per page
        },
        setFormData: (state, action: PayloadAction<Partial<KYCFormData>>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        clearFormData: (state) => {
            state.formData = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearUserKYC: (state) => {
            state.userKYC = null;
        },
        resetSubmissions: (state) => {
            state.submissions = [];
            state.totalSubmissions = 0;
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        // Submit KYC
        builder.addCase(submitKYC.pending, (state) => {
            state.submitting = true;
            state.error = null;
        });
        builder.addCase(submitKYC.fulfilled, (state, action) => {
            state.submitting = false;
            state.userKYC = action.payload.kyc;
        });
        builder.addCase(submitKYC.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload as string;
        });

        // Fetch all KYC submissions (Admin)
        builder.addCase(fetchAllKYCSubmissions.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllKYCSubmissions.fulfilled, (state, action) => {
            state.loading = false;
            state.submissions = action.payload.submissions;
            state.totalSubmissions = action.payload.submissions.length;
        });
        builder.addCase(fetchAllKYCSubmissions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(fetchUserKYC.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserKYC.fulfilled, (state, action) => {
            state.loading = false;
            // Handle both array and single object responses
            if (Array.isArray(action.payload)) {
                state.userKYC = action.payload[0] || null;
            } else {
                state.userKYC = action.payload;
            }
        });
        builder.addCase(fetchUserKYC.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Review KYC (Admin)
        builder.addCase(reviewKYC.pending, (state) => {
            state.submitting = true;
            state.error = null;
        });
        builder.addCase(reviewKYC.fulfilled, (state, action) => {
            state.submitting = false;
            // Update the submission in the list
            const index = state.submissions.findIndex(
                (submission) => submission._id === action.payload.kyc._id
            );
            if (index !== -1) {
                state.submissions[index] = action.payload.kyc;
            }
        });
        builder.addCase(reviewKYC.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload as string;
        });

        // Resubmit KYC
        builder.addCase(resubmitKYC.pending, (state) => {
            state.submitting = true;
            state.error = null;
        });
        builder.addCase(resubmitKYC.fulfilled, (state, action) => {
            state.submitting = false;
            state.userKYC = action.payload.kyc;
        });
        builder.addCase(resubmitKYC.rejected, (state, action) => {
            state.submitting = false;
            state.error = action.payload as string;
        });

        // Fetch KYC counters
        builder.addCase(fetchKYCCounters.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchKYCCounters.fulfilled, (state, action) => {
            state.loading = false;
            state.counters = action.payload;
        });
        builder.addCase(fetchKYCCounters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    setCurrentPage,
    setItemsPerPage,
    clearError,
    clearUserKYC,
    resetSubmissions,
} = kycSlice.actions;

export default kycSlice.reducer;