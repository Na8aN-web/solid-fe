// src/services/vehicleTypes/types.ts

// Single Vehicle Type
export interface VehicleType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Response for fetching all vehicle types
export interface VehicleTypesResponse {
  vehicleTypes: VehicleType[];
  total: number;
}

// Response for single vehicle type
export interface VehicleTypeResponse {
  vehicleType: VehicleType;
}

// State for the vehicle types slice
export interface VehicleTypeState {
  vehicleTypes: VehicleType[];
  vehicleType: VehicleType | null;
  loading: boolean;
  error: string | null;
  totalVehicleTypes: number;
}