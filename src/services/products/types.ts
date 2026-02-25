export interface Product {
  categoryName: any;
  regularPrice: any;
  _id: string;
  name: string;
  category: string;
  maker: string;
  model: string;
  year: string;
  price: number;
  salesPrice: number;
  displayPrice: number;
  image: string;
  description: string;
  numReviews: number;
  rating: number;
  discount: number;
  favorite: boolean;
  brandName?: string;
  stock?: number;
  quantity?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  totalPages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationMeta;
  filter_data?: {
    categories: string[];
    brands: string[];
    departments: string[];
    models: string[];
    vehicleTypes: string[];
    years: string[];
  };
  sorting_options?: {
    name_asc: string;
    price_asc: string;
    price_desc: string;
    rating_desc: string;
  };
}

export interface ProductState {
  products: Product[];
  newArrivals: NewProduct[];
  featuredProducts: NewProduct[];
  dealsOfTheDay: NewProduct[];
  relatedProducts: Product[],
  product: Product | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalProducts: number;
  filters: {
    category: string[];
    maker: string[];
    model: string[];
    year: string[];
    minPrice: number;
    maxPrice: number;
  };
  sortBy: string;

}

export interface NewProduct {
  stockStatus: string | undefined;
  numReviews: number | undefined;
  discount: any;
  category: string;
  regularPrice: number;
  _id: string;
  name: string;
  displayPrice: number;
  rating: number;
  image: string;
  categoryName: string;
  brandName: string;
}

export interface NewProductsResponse {
  products: NewProduct[];
}

export interface DealsOfDayResponse {
  products: NewProduct[];
}

export interface SearchProductsQuery {
  name: string;
  page?: number;
  limit?: number;
}
