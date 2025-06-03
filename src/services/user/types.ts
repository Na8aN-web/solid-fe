// src/services/user/types.ts
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  role: string;
}

export interface RecentlyViewedProduct {
    productId: string;
  }

export interface userState {
    users: User[];           // for "get all users"
    user: User | null;       // for "get user by ID", "update user"
    loading: boolean;
    error: string | null;
    totalUsers: number;      // for "get total user count"
    recentlyViewed: string[];  // to track recently viewed users
  }
