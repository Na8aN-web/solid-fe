export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  parentCategory?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesResponse extends Array<Category> {}

export interface CategoryState {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
  totalCategories: number;
}