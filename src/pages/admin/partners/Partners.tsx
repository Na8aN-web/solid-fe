import React, { useState } from "react";
import { Search, ChevronDown, ArrowUpDown, Filter, Plus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

interface Transaction {
    id: string;
    transactionId: string;
    userName: string;
    userType: "Individual" | "Importer" | "Wholesaler";
    orderId: string;
    paymentAmount: number;
    status: "Success" | "Failed" | "Pending";
    paymentMethod: "Bank Transfer" | "Mastercard" | "Visa";
    paymentGateway: string;
    dateTime: string;
}

const Partners: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userTypeFilter, setUserTypeFilter] = useState("");
    const [paymentGatewayFilter, setPaymentGatewayFilter] = useState("");
    const [amountFilter, setAmountFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const transactions: Transaction[] = [
        {
            id: "1",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Individual",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Success",
            paymentMethod: "Bank Transfer",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        },
        {
            id: "2",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Importer",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Success",
            paymentMethod: "Mastercard",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        },
        {
            id: "3",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Wholesaler",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Failed",
            paymentMethod: "Bank Transfer",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        },
        {
            id: "4",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Wholesaler",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Pending",
            paymentMethod: "Mastercard",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        },
        {
            id: "5",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Individual",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Failed",
            paymentMethod: "Visa",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        },
        {
            id: "6",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Individual",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Pending",
            paymentMethod: "Mastercard",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        },
        {
            id: "7",
            transactionId: "288725776GH",
            userName: "Marvellous Calebs",
            userType: "Importer",
            orderId: "435682",
            paymentAmount: 250000.00,
            status: "Success",
            paymentMethod: "Visa",
            paymentGateway: "Safe Haven",
            dateTime: "25th July, 2024 @ 3:14 PM"
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Success":
                return "bg-green-100 text-green-800";
            case "Failed":
                return "bg-red-100 text-red-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatCurrency = (amount: number) => {
        return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;
    };

    return (
        <AdminLayout pageTitle="">
            <div className="min-h-screen bg-gray-50">
                <section className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold text-gray-900">Orders</h1>
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for orders..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] w-[290px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex gap-2 justify-center items-center px-4 py-2 bg-[#003366] rounded-[6px] text-white text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            Update Order Status
                        </button>
                      
                    </div>
                </section>

                <div className="p-6">


                    {/* Filters */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {/* User Type Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
                                <div className="relative">
                                    <select
                                        value={userTypeFilter}
                                        onChange={(e) => setUserTypeFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                                    >
                                        <option value="">All Users</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Importer">Importer</option>
                                        <option value="Wholesaler">Wholesaler</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Payment Gateway Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Gateway</label>
                                <div className="relative">
                                    <select
                                        value={paymentGatewayFilter}
                                        onChange={(e) => setPaymentGatewayFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                                    >
                                        <option value="">Solid Spare Parts</option>
                                        <option value="Safe Haven">Safe Haven</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Amount Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <div className="relative">
                                    <select
                                        value={amountFilter}
                                        onChange={(e) => setAmountFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                                    >
                                        <option value="">₦250K - ₦5M</option>
                                        <option value="250000-5000000">₦250K - ₦5M</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <div className="relative">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                                    >
                                        <option value="">All Status</option>
                                        <option value="Success">Success</option>
                                        <option value="Failed">Failed</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <ArrowUpDown className="w-4 h-4" />
                                Sort
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Secondary Filters */}
                    <div className="flex items-center gap-4 mb-6">
                        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                            Payment Gateway(s)
                        </button>
                        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                            Delivery Partner(s)
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User Type</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Method</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Gateway</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{transaction.transactionId}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{transaction.userName}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{transaction.userType}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{transaction.orderId}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                                            {formatCurrency(transaction.paymentAmount)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{transaction.paymentMethod}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{transaction.paymentGateway}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{transaction.dateTime}</td>
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
                        <button className="w-8 h-8 flex items-center justify-center bg-blue-900 text-white rounded text-sm font-medium">
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
            </div>
        </AdminLayout>
    );
};

export default Partners;