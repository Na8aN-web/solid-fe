// src/store/slices/adminDashboardSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../services/api/axios";

// Types
export interface DashboardMetrics {
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  revenueChange: number;
  customersChange: number;
  productsChange: number;
  ordersChange: number;
}

// USER
export interface User {
  _id: string;
  firstName: string;
  lastName: number;
  phoneNumber: number;
  email: number;
  coompanyName: number;
  role: string;
}

// Helpers to parse variable backend shapes safely
function parseUsersList(data: any): User[] {
  // Accept any of: {users: [...]}, {data:{users:[...]}}, or direct [...]
  if (Array.isArray(data)) return data as User[];
  if (Array.isArray(data?.users)) return data.users as User[];
  if (Array.isArray(data?.data?.users)) return data.data.users as User[];
  // If API returns a single user instead of a list by mistake
  if (data && typeof data === "object" && data._id) return [data as User];
  throw new Error("Invalid users payload");
}

function parseSingleUser(data: any): User {
  // Accept any of: {user:{...}}, direct {...}
  if (data?.user && data.user._id) return data.user as User;
  if (data && data._id) return data as User;
  throw new Error("Invalid user payload");
}

export interface Order {
  id: string;
  product: string;
  buyer: string;
  orderId: string;
  amount: string;
  status: "Delivered" | "Processing" | "Returned";
  productImage?: string;
  createdAt: string;
}

export interface LowStockProduct {
  id: string;
  name: string;
  currentStock: number;
  minStockLevel: number;
  stockPercentage: number;
}

//Product type
export interface Product {
  _id: string;
  name: string;
  displayPrice: number;
  regularPrice: number;
  numReviews: number;
  rating: number;
  image: string;
  categoryName: string;
  brandName: string;
  stock?: number;
  quantity?: number;
  minStock?: number;
  department?: string;
}

// Product creation interface
export interface CreateProductData {
  name: string;
  briefDescription: string;
  fullDescription: string;
  images: string[];
  description?: string;
  partNumber?: string;
  category: string;
  department?: string;
  brand: string;
  vehicleType?: string;
  weight?: number;
  packageSize: {
    length: number;
    breadth: number;
    width: number;
  };
  material?: string;
  stockStatus: string;
  quantityInStock: number;
  units?: string;
  sku?: string;
  minStock: number;
  regularPrice: number;
  salesPrice: number;
  discount?: number;
  discountPrice?: number;
  minOrderQuantity: number;
  tieredPricingType: string;
  tieredPricing: {
    quantity: number;
    price: number;
  }[];
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  createdBy: string;
  store?: string;
}

