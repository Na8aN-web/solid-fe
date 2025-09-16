// src/hooks/useKYC.ts
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatch, RootState } from '../store'; // Adjust path as needed
import {
  submitKYC,
  fetchAllKYCSubmissions,
  fetchUserKYC,
  reviewKYC,
  resubmitKYC,
  fetchKYCCounters,
  clearError,
  clearUserKYC,
  resetSubmissions,
  setCurrentPage,
  setItemsPerPage,
} from '../store/slices/kycSlice'; // Adjust path as needed
import {
  KYCFormData,
  KYCReviewData,
  ResubmitKYCData,
} from '../services/kyc/types'; // Adjust path as needed

export const useKYC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const kycState = useSelector((state: RootState) => state.kyc);

  // Submit KYC documents
  const handleSubmitKYC = useCallback(async (formData: KYCFormData) => {
    try {
      const result = await dispatch(submitKYC(formData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  // Fetch all KYC submissions (Admin)
  const handleFetchAllSubmissions = useCallback(async (params: { 
  page?: number; 
  limit?: number; 
  status?: string; 
  search?: string; 
} = {}) => {
  try {
    const result = await dispatch(fetchAllKYCSubmissions(params)).unwrap();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error as string };
  }
}, [dispatch]);

  // Fetch user's KYC
  const handleFetchUserKYC = useCallback(async () => {
    try {
      const result = await dispatch(fetchUserKYC()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  // Review KYC (Admin)
  const handleReviewKYC = useCallback(async (id: string, reviewData: KYCReviewData) => {
    try {
      const result = await dispatch(reviewKYC({ id, reviewData })).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  // Resubmit KYC
  const handleResubmitKYC = useCallback(async (resubmitData: ResubmitKYCData) => {
    try {
      const result = await dispatch(resubmitKYC(resubmitData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  // Fetch KYC counters (Admin)
  const handleFetchCounters = useCallback(async () => {
    try {
      const result = await dispatch(fetchKYCCounters()).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  // Clear error
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Clear user KYC
  const handleClearUserKYC = useCallback(() => {
    dispatch(clearUserKYC());
  }, [dispatch]);

  // Reset submissions
  const handleResetSubmissions = useCallback(() => {
    dispatch(resetSubmissions());
  }, [dispatch]);

  // Set current page
  const handleSetCurrentPage = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, [dispatch]);

  // Set items per page
  const handleSetItemsPerPage = useCallback((itemsPerPage: number) => {
    dispatch(setItemsPerPage(itemsPerPage));
  }, [dispatch]);

  // Get paginated submissions
  const getPaginatedSubmissions = useCallback(() => {
    const { submissions, currentPage, itemsPerPage } = kycState;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return submissions.slice(startIndex, endIndex);
  }, [kycState]);

  // Get total pages
  const getTotalPages = useCallback(() => {
    const { totalSubmissions, itemsPerPage } = kycState;
    return Math.ceil(totalSubmissions / itemsPerPage);
  }, [kycState]);

  // Check if user has KYC
  const hasUserKYC = useCallback(() => {
    return kycState.userKYC !== null;
  }, [kycState.userKYC]);

  // Get KYC status
  const getKYCStatus = useCallback(() => {
    return kycState.userKYC?.status || null;
  }, [kycState.userKYC]);

  // Check if KYC is approved
  const isKYCApproved = useCallback(() => {
    return kycState.userKYC?.status === 'Approved';
  }, [kycState.userKYC]);

  // Check if KYC is pending
  const isKYCPending = useCallback(() => {
    return kycState.userKYC?.status === 'Pending';
  }, [kycState.userKYC]);

  // Check if KYC is rejected
  const isKYCRejected = useCallback(() => {
    return kycState.userKYC?.status === 'Rejected';
  }, [kycState.userKYC]);

  // Check if KYC is flagged
  const isKYCFlagged = useCallback(() => {
    return kycState.userKYC?.status === 'Flagged';
  }, [kycState.userKYC]);

  return {
    // State
    ...kycState,
    
    // Computed values
    paginatedSubmissions: getPaginatedSubmissions(),
    totalPages: getTotalPages(),
    hasUserKYC: hasUserKYC(),
    kycStatus: getKYCStatus(),
    isKYCApproved: isKYCApproved(),
    isKYCPending: isKYCPending(),
    isKYCRejected: isKYCRejected(),
    isKYCFlagged: isKYCFlagged(),
    
    // Actions
    submitKYC: handleSubmitKYC,
    fetchAllSubmissions: handleFetchAllSubmissions,
    fetchUserKYC: handleFetchUserKYC,
    reviewKYC: handleReviewKYC,
    resubmitKYC: handleResubmitKYC,
    fetchCounters: handleFetchCounters,
    clearError: handleClearError,
    clearUserKYC: handleClearUserKYC,
    resetSubmissions: handleResetSubmissions,
    setCurrentPage: handleSetCurrentPage,
    setItemsPerPage: handleSetItemsPerPage,
  };
};

export default useKYC;