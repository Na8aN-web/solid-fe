export interface Department {
    _id: string;
    name: string;
    // description?: string;
    // logo?: string;
    // isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface DepartmentsResponse {
    departments: Department[];
    total?: number;
    page?: number;
    limit?: number;
  }
  
  export interface DepartmentState {
    departments: Department[];
    department: Department | null;
    loading: boolean;
    error: string | null;
    totalDepartments: number;
  }