// src/services/cart/types.ts
export interface cartProduct {
  _id: string;
  name: string;
  images: string[];
  salesPrice: number;
  stockStatus: string;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  _id: string;
  user: string;
  products: cartProduct[];
}

export interface cartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}
