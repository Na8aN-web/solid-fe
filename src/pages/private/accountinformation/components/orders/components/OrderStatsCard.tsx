import React from "react";
import { OrderStatsCardProps } from "../types/order";

// Component for the order stats cards
const OrderStatsCard: React.FC<OrderStatsCardProps> = ({ icon, title, value }) => (
    <div className="bg-white rounded-lg border border-[#D9D9D9] p-4 w-[200px] flex items-center gap-3">
        <div className="text-primary border border-[#D9D9D9] p-2 rounded-[8px]">{icon}</div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="font-semibold text-lg">{value}</p>
        </div>
    </div>
);

export default OrderStatsCard;