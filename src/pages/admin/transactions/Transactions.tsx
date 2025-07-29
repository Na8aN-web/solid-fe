import React from "react";
import { Search, ChevronDown, ArrowUpDown, Upload } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";

interface Transaction {
  id: string;
  transactionId: string;
  userName: string;
  userType: "Individual" | "Importer" | "Wholesaler";
  orderId: string;
  paymentAmount: string;
  status: "Success" | "Failed" | "Pending";
  paymentMethod: "Bank Transfer" | "Mastercard" | "Visa";
  dateTime: string;
}

const Transactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Individual",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Success",
      paymentMethod: "Bank Transfer",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
    {
      id: "2",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Importer",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Success",
      paymentMethod: "Mastercard",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
    {
      id: "3",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Wholesaler",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Failed",
      paymentMethod: "Bank Transfer",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
    {
      id: "4",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Wholesaler",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Pending",
      paymentMethod: "Mastercard",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
    {
      id: "5",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Individual",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Failed",
      paymentMethod: "Visa",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
    {
      id: "6",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Individual",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Pending",
      paymentMethod: "Mastercard",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
    {
      id: "7",
      transactionId: "288725776GH",
      userName: "Marvellous Calebs",
      userType: "Importer",
      orderId: "435682",
      paymentAmount: "₦250,000.00",
      status: "Success",
      paymentMethod: "Visa",
      dateTime: "25th July, 2024\n@ 3:14 PM",
    },
  ];

  const filterOptions = [
    { label: "Category", options: ["All Category", "Engine", "Brakes"] },
    { label: "Store", options: ["Solid Spare Parts", "AutoHub"] },
    { label: "Price", options: ["₦250K - ₦5M", "₦5M - ₦10M"] },
    {
      label: "Status",
      options: ["All Status", "Success", "Failed", "Pending"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      case "Failed":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      case "Pending":
        return "bg-[#FFF3E0] text-[#F57C00]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout pageTitle="">
      <div>
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for transactions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button className="flex gap-2 justify-center items-center px-4 py-2 bg-[#003366] rounded-[6px] text-white text-sm font-medium">
                <Upload className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </section>
        {/* Filter section */}
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
                <th className="p-4 font-medium">Transaction ID</th>
                <th className="p-4 font-medium">User Name</th>
                <th className="p-4 font-medium">User Type</th>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Payment Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Payment Method</th>
                <th className="p-4 font-medium">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.transactionId}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {transaction.userName}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.userType}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.orderId}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {transaction.paymentAmount}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {transaction.paymentMethod}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    <div className="whitespace-pre-line">
                      {transaction.dateTime}
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

export default Transactions;
