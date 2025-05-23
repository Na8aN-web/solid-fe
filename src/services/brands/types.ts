// src/services/brands/types.ts
export interface Brand {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandsResponse {
  brands: Brand[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface BrandState {
  brands: Brand[];
  brand: Brand | null;
  loading: boolean;
  error: string | null;
  totalBrands: number;
}