export interface BackendProduct {
  _id: string;
  store?: string;
  name: string;
  briefDescription?: string;
  fullDescription?: string;
  images: string[];
  description?: string;
  partNumber?: string;
  category: string; // id
  department?: string; // id
  brand: string; // id
  vehicleType?: string; // id
  weight?: number;
  packageSize?: { length: number; breadth: number; width: number };
  material?: string;
  stockStatus?: string;
  quantityInStock?: number;
  units?: string;
  sku?: string;
  minStock?: number;
  regularPrice: number;
  salesPrice: number;
  discount?: number;
  discountPrice?: number;
  minOrderQuantity?: number;
  tieredPricingType?: string;
  tieredPricing?: { quantity: number; price: number }[];
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Category creation interface
export interface CreateProductCategory {
  name: string;
}

// Category interface
export interface ProductCategory {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Brand creation interface
export interface CreateProductBrand {
  name: string;
}

// Brand interface
export interface ProductBrand {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Vehicle creation interface
export interface CreateProductVehicleType {
  name: string;
}

// Vehicle interface
export interface ProductVehicleType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDepartment {
  name: string;
}

// Vehicle interface
export interface ProductDepartment {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types (matching Swagger)
interface UsersCountResponse {
  userCount: number;
}

interface ProductsCountResponse {
  productCount: number;
}

interface ProductsResponse {
  products: Product[];
}

interface CategoriesResponse {
  categories: ProductCategory[];
}
interface CategoryCreateResponse {
  category: ProductCategory;
}
interface BrandsResponse {
  brands: ProductBrand[];
}
interface BrandCreateResponse {
  brand: ProductBrand;
}
interface VehiclesResponse {
  vehicles: ProductVehicleType[];
}
interface VehicleCreateResponse {
  vehicle: ProductVehicleType;
}

interface DepartmentsResponse {
  departments: ProductDepartment[];
}
interface DepartmentCreateResponse {
  department: ProductDepartment;
}

export interface AdminDashboardState {
  metrics: DashboardMetrics | null;
  users: User[];
  userDetails: User | null;
  recentOrders: Order[];
  lowStockProducts: LowStockProduct[];
  products: Product[];
  categories: ProductCategory[];
  brands: ProductBrand[];
  vehicles: ProductVehicleType[];
  departments: ProductDepartment[];
  loading: {
    metrics: boolean;
    users: boolean;
    user: boolean;
    orders: boolean;
    lowStock: boolean;
    products: boolean;
    fetchProductById: boolean;
    updateProduct: boolean;
    deleteProduct: boolean;
    addProduct: boolean;
    addProductCategory: boolean;
    updateProductCategory: boolean;
    categories: boolean;
    addProductBrand: boolean;
    updateProductBrand: boolean;
    brands: boolean;
    addProductVehicleType: boolean;
    updateProductVehicleType: boolean;
    vehicles: boolean;
    addProductDepartment: boolean;
    updateProductDepartment: boolean;
    departments: boolean;
    selectedProduct: boolean;
  };
  error: {
    metrics: string | null;
    users: string | null;
    user: string | null;
    orders: string | null;
    lowStock: string | null;
    products: string | null;
    fetchProductById: string | null;
    updateProduct: string | null;
    deleteProduct: string | null;
    addProduct: string | null;
    addProductCategory: string | null;
    updateProductCategory: string | null;
    categories: string | null;
    addProductBrand: string | null;
    updateProductBrand: string | null;
    brands: string | null;
    addProductVehicleType: string | null;
    updateProductVehicleType: string | null;
    vehicles: string | null;
    addProductDepartment: string | null;
    updateProductDepartment: string | null;
    departments: string | null;
    error: string | null;
    selectedProduct: any | null;
  };
}

const initialState: AdminDashboardState = {
  metrics: null,
  recentOrders: [],
  lowStockProducts: [],
  products: [],
  categories: [],
  brands: [],
  vehicles: [],
  departments: [],
  users: [],
  userDetails: null,
  loading: {
    metrics: false,
    orders: false,
    lowStock: false,
    products: false,
    deleteProduct: false,
    addProduct: false,
    addProductCategory: false,
    updateProductCategory: false,
    categories: false,
    addProductBrand: false,
    updateProductBrand: false,
    brands: false,
    addProductVehicleType: false,
    updateProductVehicleType: false,
    vehicles: false,
    addProductDepartment: false,
    updateProductDepartment: false,
    departments: false,
    users: false,
    user: false,
    fetchProductById: false,
    updateProduct: false,
    selectedProduct: false,
  },
  error: {
    error: null,
    metrics: null,
    orders: null,
    lowStock: null,
    products: null,
    deleteProduct: null,
    addProduct: null,
    addProductCategory: null,
    categories: null,
    addProductBrand: null,
    updateProductBrand: null,
    brands: null,
    addProductVehicleType: null,
    updateProductCategory: null,
    updateProductVehicleType: null,
    vehicles: null,
    addProductDepartment: null,
    updateProductDepartment: null,
    departments: null,
    users: null,
    user: null,
    fetchProductById: null,
    updateProduct: null,
    selectedProduct: null,
  },
};

// Async Thunks
export const fetchDashboardMetrics = createAsyncThunk(
  "adminDashboard/fetchMetrics",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch multiple endpoints in parallel
      const [usersResponse, productsResponse] = await Promise.all([
        axiosInstance.get<UsersCountResponse>("/users/count"),
        axiosInstance.get<ProductsCountResponse>("/products/count"),
      ]);

      // Extract counts from the proper response structure
      const totalCustomers = usersResponse.data.userCount || 0;
      const totalProducts = productsResponse.data.productCount || 0;

      // Mock data for revenue and orders - replace with real API calls when available
      // You might need to create additional endpoints like:
      // - /orders/count for totalOrders
      // - /orders/revenue or /analytics/revenue for totalRevenue
      const totalRevenue = 250000;
      const totalOrders = 1250;

      const metrics: DashboardMetrics = {
        totalRevenue,
        totalCustomers,
        totalProducts,
        totalOrders,
        revenueChange: 24.1,
        customersChange: 12.1,
        productsChange: -10.2,
        ordersChange: 28.8,
      };

      return metrics;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(
        "Failed to fetch dashboard metrics. Please try again."
      );
    }
  }
);

export const fetchRecentOrders = createAsyncThunk(
  "adminDashboard/fetchRecentOrders",
  async (_, { rejectWithValue }) => {
    try {
      // Note: You might need to create an orders endpoint or admin-specific orders endpoint
      // The current API doesn't seem to have orders endpoints based on the Swagger
      // You may need to add endpoints like:
      // - GET /orders?limit=10&sort=-createdAt
      // - GET /admin/orders/recent

      // For now, using mock data structure that matches your Order interface
      const mockOrders: Order[] = [
        {
          id: "1",
          product: "Toyota Brain Box 2016",
          buyer: "John Doe",
          orderId: "2563823270",
          amount: "₦250,000.00",
          status: "Delivered",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          product: "Honda Parts Kit",
          buyer: "Jane Smith",
          orderId: "2563823271",
          amount: "₦180,000.00",
          status: "Processing",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          product: "Mercedes Engine",
          buyer: "Mike Johnson",
          orderId: "2563823272",
          amount: "₦420,000.00",
          status: "Delivered",
          createdAt: new Date().toISOString(),
        },
      ];

      return mockOrders;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(
        "Failed to fetch recent orders. Please try again."
      );
    }
  }
);

export const fetchLowStockProducts = createAsyncThunk(
  "adminDashboard/fetchLowStockProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch products - using the correct response structure from Swagger
      const response = await axiosInstance.get<ProductsResponse>("/products");

      // Handle both possible response structures
      const products = response.data.products || response.data || [];

      if (!Array.isArray(products)) {
        throw new Error("Invalid products data received");
      }

      // Filter products with low stock
      const lowStockProducts: LowStockProduct[] = products
        .filter((product) => {
          const currentStock = product.stock || product.quantity || 0;
          const minStockLevel = product.minStock || 20;
          return currentStock <= minStockLevel && currentStock > 0; // Only show products that exist but are low
        })
        .map((product) => {
          const currentStock = product.stock || product.quantity || 0;
          const minStockLevel = product.minStock || 20;

          return {
            id: product._id,
            name: product.name,
            currentStock,
            minStockLevel,
            stockPercentage: Math.round((currentStock / minStockLevel) * 100),
          };
        })
        .sort((a, b) => a.stockPercentage - b.stockPercentage) // Sort by lowest stock percentage first
        .slice(0, 5); // Limit to 5 items

      return lowStockProducts;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(
        "Failed to fetch low stock products. Please try again."
      );
    }
  }
);

