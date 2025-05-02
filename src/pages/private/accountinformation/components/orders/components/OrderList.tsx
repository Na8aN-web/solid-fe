import React, { useState } from "react";
import { Package, Truck } from "lucide-react";
import { Order, OrderListProps } from "../types/order";
import { orderData } from "../data/orderData";
import OrderStatsCard from "./OrderStatsCard";
import OrderListItem from "./OrderListItem";
import SearchInput from "./SearchInput";

const OrderList: React.FC<OrderListProps> = ({ 
    onViewDetails, 
    onTrackOrder, 
    activeFilter 
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter orders based on active filter and search query
    const filteredOrders = orderData.filter(order => {
        const matchesFilter = activeFilter === "All" || order.status === activeFilter;
        const matchesSearch = order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.includes(searchQuery);
        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <div className="bg-white">
                <div className="mb-4 mt-2 mx-4">
                    <SearchInput 
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search products"
                    />
                </div>

                {/* Table for md+ screens */}
<div className="hidden md:block overflow-x-auto">
  <table className="w-full">
    <thead className="bg-[#E3E6EA]">
      <tr>
        <th className="text-left text-[14px] font-medium text-[#3D3D3D] py-3 px-4">Name</th>
        <th className="text-left text-[14px] font-medium text-[#3D3D3D] py-3 px-4">Price</th>
        <th className="text-left text-[14px] font-medium text-[#3D3D3D] py-3 px-4">Date</th>
        <th className="text-left text-[14px] font-medium text-[#3D3D3D] py-3 px-4">Status</th>
        <th className="text-left text-[14px] font-medium text-[#3D3D3D] py-3 px-4">Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredOrders.map((order) => (
        <OrderListItem
          key={order.id}
          order={order}
          onViewDetails={onViewDetails}
          onTrackOrder={onTrackOrder}
          isTable
        />
      ))}
      {filteredOrders.length === 0 && (
        <tr>
          <td colSpan={5} className="py-6 text-center text-gray-500">
            No orders found matching your criteria
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* Cards for small screens */}
<div className="md:hidden space-y-4 px-4 pb-4">
  {filteredOrders.map((order) => (
    <OrderListItem
      key={order.id}
      order={order}
      onViewDetails={onViewDetails}
      onTrackOrder={onTrackOrder}
      isTable={false}
    />
  ))}
  {filteredOrders.length === 0 && (
    <div className="text-center text-gray-500 py-6">
      No orders found matching your criteria
    </div>
  )}
</div>

            </div>
        </>
    );
};

export default OrderList;