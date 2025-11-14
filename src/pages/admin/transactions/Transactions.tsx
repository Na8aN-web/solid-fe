import React, { useMemo, useState } from "react";
import { Search, ChevronDown, ArrowUpDown, Upload } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";
import Pagination from "../components/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
 const [selectedUserType, setSelectedUserType] = useState("All Types");
 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("All Methods");
  const itemsPerPage = 10;

  const allTransactions: Transaction[] = Array.from({ length: 48 }, (_, i) => {
    const statuses: Transaction["status"][] = ["Success", "Failed", "Pending"];
    const paymentMethods: Transaction["paymentMethod"][] = [
      "Bank Transfer",
      "Mastercard",
      "Visa",
    ];
    const userTypes: Transaction["userType"][] = [
      "Individual",
      "Importer",
      "Wholesaler",
    ];

    // generate random date/time for realism
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - i);
    const dateTime = randomDate.toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    });

    return {
      id: `${i + 1}`,
      transactionId: `TXN${1000 + i}`,
      userName: `User ${i + 1}`,
      userType: userTypes[i % userTypes.length],
      orderId: `ORD${5000 + i}`,
      paymentAmount: `₦${(50000 + i * 1200).toLocaleString()}`,
      status: statuses[i % statuses.length],
      paymentMethod: paymentMethods[i % paymentMethods.length],
      dateTime,
    };
  });

  const filterOptions = [
    {
      label: "Status",
      options: ["All Status", "Success", "Failed", "Pending"],
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
    {
      label: "User Type",
      options: ["All Types", "Individual", "Importer", "Wholesaler"],
      value: selectedUserType,
      onChange: setSelectedUserType,
    },
    {
      label: "Payment Method",
      options: ["All Methods", "Bank Transfer", "Mastercard", "Visa"],
      value: selectedPaymentMethod,
      onChange: setSelectedPaymentMethod,
    },
  ];

  // Filter transactions based on search and status
  const filteredTransaction = useMemo(() => {
    return allTransactions.filter((item) => {
      const matchesSearch =
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm);

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus;

      const matchesUserType =
        selectedUserType === "All Types" || item.userType === selectedUserType;

      const matchesPaymentMethod =
        selectedPaymentMethod === "All Methods" ||
        item.paymentMethod === selectedPaymentMethod; 

      return matchesSearch && matchesStatus && matchesUserType && matchesPaymentMethod;
    });
  }, [allTransactions, searchTerm, selectedStatus]);

  // Paginate filtered transaction
  const paginatedTransaction = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransaction.slice(startIndex, endIndex);
  }, [filteredTransaction, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTransaction.length / itemsPerPage);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
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
                  value={searchTerm}
                  onChange={handleSearch}
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
        <div className="mb-4">
          <FilterSection
            filters={filterOptions}
            // sortOptions={sortOptions}
            showFilterButton={false}
          />
        </div>

        {/* Active Filters */}
        {selectedStatus !== "All Status" && (
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Status: {selectedStatus}
              <button
                onClick={() => setSelectedStatus("All Status")}
                className="hover:text-blue-900 text-lg leading-none"
              >
                ×
              </button>
            </span>
          </div>
        )}

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
              {paginatedTransaction.length > 0 ? (
                paginatedTransaction.map((transaction) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    <p className="text-lg font-medium mb-1">
                      No inventory found
                    </p>
                    <p className="text-sm text-gray-400">
                      {searchTerm || selectedStatus !== "All Status"
                        ? "Try adjusting your filters"
                        : "No inventory items available"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransaction.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          itemLabel="Items"
        />
      </div>
    </AdminLayout>
  );
};

export default Transactions;
