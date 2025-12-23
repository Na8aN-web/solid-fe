// // src/services/wishlists/types.ts

// // Product in wishlist
// export interface WishlistProduct {
//   _id: string;
//   name: string;
//   images: string[];
//   salesPrice: number;
//   stockStatus: string;
// }

// // Wishlist structure
// export interface Wishlist {
//   _id: string;
//   user: string;
//   products: WishlistProduct[];
// }

// // State for the wishlist slice
// export interface WishlistState {
//   wishlist: Wishlist | null;
//   loading: boolean;
//   error: string | null;
// }

// // Types for adding/removing products
// export interface ProductWishlistAction {
//   productId: string;
// }

// src/services/wishlist/types.ts

export interface WishlistProduct {
  _id: string;
  id?: string;
  name: string;
  image?: string;
  images?: string[];
  salesPrice: number;
  displayPrice: number;
  regularPrice?: number;
  rating?: number;
  numReviews?: number;
  stockStatus?: string;
  brandName?: string;
  categoryName?: string;
  discount?: number;
  description?: string;
}

export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistProduct[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WishlistState {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
}

export interface WishlistResponse {
  wishlist: Wishlist;
  message?: string;
}

export interface AddProductPayload {
  productId: string;
}