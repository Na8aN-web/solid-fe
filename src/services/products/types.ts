// src/services/products/types.ts
export interface Product {
    regularPrice: any;
    _id: number;
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
}

export interface ProductsResponse {
    products: Product[];
}

export interface ProductState {
    products: Product[];
    newArrivals: NewProduct[];
    featuredProducts: NewProduct[];
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

  export interface DealOfDayResponse {
    products: NewProduct[];
  }