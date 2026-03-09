import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";
import Pagination from "../components/Pagination";

interface Manufacturer {
  id: string;
  serialNumber: number;
  company: string;
  email: string;
  contact: string;
  status: "Approved" | "Rejected" | "Pending";
  logo: string;
}

const Manufacturers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const itemsPerPage = 10;
  const [selectedSort, setSelectedSort] = useState<string>("-serialNumber");

  const allManufacturers: Manufacturer[] = Array.from(
    { length: 48 },
    (_, i) => {
      const statuses: Manufacturer["status"][] = [
        "Approved",
        "Rejected",
        "Pending",
      ];
      const companies = [
        "TyreMax Industries",
        "RubberTech Nigeria",
        "AutoParts Global",
        "Torque Manufacturing",
        "DriveLine Co.",
        "SteelGrip Ltd.",
      ];

      const company = companies[i % companies.length];
      const email = `${company.toLowerCase().replace(/\s+/g, "")}@example.com`;
      const contact = `+234-80${Math.floor(10000000 + Math.random() * 89999999)}`;

      return {
        id: `${i + 1}`,
        serialNumber: 1000 + i,
        company,
        email,
        contact,
        status: statuses[i % statuses.length],
        logo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
          company
        )}`,
      };
    }
  );

  const filterOptions = [
    {
      label: "Status",
      options: ["All Status", "Approved", "Rejected", "Pending"],
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
  ];

  const sortOptions = [
    { label: "Amount High-Low", value: "-paymentAmount" },
    { label: "Amount Low-High", value: "paymentAmount" },
    { label: "Newest First", value: "-dateTime" },
    { label: "Oldest First", value: "dateTime" },
    { label: "Status (A-Z)", value: "status" },
    { label: "Status (Z-A)", value: "-status" },
  ];

  // Filter manufacturers based on search and status
  const filteredManufacturer = useMemo(() => {
    return allManufacturers.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm);

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [allManufacturers, searchTerm, selectedStatus]);

  const sortedManufacturers = useMemo(() => {
    if (!selectedSort) return filteredManufacturer;
    const desc = selectedSort.startsWith("-");
    const key = desc ? selectedSort.slice(1) : selectedSort;
    const arr = [...filteredManufacturer];

    arr.sort((a: any, b: any) => {
      const va = a[key];
      const vb = b[key];

      if (typeof va === "number" && typeof vb === "number") {
        return desc ? vb - va : va - vb;
      }
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return desc ? 1 : -1;
      if (sa > sb) return desc ? -1 : 1;
      return 0;
    });

    return arr;
  }, [filteredManufacturer, selectedSort]);

  const paginatedManufacturer = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedManufacturers.slice(startIndex, endIndex);
  }, [sortedManufacturers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedManufacturers.length / itemsPerPage);

  // Paginate filtered inventory
  // const paginatedManufacturer = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return filteredManufacturer.slice(startIndex, endIndex);
  // }, [filteredManufacturer, currentPage, itemsPerPage]);

  // const totalPages = Math.ceil(filteredManufacturer.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      case "Rejected":
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
          {/* Left: Title + Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
            <h1 className="text-xl font-bold text-gray-900">Manufacturers</h1>
            <div className="relative w-full sm:w-[290px]">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for manufacturers..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"> 
          <FilterSection
            filters={filterOptions}
            showFilterButton={false}
          />
          <div>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="min-w-[140px] h-[44px] bg-gray-100 px-3 pr-8 appearance-none rounded-[6px] text-sm font-semibold text-primary cursor-pointer"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
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
                <th className="p-4 font-medium">S/N</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedManufacturer.length > 0 ? (
                paginatedManufacturer.map((manufacturer) => (
                  <tr
                    key={manufacturer.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-sm text-gray-700">
                      {manufacturer.serialNumber}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {manufacturer.company}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {manufacturer.email}
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {manufacturer.contact}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(manufacturer.status)}`}
                      >
                        {manufacturer.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-sm text-gray-700 hover:text-gray-900">
                        View
                      </button>
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
          totalItems={sortedManufacturers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          itemLabel="Manufacturers"
        />
      </div>
    </AdminLayout>
  );
};

export default Manufacturers;
