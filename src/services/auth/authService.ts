import axiosInstance from '../api/axios';
import { SignupData, AuthResponse, UserRole, accountTypeToUserRole } from './types';

class AuthService {
  /**
   * Register a new user
   * @param signupData User registration data
   * @returns Promise with registration response
   */
  async register(signupData: SignupData): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/register', signupData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Transform account type and user data into the format expected by the API
   * @param accountType The selected account type
   * @param userData User form data
   * @returns Formatted signup data ready for API
   */
  prepareSignupData(accountType: string, userData: any): SignupData {
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
  }

  /**
   * Handle API errors with consistent format
   * @param error The error from axios
   * @returns Standardized error object
   */
  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data.message || 'User already exists or invalid data');
        case 500:
          return new Error(data.message || 'Server error occurred');
        default:
          return new Error(data.message || `Error: ${status}`);
      }
    }
    
    if (error.request) {
      // Request made but no response received
      return new Error('No response from server. Please check your connection.');
    }
    
    // Error in setting up the request
    return new Error(error.message || 'Unknown error occurred');
  }
}

export default new AuthService();