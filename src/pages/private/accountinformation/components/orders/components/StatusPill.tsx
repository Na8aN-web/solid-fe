import React from "react";
import { StatusPillProps } from "../types/order";

// Component for the status pill
const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-600";
            case "Processing":
                return "bg-yellow-100 text-yellow-600";
            case "Shipped":
                return "bg-blue-100 text-blue-600";
            case "Returned":
                return "bg-orange-100 text-orange-600";
            case "Cancelled":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status}
        </span>
    );
};

export default StatusPill;