// GET /users  ->  { users: User[] }
export const fetchAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("adminDashboard/fetchAllUsers", async (_: void, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/users");
    const users = parseUsersList(res.data);
    return users;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch users.";
    return rejectWithValue(msg);
  }
});

// GET /users/:id  ->  { user: User } (or just the user)
export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("adminDashboard/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/users/${id}`);
    const user = parseSingleUser(res.data);
    return user;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch user.";
    return rejectWithValue(msg);
  }
});

// fetch categories thunk
export const fetchAllCategories = createAsyncThunk(
  "adminDashboard/categories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<
        CategoriesResponse | ProductCategory[]
      >("/categories");

      const categories: ProductCategory[] = Array.isArray(res.data)
        ? res.data
        : res.data.categories;

      if (!Array.isArray(categories)) {
        throw new Error("Invalid categories data received");
      }
      return categories;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch categories. Please try again.");
    }
  }
);

// fetch brands thunk
export const fetchAllBrands = createAsyncThunk(
  "adminDashboard/brands",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<BrandsResponse | ProductBrand[]>(
        "/brands"
      );

      const brands: ProductBrand[] = Array.isArray(res.data)
        ? res.data
        : res.data.brands;

      if (!Array.isArray(brands)) {
        throw new Error("Invalid brands data received");
      }
      return brands;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch categories. Please try again.");
    }
  }
);

export const fetchAllVehiclesType = createAsyncThunk(
  "adminDashboard/vehicle-types",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<
        VehiclesResponse | ProductVehicleType[]
      >("/vehicle-types");

      const vehicles: ProductVehicleType[] = Array.isArray(res.data)
        ? res.data
        : res.data.vehicles;

      if (!Array.isArray(vehicles)) {
        throw new Error("Invalid vehicles data received");
      }
      return vehicles;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch vehicles. Please try again.");
    }
  }
);

export const fetchAllDepartments = createAsyncThunk(
  "adminDashboard/departments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<
        DepartmentsResponse | ProductDepartment[]
      >("/departments");

      const departments: ProductDepartment[] = Array.isArray(res.data)
        ? res.data
        : res.data.departments;

      if (!Array.isArray(departments)) {
        throw new Error("Invalid departments data received");
      }
      return departments;
    } catch (error: any) {
      if (error.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      if (error.response?.data?.error)
        return rejectWithValue(error.response.data.error);
      return rejectWithValue("Failed to fetch departments. Please try again.");
    }
  }
);

