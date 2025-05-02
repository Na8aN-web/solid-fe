// Define types for orders and components
export interface Order {
    id: string;
    name: string;
    price: string;
    date: string;
    status: "Delivered" | "Processing" | "Shipped" | "Returned" | "Cancelled";
    image: string;
}

export interface OrderStatsCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

export interface StatusPillProps {
    status: Order["status"];
}

export interface OrderDetailProps {
    order: Order;
    onBack: () => void;
}

export interface OrderTrackingProps {
    order: Order;
    onBack: () => void;
}

export interface OrderListProps {
    onViewDetails: (order: Order) => void;
    onTrackOrder: (order: Order) => void;
    activeFilter: string;
}

export interface OrderListItemProps {
    order: Order;
    onViewDetails: (order: Order) => void;
    onTrackOrder?: (order: Order) => void;
    isTable?: boolean;
  }  

export interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}