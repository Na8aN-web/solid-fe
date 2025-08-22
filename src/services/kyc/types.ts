// src/services/kyc/types.ts
export interface KYCSubmission {
  _id: string;
  businessName: string;
  registrationNumber: string;
  typeOfBusiness: string;
  dateOfIncorporation: string;
  businessAddress: string;
  taxId: string;
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
    website?: string;
    emailAddress: string; 
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
}

export interface KYCResponse {
  message: string;
  kyc: KYCSubmission;
}

export interface KYCListResponse {
  submissions: KYCSubmission[];
}

export interface UserKYCResponse {
  kyc: KYCSubmission[] | KYCSubmission;
}

export interface ResubmitKYCData {
  id: string;
  files: {
    businessCert?: File;
    proofOfAddress?: File;
    proofOfSourcing?: File;
  };
}