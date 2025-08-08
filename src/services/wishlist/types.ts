// src/services/wishlists/types.ts

// Product in wishlist
export interface WishlistProduct {
  _id: string;
  name: string;
  images: string[];
  salesPrice: number;
  stockStatus: string;
}

// Wishlist structure
export interface Wishlist {
  _id: string;
  user: string;
  products: WishlistProduct[];
}

// State for the wishlist slice
export interface WishlistState {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
}

// Types for adding/removing products
export interface ProductWishlistAction {
  productId: string;
}