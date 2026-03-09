import React, { useMemo, useState } from "react";
import { Search, Bell } from "lucide-react";
import carTyre from "../../../assets/tyres.svg";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";
import Pagination from "../components/Pagination";

interface InventoryItem {
  id: string;
  productName: string;
  sales: string;
  revenue: string;
  price: string;
  stock: string;
  image: string;
  status: "In stock" | "Out of stock" | "Low stock";
}

const Inventory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const itemsPerPage = 10;

  const allInventory: InventoryItem[] = Array.from({ length: 48 }, (_, i) => {
    const statuses: InventoryItem["status"][] = [
      "In stock",
      "Out of stock",
      "Low stock",
    ];

    return {
      id: `${i + 1}`,
      productName: `Product ${i + 1}`,
      sales: `${127 + i} pcs`,
      revenue: `₦${(42000 + i * 1000).toLocaleString()}`,
      price: `₦${(250000 + i * 1000).toLocaleString()}`,
      stock: `${Math.max(0, 650 - i * 10)}/560`,
      image: carTyre,
      status: statuses[i % 3],
    };
  });

  const filterOptions = [
    {
      label: "Status",
      options: ["All Status", "In stock", "Out of stock", "Low stock"],
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
  ];

  const sortOptions = [
    { label: "Stock High-Low", value: "-stock" },
    { label: "Stock Low-High", value: "stock" },
    { label: "Revenue High-Low", value: "-revenue" },
    { label: "Revenue Low-High", value: "revenue" },
  ];

  // Filter inventory based on search and status
  const filteredInventory = useMemo(() => {
    return allInventory.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm);

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [allInventory, searchTerm, selectedStatus]);

  // Paginate filtered inventory
  const paginatedInventory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredInventory.slice(startIndex, endIndex);
  }, [filteredInventory, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In stock":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      case "Out of stock":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      case "Low stock":
        return "bg-[#FFF3E0] text-[#F57C00]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButtons = (item: InventoryItem) => {
    if (item.status === "Out of stock" || item.status === "Low stock") {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRestock(item.id)}
            className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]"
          >
            Restock
          </button>
          <button
            onClick={() => handleNotify(item.id)}
            className="px-3 py-1 bg-[#00336626] text-primary text-xs font-medium rounded-[4px] hover:bg-gray-50"
          >
            Notify
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRestock(item.id)}
            className="px-3 py-1 bg-[#6C757D] text-white text-xs font-medium rounded-[4px] hover:bg-[#5A6268]"
          >
            Restock
          </button>
          <button
            onClick={() => handleNotify(item.id)}
            className="px-3 py-1 bg-[#00336626] text-primary text-xs font-medium rounded-[4px] hover:bg-gray-50"
          >
            Notify
          </button>
        </div>
      );
    }
  };

  const handleRestock = (id: string) => {
    // console.log("Restocking item with ID:", id);
  };

  const handleNotify = (id: string) => {
    // console.log("Notifying about item with ID:", id);
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
      <div className="">
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for inventory..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button className="flex gap-2 justify-center items-center px-4 py-3 w-full min-w-[140px] bg-[#003366] rounded-[6px] text-white text-sm font-medium">
                <Bell className="w-4 h-4" />
                Notify Store
              </button>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <div className="mb-4">
          <FilterSection
            filters={filterOptions}
            sortOptions={sortOptions}
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
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Sales</th>
                <th className="p-4 font-medium">Revenue</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInventory.length > 0 ? (
                paginatedInventory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-6 h-6"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">{item.sales}</td>
                    <td className="p-4 text-sm text-gray-700">
                      {item.revenue}
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-900">
                      {item.price}
                    </td>
                    <td className="p-4 text-sm text-gray-700">{item.stock}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">{getActionButtons(item)}</td>
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

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredInventory.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          itemLabel="Items"
        />
      </div>
    </AdminLayout>
  );
};

export default Inventory;