export const addProductCategory = createAsyncThunk(
  "adminDashboard/addProductCategory",
  async (categoryData: CreateProductCategory, { rejectWithValue }) => {
    try {
      // Make POST request to create category
      const response = await axiosInstance.post<CategoryCreateResponse>(
        "/categories",
        categoryData
      );

      return response.data.category; // Return the created category
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add category. Please try again.");
    }
  }
);

export const addProductBrand = createAsyncThunk(
  "adminDashboard/addProductBrand",
  async (brandData: CreateProductBrand, { rejectWithValue }) => {
    try {
      // Make POST request to create category
      const response = await axiosInstance.post<BrandCreateResponse>(
        "/brands",
        brandData
      );

      return response.data.brand; // Return the created brand
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add brand. Please try again.");
    }
  }
);

export const addProductVehicleType = createAsyncThunk(
  "adminDashboard/addProductVehicleType",
  async (vehicleData: CreateProductVehicleType, { rejectWithValue }) => {
    try {
      // Make POST request to create category
      const response = await axiosInstance.post<VehicleCreateResponse>(
        "/vehicle-types",
        vehicleData
      );

      return response.data.vehicle;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add vehicle. Please try again.");
    }
  }
);

export const addProductDepartment = createAsyncThunk(
  "adminDashboard/addProductDepartment",
  async (departmentData: CreateProductDepartment, { rejectWithValue }) => {
    try {
      // Make POST request to create department
      const response = await axiosInstance.post<DepartmentCreateResponse>(
        "/departments",
        departmentData
      );

      return response.data.department;
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add department. Please try again.");
    }
  }
);

// Helper: unwrap either { category: {...} } or plain {...}
// function extractCategory(data: any): ProductCategory | null {
//   const c = data?.category ?? data?.data?.category ?? data?.data ?? data;
//   return c && typeof c._id === "string" && typeof c.name === "string"
//     ? c
//     : null;
// }

// update product category
export interface UpdateProductCategory {
  name?: string;
}
// UPDATE category
export const updateProductCategory = createAsyncThunk<
  ProductCategory,
  { id: string; data: UpdateProductCategory },
  { rejectValue: string }
>(
  "adminDashboard/updateProductCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/categories/${id}`, data);
      const category = res.data;
      if (!category) return rejectWithValue("Invalid category payload");
      return category;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update category.");
    }
  }
);

export const deleteProductCategory = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>("adminDashboard/deleteProductCategory", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/categories/${id}`);
    return id;
  } catch (err: any) {
    if (err.response?.data?.message)
      return rejectWithValue(err.response.data.message);
    if (err.response?.data?.error)
      return rejectWithValue(err.response.data.error);
    return rejectWithValue("Failed to delete category.");
  }
});

// update product brand
export interface UpdateProductBrand {
  name?: string;
}
// UPDATE brand
export const updateProductBrand = createAsyncThunk<
  ProductBrand,
  { id: string; data: UpdateProductBrand },
  { rejectValue: string }
>(
  "adminDashboard/updateProductBrand",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/brands/${id}`, data);
      const brand = res.data;
      if (!brand) return rejectWithValue("Invalid brand payload");
      return brand;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update brand.");
    }
  }
);

export const deleteProductBrand = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>("adminDashboard/deleteProductBrand", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/brands/${id}`);
    return id;
  } catch (err: any) {
    if (err.response?.data?.message)
      return rejectWithValue(err.response.data.message);
    if (err.response?.data?.error)
      return rejectWithValue(err.response.data.error);
    return rejectWithValue("Failed to delete brand.");
  }
});

// update product vehicle type
export interface UpdateProductVehicleType {
  name?: string;
}
// UPDATE vehicle type
export const updateProductVehicleType = createAsyncThunk<
  ProductVehicleType,
  { id: string; data: UpdateProductVehicleType },
  { rejectValue: string }
>(
  "adminDashboard/updateProductVehicleType",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/vehicle-types/${id}`, data);
      const vehicle = res.data;
      if (!vehicle) return rejectWithValue("Invalid vehicle-type payload");
      return vehicle;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update vehicle-type.");
    }
  }
);

