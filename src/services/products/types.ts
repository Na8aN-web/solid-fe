// src/services/products/types.ts
export interface Product {
    id: number;
    name: string;
    category: string;
    maker: string;
    model: string;
    year: string;
    price: number;
    salePrice: number;
    image: string;
    description: string;
    reviews: number;
    rating: number;
    discount: number;
    favorite: boolean;
}

export interface ProductsResponse {
    products: Product[];
}

export interface ProductState {
    products: Product[];
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