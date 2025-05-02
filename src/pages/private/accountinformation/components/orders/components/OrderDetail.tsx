import React from "react";
import { ArrowLeft } from "lucide-react";
import { OrderDetailProps } from "../types/order";
import StatusPill from "./StatusPill";

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onBack }) => {
    const steps = [
        { label: "Order Placed", date: "20-10-2024", completed: true },
        { label: "Processing", date: "21-10-2024", completed: true },
        { label: "Shipped", date: "22-10-2024", completed: order.status !== "Processing" },
        { label: "Delivered", date: "25-10-2024", completed: order.status === "Delivered" }
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center">
                <button onClick={onBack} className="mr-3">
                    <ArrowLeft size={18} />
                </button>
                <h2 className="text-lg font-semibold">Order Details</h2>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-sm text-gray-500">Order Number</h3>
                        <p className="font-medium">{order.id}</p>
                    </div>
                    <StatusPill status={order.status} />
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                    <h3 className="text-sm font-medium mb-3">Order Tracking</h3>

                    <div className="relative">
                        {steps.map((step, index) => (
                            <div key={index} className="flex mb-4 relative">
                                <div className="mr-3">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        step.completed ? "bg-green-500 text-white" : "bg-gray-200"
                                    }`}>
                                        {step.completed ? "✓" : ""}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`absolute left-3 top-6 w-0.5 h-6 ${
                                            steps[index + 1].completed ? "bg-green-500" : "bg-gray-200"
                                        }`} />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{step.label}</p>
                                    <p className="text-sm text-gray-500">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                    <h3 className="text-sm font-medium mb-3">Order Items</h3>

                    <div className="flex gap-4 p-3 border border-gray-100 rounded-lg">
                        <img src={order.image} alt={order.name} className="w-12 h-12 object-cover" />
                        <div className="flex-grow">
                            <h4 className="font-medium">{order.name}</h4>
                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                        </div>
                        <div className="font-medium">{order.price}</div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                    <h3 className="text-sm font-medium mb-3">Shipping Address</h3>
                    <p className="text-gray-700">
                        123 Main Street<br />
                        Apartment 4B<br />
                        Lagos, Nigeria
                    </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium mb-3">Payment Information</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Subtotal</span>
                        <span>{order.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500">Shipping</span>
                        <span>₦1,500.00</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₦21,500.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;