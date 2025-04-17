export enum UserRole {
    Individual = 'Individual',
    SubDistributor = 'SubDistributor',
    Importer = 'Importer',
    Manufacturer = 'Manufacturer',
}

export const accountTypeToUserRole = {
    'mechanics': UserRole.Individual,
    'sub-distributors': UserRole.SubDistributor,
    'importers': UserRole.Importer,
    'manufacturers': UserRole.Manufacturer,
};

export interface SignupData {
    email: string;
    phoneNumber: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    companyName?: string;
    businessName?: string;
    businessAddress?: string;
    businessRCNumber?: string;
    businessWebsite?: string;
}

export interface AuthResponse {
    message: string;
    user: any; // You can define a specific user type here
}