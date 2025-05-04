import React from "react";
import { ArrowLeft, Truck } from "lucide-react";
import { OrderTrackingProps } from "../types/order";
import StatusPill from "./StatusPill";

const OrderTracking: React.FC<OrderTrackingProps> = ({ order, onBack }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center">
                <button onClick={onBack} className="mr-3">
                    <ArrowLeft size={18} />
                </button>
                <h2 className="text-lg font-semibold">Track Order</h2>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-sm text-gray-500">Order Number</h3>
                        <p className="font-medium">{order.id}</p>
                    </div>
                    <StatusPill status={order.status} />
                </div>

                <div className="flex gap-3 mb-6">
                    <img src={order.image} alt={order.name} className="w-12 h-12 object-cover" />
                    <div>
                        <h4 className="font-medium">{order.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: 1</p>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Truck size={18} className="text-blue-600" />
                        <h3 className="font-medium text-blue-600">Delivery Status</h3>
                    </div>
                    <p className="text-gray-700">Your order is currently {order.status.toLowerCase()}</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium mb-3">Tracking Timeline</h3>

                    <div className="relative">
                        <div className="flex mb-4 relative">
                            <div className="mr-3">
                                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
                                <div className="absolute left-3 top-6 w-0.5 h-6 bg-green-500" />
                            </div>
                            <div>
                                <p className="font-medium">Order Placed</p>
                                <p className="text-sm text-gray-500">20-10-2024, 09:30 AM</p>
                            </div>
                        </div>

                        <div className="flex mb-4 relative">
                            <div className="mr-3">
                                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">✓</div>
                                <div className={`absolute left-3 top-6 w-0.5 h-6 ${
                                    order.status !== "Processing" ? "bg-green-500" : "bg-gray-200"
                                }`} />
                            </div>
                            <div>
                                <p className="font-medium">Processing</p>
                                <p className="text-sm text-gray-500">21-10-2024, 10:15 AM</p>
                            </div>
                        </div>

                        <div className="flex mb-4 relative">
                            <div className="mr-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    order.status === "Shipped" || order.status === "Delivered" ? "bg-green-500 text-white" : "bg-gray-200"
                                }`}>
                                    {order.status === "Shipped" || order.status === "Delivered" ? "✓" : ""}
                                </div>
                                <div className={`absolute left-3 top-6 w-0.5 h-6 ${
                                    order.status === "Delivered" ? "bg-green-500" : "bg-gray-200"
                                }`} />
                            </div>
                            <div>
                                <p className="font-medium">Shipped</p>
                                <p className="text-sm text-gray-500">
                                    {order.status === "Shipped" || order.status === "Delivered" ? "22-10-2024, 02:30 PM" : "Pending"}
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-4">
                            <div className="mr-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    order.status === "Delivered" ? "bg-green-500 text-white" : "bg-gray-200"
                                }`}>
                                    {order.status === "Delivered" ? "✓" : ""}
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">Delivered</p>
                                <p className="text-sm text-gray-500">
                                    {order.status === "Delivered" ? "25-10-2024, 11:45 AM" : "Pending"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;