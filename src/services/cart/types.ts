// src/services/cart/types.ts
export interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    inStock?: boolean;
  };
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  total: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface cartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}