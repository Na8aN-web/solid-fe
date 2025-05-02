import React, { useState } from "react";
import { Order } from "./types/order";
import { Package, Truck } from "lucide-react";
import OrderStatsCard from "./components/OrderStatsCard";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import OrderTracking from "./components/OrderTracking";

// Main Orders component
const Orders: React.FC = () => {
    const [activeView, setActiveView] = useState<"list" | "detail" | "tracking">("list");
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Handle view details button click
    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setActiveView("detail");
    };

    // Handle track order button click
    const handleTrackOrder = (order: Order) => {
        setSelectedOrder(order);
        setActiveView("tracking");
    };

    // Handle back button click
    const handleBackToList = () => {
        setActiveView("list");
        setSelectedOrder(null);
    };

    // Filters for the tabs
    const filters: Array<{ id: string; label: string }> = [
        { id: "All", label: "All" },
        { id: "Delivered", label: "Delivered (32)" },
        { id: "Processing", label: "Processing (8)" },
        { id: "Returned", label: "Returned (5)" },
        { id: "Cancelled", label: "Cancelled (9)" }
    ];

    // Render the active view
    const renderActiveView = () => {
        switch (activeView) {
            case "detail":
                return selectedOrder ? (
                    <OrderDetail order={selectedOrder} onBack={handleBackToList} />
                ) : (
                    <div className="p-6 bg-white rounded-lg border border-gray-200">
                        <p>Order not found. Please go back and try again.</p>
                        <button
                            onClick={handleBackToList}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Back to Orders
                        </button>
                    </div>
                );
            case "tracking":
                return selectedOrder ? (
                    <OrderTracking order={selectedOrder} onBack={handleBackToList} />
                ) : (
                    <div className="p-6 bg-white rounded-lg border border-gray-200">
                        <p>Order not found. Please go back and try again.</p>
                        <button
                            onClick={handleBackToList}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Back to Orders
                        </button>
                    </div>
                );
            case "list":
            default:
                return (
                    <div>
                        <div>
                            <div className="hidden md:flex justify-between border-b border-[#D9D9D9] p-6 flex-wrap ">
                                <OrderStatsCard
                                    icon={<Package size={20} />}
                                    title="Total orders"
                                    value="129"
                                />
                                <OrderStatsCard
                                    icon={<Truck size={20} />}
                                    title="Total Delivery"
                                    value="129"
                                />
                                <OrderStatsCard
                                    icon={<Package size={20} />}
                                    title="Processing"
                                    value="8"
                                />
                                <OrderStatsCard
                                    icon={<Package size={20} />}
                                    title="Returns"
                                    value="8"
                                />
                            </div>
                        </div>
                        <div className="mb-4 border-b px-6 py-4 border-gray-200">
                            <div className="flex overflow-x-auto">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        className={`px-4 py-2 whitespace-nowrap ${activeFilter === filter.id
                                                ? "border-b-2 border-primary text-primary font-medium"
                                                : "text-gray-500"
                                            }`}
                                        onClick={() => setActiveFilter(filter.id)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <OrderList
                            onViewDetails={handleViewDetails}
                            onTrackOrder={handleTrackOrder}
                            activeFilter={activeFilter}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Orders</h2>
            <div className="bg-white border border-[#D9D9D9]">
                {renderActiveView()}
            </div>
        </div>
    );
};

export default Orders;