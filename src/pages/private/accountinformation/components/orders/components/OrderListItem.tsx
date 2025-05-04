import React from "react";
import { OrderListItemProps } from "../types/order";
import StatusPill from "./StatusPill";

const OrderListItem: React.FC<OrderListItemProps> = ({
  order,
  onViewDetails,
  onTrackOrder,
  isTable = false,
}) => {
  if (isTable) {
    return (
      <tr className="border-t border-gray-100">
        <td className="py-4 px-4">
          <div className="flex items-center">
            <img src={order.image} alt={order.name} className="w-10 h-10 mr-3 object-cover" />
            <div>
              <div className="text-[14px] font-medium">{order.name}</div>
              <div className="text-[10px] text-[#919191]">Order #{order.id}</div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4 text-[14px] text-[#2D2828]">{order.price}</td>
        <td className="py-3 px-4 text-[14px] text-[#2D2828]">{order.date}</td>
        <td className="py-3 px-4 text-[14px] text-[#2D2828]">
          <StatusPill status={order.status} />
        </td>
        <td className="py-3 px-4">
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(order)}
              className="text-[#3D3D3D] hover:underline text-sm"
            >
              View details
            </button>
          </div>
        </td>
      </tr>
    );
  }

  // Mobile card layout
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
      <img
        src={order.image}
        alt={order.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between">
        <div>
          <div className="text-[14px] font-semibold text-gray-800">{order.name}</div>
          <div className="text-[10px] text-[#919191] mb-1">Order no: {order.id}</div>
          <StatusPill status={order.status} />
          <div className="text-[12px] text-gray-500 mt-1">On: {order.date}</div>
          <div className="text-[14px] text-[#2D2828] mt-1 font-medium">Price: {order.price}</div>
        </div>
        <button
          onClick={() => onViewDetails(order)}
          className="mt-2 text-sm text-blue-600 hover:underline self-start"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default OrderListItem;