export const deleteProductVehicleType = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>(
  "adminDashboard/deleteProductVehicleType",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/vehicle-types/${id}`);
      return id;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to delete vehicle-type.");
    }
  }
);

// update product vehicle type
export interface UpdateProductDepartment {
  name?: string;
}
// UPDATE department
export const updateProductDepartment = createAsyncThunk<
  ProductDepartment,
  { id: string; data: UpdateProductDepartment },
  { rejectValue: string }
>(
  "adminDashboard/updateProductDepartment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/departments/${id}`, data);
      const department = res.data;
      if (!department)
        return rejectWithValue("Invalid department-type payload");
      return department;
    } catch (err: any) {
      if (err.response?.data?.message)
        return rejectWithValue(err.response.data.message);
      if (err.response?.data?.error)
        return rejectWithValue(err.response.data.error);
      return rejectWithValue("Failed to update department.");
    }
  }
);

export const deleteProductDepartment = createAsyncThunk<
  string, // we return the deleted id
  string, // id
  { rejectValue: string }
>("adminDashboard/deleteProductDepartment", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/departments/${id}`);
    return id;
  } catch (err: any) {
    if (err.response?.data?.message)
      return rejectWithValue(err.response.data.message);
    if (err.response?.data?.error)
      return rejectWithValue(err.response.data.error);
    return rejectWithValue("Failed to delete department.");
  }
});

export const deleteProduct = createAsyncThunk(
  "adminDashboard/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      // Make DELETE request to your API
      await axiosInstance.delete(`/products/${productId}`);

      return productId; // Return the deleted product ID
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to delete product. Please try again.");
    }
  }
);

export const addProduct = createAsyncThunk(
  "adminDashboard/addProduct",
  async (data: FormData | Record<string, any>, { rejectWithValue }) => {
    try {
      const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

      const res = await axiosInstance.post<{ product: BackendProduct }>(
        "/products",
        data,
        {
          ...(isFormData && {
            headers: { "Content-Type": "multipart/form-data" },
          }),
        }
      );
      
      return res.data.product;
    } catch (error: any) {
      console.error(
        "Add product error:",
        error?.response?.data || error?.message
      );

      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to add product. Please try again.";
      return rejectWithValue(msg);
    }
  }
);


export const fetchProductById = createAsyncThunk(
  "adminDashboard/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.post<{ product: BackendProduct }>(
      //   `/products/${productId}`,
      //   productId,
      //   { headers: { "Content-Type": "multipart/form-data" } }
      // );
      // return response.data;
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data; // return the product data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "adminDashboard/updateProduct",
  async (
    { id, data }: { id: string; data: FormData | Record<string, any> }, 
    { rejectWithValue }
  ) => {
    try {
      const isFormData = data instanceof FormData;
      
      const response = await axiosInstance.put(`/products/${id}`, data, {
        // Only set multipart header if it's FormData
        ...(isFormData && { 
          headers: { 
            "Content-Type": "multipart/form-data" 
          } 
        }),
      });
      
      return response.data;
    } catch (error: any) {
      console.error("Update product error:", error.response?.data || error.message);
      
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data?.error ||
        "Failed to update product"
      );
    }
  }
);

export interface CreateProductWithFiles {
  productData: Omit<CreateProductData, "images">;
  imageFiles: File[];
}

// And then create a separate thunk:
export const addProductWithFiles = createAsyncThunk(
  "adminDashboard/addProductWithFiles",
  async (
    { productData, imageFiles }: CreateProductWithFiles,
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      // Add all product data fields to FormData
      Object.entries(productData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "object" && !Array.isArray(value)) {
            // Handle nested objects like packageSize
            formData.append(key, JSON.stringify(value));
          } else if (Array.isArray(value)) {
            // Handle arrays like tieredPricing
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add image files
      imageFiles.forEach((file, index) => {
        formData.append("images", file);
      });

      const response = await axiosInstance.post<{ product: Product }>(
        "/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.product;
    } catch (error: any) {
      console.error(
        "Add product with files error:",
        error.response?.data || error.message
      );

      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("Failed to add product. Please try again.");
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    clearDashboardErrors: (state) => {
      state.error = {
        metrics: null,
        users: null,
        user: null,
        orders: null,
        lowStock: null,
        products: null,
        fetchProductById: null,
        updateProduct: null,
        deleteProduct: null,
        addProduct: null,
        addProductCategory: null,
        updateProductCategory: null,
        categories: null,
        addProductBrand: null,
        updateProductBrand: null,
        brands: null,
        addProductVehicleType: null,
        updateProductVehicleType: null,
        vehicles: null,
        addProductDepartment: null,
        updateProductDepartment: null,
        departments: null,
        selectedProduct: null,
        error: null,
      };
    },
    refreshDashboard: (state) => {
      // This can be used to trigger a full dashboard refresh
      state.loading = {
        metrics: true,
        users: true,
        user: true,
        orders: true,
        lowStock: true,
        products: true,
        fetchProductById: true,
        updateProduct: true,
        deleteProduct: true,
        addProduct: true,
        addProductCategory: true,
        updateProductCategory: true,
        categories: true,
        addProductBrand: true,
        updateProductBrand: true,
        brands: true,
        addProductVehicleType: true,
        updateProductVehicleType: true,
        vehicles: true,
        addProductDepartment: true,
        updateProductDepartment: true,
        departments: true,
        selectedProduct: true,
      };
    },
    // Add a reducer to update individual metrics if needed
    updateMetric: (
      state,
      action: PayloadAction<{ key: keyof DashboardMetrics; value: number }>
    ) => {
      if (state.metrics) {
        state.metrics[action.payload.key] = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch dashboard metrics
    builder.addCase(fetchDashboardMetrics.pending, (state) => {
      state.loading.metrics = true;
      state.error.metrics = null;
    });
    builder.addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
      state.loading.metrics = false;
      state.metrics = action.payload;
    });
    builder.addCase(fetchDashboardMetrics.rejected, (state, action) => {
      state.loading.metrics = false;
      state.error.metrics = action.payload as string;
    });

    // Fetch recent orders
    builder.addCase(fetchRecentOrders.pending, (state) => {
      state.loading.orders = true;
      state.error.orders = null;
    });
    builder.addCase(fetchRecentOrders.fulfilled, (state, action) => {
      state.loading.orders = false;
      state.recentOrders = action.payload;
    });
    builder.addCase(fetchRecentOrders.rejected, (state, action) => {
      state.loading.orders = false;
      state.error.orders = action.payload as string;
    });

    // Fetch low stock products
    builder.addCase(fetchLowStockProducts.pending, (state) => {
      state.loading.lowStock = true;
      state.error.lowStock = null;
    });
    builder.addCase(fetchLowStockProducts.fulfilled, (state, action) => {
      state.loading.lowStock = false;
      state.lowStockProducts = action.payload;
    });
    builder.addCase(fetchLowStockProducts.rejected, (state, action) => {
      state.loading.lowStock = false;
      state.error.lowStock = action.payload as string;
    });

    // ---- fetchAllUsers ----
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading.users = true;
      state.error.users = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading.users = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading.users = false;
      state.error.users =
        (action.payload as string) ?? "Failed to fetch users.";
    });

    // ---- fetchUserById ----
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading.user = true;
      state.error.user = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading.user = false;
      state.userDetails = action.payload;
      const idx = state.users.findIndex((u) => u._id === action.payload._id);
      if (idx !== -1) state.users[idx] = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading.user = false;
      state.error.user = (action.payload as string) ?? "Failed to fetch user.";
    });
    // Fetch all categories
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading.categories = true;
      state.error.categories = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading.categories = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading.categories = false;
      state.error.categories = action.payload as string;
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading.deleteProduct = true;
      state.error.deleteProduct = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading.deleteProduct = false;
      // Remove the deleted product from the products array
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.error.deleteProduct = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading.deleteProduct = false;
      state.error.deleteProduct = action.payload as string;
    });
    // Add product
    builder.addCase(addProduct.pending, (state) => {
      state.loading.addProduct = true;
      state.error.addProduct = null;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading.addProduct = false;
      const p = action.payload as unknown as BackendProduct;
    
      const uiProduct: Product = {
        _id: p._id,
        name: p.name,
        displayPrice: p.salesPrice,
        regularPrice: p.regularPrice,
        numReviews: p.numReviews ?? 0,
        rating: p.rating ?? 0,
        image: p.images?.[0] ?? "",
        categoryName: state.categories.find(c => c._id === p.category)?.name ?? "",
        brandName: state.brands.find(b => b._id === p.brand)?.name ?? "",
        department: state.departments.find(d => d._id === p.department)?.name ?? "",
        stock: p.quantityInStock,
        minStock: p.minStock,
      };
    
      if (!Array.isArray(state.products)) state.products = [];
      state.products.unshift(uiProduct);
    });   
    
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading.addProduct = false;
      state.error.addProduct = action.payload as string;
    });

    // --- Fetch single product ---
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading.fetchProductById = true;
      state.error.fetchProductById = null;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading.fetchProductById = false;
      state.products = action.payload.data || action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading.fetchProductById = false;
      state.error.fetchProductById = action.payload as string;
    });

    // --- Update product ---
    builder.addCase(updateProduct.pending, (state) => {
      state.loading.updateProduct = true;
      state.error.fetchProductById = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading.updateProduct = false;
      // Optionally update products list if you store them
      if (state.products && Array.isArray(state.products)) {
        const updated = action.payload.data || action.payload;
        const index = state.products.findIndex(
          (p: any) => p._id === updated._id
        );
        if (index !== -1) state.products[index] = updated;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading.updateProduct = false;
      state.error.fetchProductById = action.payload as string;
    });

    // Add product Category
    builder.addCase(addProductCategory.pending, (state) => {
      state.loading.addProductCategory = true;
      state.error.addProductCategory = null;
    });
    builder.addCase(addProductCategory.fulfilled, (state, action) => {
      state.loading.addProductCategory = false;
      state.categories.push(action.payload);
    });
    builder.addCase(addProductCategory.rejected, (state, action) => {
      state.loading.addProductCategory = false;
      state.error.addProductCategory = action.payload as string;
    });
    // Add product Brand
    builder.addCase(addProductBrand.pending, (state) => {
      state.loading.addProductBrand = true;
      state.error.addProductBrand = null;
    });
    builder.addCase(addProductBrand.fulfilled, (state, action) => {
      state.loading.addProductBrand = false;
      state.brands.push(action.payload);
    });
    builder.addCase(addProductBrand.rejected, (state, action) => {
      state.loading.addProductBrand = false;
      state.error.addProductBrand = action.payload as string;
    });

    // Add product Vehicle Type
    builder.addCase(addProductVehicleType.pending, (state) => {
      state.loading.addProductVehicleType = true;
      state.error.addProductVehicleType = null;
    });
    builder.addCase(addProductVehicleType.fulfilled, (state, action) => {
      state.loading.addProductVehicleType = false;
      state.vehicles.push(action.payload);
    });
    builder.addCase(addProductVehicleType.rejected, (state, action) => {
      state.loading.addProductVehicleType = false;
      state.error.addProductVehicleType = action.payload as string;
    });

    // Add product Department
    builder.addCase(addProductDepartment.pending, (state) => {
      state.loading.addProductDepartment = true;
      state.error.addProductDepartment = null;
    });
    builder.addCase(addProductDepartment.fulfilled, (state, action) => {
      state.loading.addProductDepartment = false;
      state.departments.push(action.payload);
    });
    builder.addCase(addProductDepartment.rejected, (state, action) => {
      state.loading.addProductDepartment = false;
      state.error.addProductDepartment = action.payload as string;
    });

    // fetch all brands
    builder.addCase(fetchAllBrands.pending, (state) => {
      state.loading.brands = true;
      state.error.brands = null;
    });
    builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
      state.loading.brands = false;
      state.brands = action.payload;
    });
    builder.addCase(fetchAllBrands.rejected, (state, action) => {
      state.loading.brands = false;
      state.error.brands = action.payload as string;
    });

    // fetch all vehicle type
    builder.addCase(fetchAllVehiclesType.pending, (state) => {
      state.loading.vehicles = true;
      state.error.vehicles = null;
    });
    builder.addCase(fetchAllVehiclesType.fulfilled, (state, action) => {
      state.loading.vehicles = false;
      state.vehicles = action.payload;
    });
    builder.addCase(fetchAllVehiclesType.rejected, (state, action) => {
      state.loading.vehicles = false;
      state.error.vehicles = action.payload as string;
    });

    // fetch all department
    builder.addCase(fetchAllDepartments.pending, (state) => {
      state.loading.departments = true;
      state.error.departments = null;
    });
    builder.addCase(fetchAllDepartments.fulfilled, (state, action) => {
      state.loading.departments = false;
      state.departments = action.payload;
    });
    builder.addCase(fetchAllDepartments.rejected, (state, action) => {
      state.loading.departments = false;
      state.error.departments = action.payload as string;
    });

    // UPDATE DEPARTMENT
    builder
      .addCase(updateProductDepartment.pending, (state) => {
        state.loading.updateProductDepartment = true; // Use specific key
        state.error.updateProductDepartment = null;
      })
      .addCase(updateProductDepartment.fulfilled, (state, action) => {
        state.loading.updateProductDepartment = false;
        const updated = action.payload;
        const idx = state.departments.findIndex((d) => d._id === updated._id);
        if (idx !== -1) state.departments[idx] = updated;
      })
      .addCase(updateProductDepartment.rejected, (state, action) => {
        state.loading.updateProductDepartment = false;
        state.error.updateProductDepartment =
          (action.payload as string) ?? "Failed to update department.";
      });

    // DELETE DEPARTMENT
    builder
      .addCase(deleteProductDepartment.pending, (state) => {
        state.loading.departments = true;
        state.error.departments = null;
      })
      .addCase(deleteProductDepartment.fulfilled, (state, action) => {
        state.loading.departments = false;
        const id = action.payload;
        state.departments = state.departments.filter((d) => d._id !== id);
      })
      .addCase(deleteProductDepartment.rejected, (state, action) => {
        state.loading.departments = false;
        state.error.departments =
          (action.payload as string) ?? "Failed to delete department.";
      });

    // UPDATE CATEGORY
    builder
      .addCase(updateProductCategory.pending, (state) => {
        state.loading.updateProductCategory = true; // Use specific key
        state.error.updateProductCategory = null;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.loading.updateProductCategory = false;
        const updated = action.payload;
        const idx = state.categories.findIndex((c) => c._id === updated._id);
        if (idx !== -1) state.categories[idx] = updated;
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.loading.updateProductCategory = false;
        state.error.updateProductCategory =
          (action.payload as string) ?? "Failed to update category.";
      });

    // DELETE CATEGORY
    builder
      .addCase(deleteProductCategory.pending, (state) => {
        state.loading.categories = true; // brief spinner on the list
        state.error.categories = null;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.loading.categories = false;
        const id = action.payload;
        state.categories = state.categories.filter((c) => c._id !== id);
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories =
          (action.payload as string) ?? "Failed to delete category.";
      });

    // UPDATE BRAND
    builder
      .addCase(updateProductBrand.pending, (state) => {
        state.loading.updateProductBrand = true;
        state.error.updateProductBrand = null;
      })
      .addCase(updateProductBrand.fulfilled, (state, action) => {
        state.loading.updateProductBrand = false;
        const updated = action.payload;
        const idx = state.brands.findIndex((b) => b._id === updated._id);
        if (idx !== -1) state.brands[idx] = updated;
      })
      .addCase(updateProductBrand.rejected, (state, action) => {
        state.loading.updateProductBrand = false;
        state.error.updateProductBrand =
          (action.payload as string) ?? "Failed to update brand.";
      });

    // DELETE BRAND
    builder
      .addCase(deleteProductBrand.pending, (state) => {
        state.loading.brands = true;
        state.error.brands = null;
      })
      .addCase(deleteProductBrand.fulfilled, (state, action) => {
        state.loading.brands = false;
        const id = action.payload;
        state.brands = state.brands.filter((b) => b._id !== id);
      })
      .addCase(deleteProductBrand.rejected, (state, action) => {
        state.loading.brands = false;
        state.error.brands =
          (action.payload as string) ?? "Failed to delete brand.";
      });

    // UPDATE VEHICLE-TYPE
    builder
      .addCase(updateProductVehicleType.pending, (state) => {
        state.loading.updateProductVehicleType = true;
        state.error.updateProductVehicleType = null;
      })
      .addCase(updateProductVehicleType.fulfilled, (state, action) => {
        state.loading.updateProductVehicleType = false;
        const updated = action.payload;
        const idx = state.vehicles.findIndex((v) => v._id === updated._id);
        if (idx !== -1) state.vehicles[idx] = updated;
      })
      .addCase(updateProductVehicleType.rejected, (state, action) => {
        state.loading.updateProductVehicleType = false;
        state.error.updateProductVehicleType =
          (action.payload as string) ?? "Failed to update vehicle-type.";
      });

    // DELETE VEHICLE-TYPE
    builder
      .addCase(deleteProductVehicleType.pending, (state) => {
        state.loading.vehicles = true;
        state.error.vehicles = null;
      })
      .addCase(deleteProductVehicleType.fulfilled, (state, action) => {
        state.loading.vehicles = false;
        const id = action.payload;
        state.vehicles = state.vehicles.filter((v) => v._id !== id);
      })
      .addCase(deleteProductVehicleType.rejected, (state, action) => {
        state.loading.vehicles = false;
        state.error.vehicles =
          (action.payload as string) ?? "Failed to delete vehicle-type.";
      });
  },
});

export const { clearDashboardErrors, refreshDashboard, updateMetric } =
  adminDashboardSlice.actions;

// export const selectSelectedProduct = (state: RootState) =>
//   state.adminDashboard.selectedProduct;

export default adminDashboardSlice.reducer;
