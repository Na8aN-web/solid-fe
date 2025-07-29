// utils/roleUtils.ts

export interface User {
  firstName?: string;
  lastName?: string;
  businessOwnerName?: string;
  businessName?: string;
  role?: string;
  email?: string;
}

export const isSubdistributor = (user: User | null): boolean => {
  return user?.role === "SubDistributor" || user?.role === "sub-distributors";
};

export const isFullAdmin = (user: User | null): boolean => {
  return user?.role === "Admin" || user?.role === "SuperAdmin";
};

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return "User";
  
  if (isSubdistributor(user)) {
    // For subdistributors, prefer business owner name, fallback to first/last names
    return user.businessOwnerName || 
           (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName) || 
           "Subdistributor";
  }
  
  // For regular admins and other users
  return user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.firstName || "User";
};

export const getBusinessInfo = (user: User | null) => {
  if (!user || !isSubdistributor(user)) return null;
  
  return {
    businessName: user.businessName,
    businessOwnerName: user.businessOwnerName
  };
};

// Helper to get appropriate dashboard title
export const getDashboardTitle = (user: User | null, defaultTitle: string = "Dashboard"): string => {
  if (isSubdistributor(user)) {
    const businessName = user?.businessName;
    return businessName ? `${businessName} - Seller Dashboard` : "Seller Dashboard";
  }
  
  return defaultTitle;
};