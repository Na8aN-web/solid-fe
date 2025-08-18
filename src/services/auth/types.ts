// services/auth/types.ts

export interface SignupData {
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  name?: string; // For wholesaler
  businessName?: string;
  businessAddress?: string;
  businessRCNumber?: string;
  businessWebsite?: string;
}

export interface AuthResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    verified: boolean;
    recentlyViewed: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    companyName?: string;
    businessName?: string;
    businessAddress?: string;
    businessRCNumber?: string;
    businessWebsite?: string;
    token?: string; // Optional for cases where token is included in user object
  };
  token?: string; // Optional for cases where token is separate
}

export interface LoginResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    verified: boolean;
    recentlyViewed: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    companyName?: string;
    businessName?: string;
    businessAddress?: string;
    businessRCNumber?: string;
    businessWebsite?: string;
  };
  token: string;
}

export interface EmailVerificationResponse {
  message: string;
  user: {
    _id: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    verified: boolean;
    recentlyViewed: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    companyName?: string;
    businessName?: string;
    businessAddress?: string;
    businessRCNumber?: string;
    businessWebsite?: string;
  };
}

// Updated UserRole enum to match API
export enum UserRole {
  INDIVIDUAL = 'Individual',
  WHOLESALER = 'Wholesaler'
}

// Updated account type mapping
export const accountTypeToUserRole = {
  'mechanics': UserRole.INDIVIDUAL,
  'sub-distributors': UserRole.WHOLESALER,
  // Remove unused types
  // 'importers': UserRole.IMPORTER,
  // 'manufacturers': UserRole.MANUFACTURER
} as const;

export type AccountType = keyof typeof accountTypeToUserRole;