interface Brand {
    _id: string;
    name: string;
  }
  
  interface Category {
    _id: string;
    name: string;
  }
  
  interface PackageSize {
    length: number;
    breadth: number;
    width: number;
  }
  
  interface TieredPricing {
    quantity: number;
    price: number;
  }
  
  export interface Product {
    _id: string;
    name: string;
    brand: Brand;
    briefDescription: string;
    category: Category;
    createdAt: string;
    createdBy: string;
    department: string;
    discount: number;
    discountPrice: number;
    fullDescription: string;
    images: string[];
    isDealOfTheDay: boolean;
    isFeatured: boolean;
    isNewArrival: boolean;
    material: string;
    minOrderQuantity: number;
    minStock: number;
    numReviews: number;
    packageSize: PackageSize;
    partNumber: string;
    quantityInStock: number;
    rating: number;
    regularPrice: number;
    salesPrice: number;
    sku: string;
    stockStatus: string;
    store: string;
    tieredPricing: TieredPricing[];
    tieredPricingType: string;
    units: string;
    updatedAt: string;
    weight: number;
    __v: number;
  }
  