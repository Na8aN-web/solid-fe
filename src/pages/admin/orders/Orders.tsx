import React from "react";
import { Search, Plus, ChevronDown, ArrowUpDown, Bell } from "lucide-react";
import carTyre from "../../../assets/tyres.svg";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";

interface Order {
  id: string;
  productName: string;
  buyerName: string;
  orderId: string;
  orderDate: string;
  orderAmount: string;
  image: string;
  status: "Shipped" | "Pending" | "Cancelled" | "Delivered";
}

const Orders: React.FC = () => {
  const orders: Order[] = [
    {
      id: "1",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Shipped",
    },
    {
      id: "2",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Pending",
    },
    {
      id: "3",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Cancelled",
    },
    {
      id: "4",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Delivered",
    },
    {
      id: "5",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Cancelled",
    },
    {
      id: "6",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Delivered",
    },
    {
      id: "7",
      productName: "Michellene Tyre",
      buyerName: "Michellene Tyre",
      orderId: "2563823270",
      orderDate: "25th July, 2024",
      orderAmount: "₦250,000.00",
      image: carTyre,
      status: "Delivered",
    },
  ];

  const filterOptions = [
    { label: "Category", options: ["All Category", "Engine", "Brakes"] },
    { label: "Price", options: ["₦250K - ₦5M", "₦5M - ₦10M"] },
    { label: "Status", options: ["All Status", "Available", "Out of Stock"] },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "bg-[#E3F2FD] text-[#1976D2]";
      case "Pending":
        return "bg-[#FFF3E0] text-[#F57C00]";
      case "Cancelled":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      case "Delivered":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdate = (id: string) => {
    console.log("Updating order with ID:", id);
  };

  const handleNotify = (id: string) => {
    console.log("Notifying order with ID:", id);
  };

  return (
    <AdminLayout pageTitle="">
      <div className="">
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Orders</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for orders..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button className="flex gap-2 justify-center items-center px-4 py-2 md:min-w-[195px] min-h-[50px] bg-[#003366] rounded-[6px] text-white text-sm font-medium">
                <Plus className="w-4 h-4" />
                Update Order Status
              </button>
              <button className="flex gap-2 justify-center items-center px-4 py-2 md:min-w-[175px] min-h-[50px] text-[#003366] border border-[#003366] rounded-[6px] bg-white text-sm font-medium">
                <Bell className="w-4 h-4" />
                Notify Buyer
              </button>
            </div>
          </div>
        </section>

        <div>
          <FilterSection filters={filterOptions} />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
                <th className="p-4">
                  <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                </th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Buyer Name</th>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Order Date</th>
                <th className="p-4 font-medium">Order Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={order.image}
                          alt={order.productName}
                          className="w-6 h-6"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {order.productName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {order.buyerName}
                  </td>
                  <td className="p-4 text-sm text-gray-700">{order.orderId}</td>
                  <td className="p-4 text-sm text-gray-700">
                    {order.orderDate}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {order.orderAmount}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(order.id)}
                        className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleNotify(order.id)}
                        className="px-3 py-1 bg-white text-[#003366] border border-[#003366] text-xs font-medium rounded-[4px] hover:bg-gray-50"
                      >
                        Notify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#003366] text-white rounded text-sm font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            &gt;
          </button>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          1-12 of 18 Products
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
