// src/services/cart/types.ts
export interface CartItem {
  product: {
    _id: string;
    name: string;
    briefDescription?: string;
    images: string[];
    partNumber?: string;
    brand: {
      _id: string;
      name: string;
    };
    stockStatus: string;
    salesPrice: number;
    id: string;
  };
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  products: CartItem[];
}

export interface Cart {
  products: CartItem[];
  total?: number;
  _id?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface cartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

export interface CartProduct {
  product: string; 
  quantity: number;
}