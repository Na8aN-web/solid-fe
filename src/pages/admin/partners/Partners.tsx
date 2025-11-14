import React, { useMemo, useState } from "react";
import { Search, ChevronDown, ArrowUpDown, Filter, Plus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";
import Pagination from "../components/Pagination";

interface Partner {
  id: string;
  partnerId: string;
  companyName: string;
  companyType: "Manufacturer" | "Distributor" | "Retailer";
  contactPerson: string;
  email: string;
  phone: string;
  totalTransactions: number;
  totalRevenue: number;
  status: "Active" | "Inactive" | "Pending";
  partnershipDate: string;
  logo: string;
}

const Partners: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [amountFilter, setAmountFilter] = useState("All Ranges");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCompany, setSelectedCompany] = useState("All Types");
  const [selectedSort, setSelectedSort] = useState<string>("-totalRevenue");
  const itemsPerPage = 10;

  const allPartners: Partner[] = Array.from({ length: 48 }, (_, i) => {
    const companyTypes: Partner["companyType"][] = [
      "Manufacturer",
      "Distributor",
      "Retailer",
    ];
    const statuses: Partner["status"][] = ["Active", "Inactive", "Pending"];
    const companies = [
      "TyreMax Industries",
      "RubberTech Nigeria",
      "AutoParts Global",
      "Torque Manufacturing",
      "DriveLine Co.",
      "SteelGrip Ltd.",
      "MotionSpare Africa",
      "RoadMate Supplies",
    ];

    const companyName = `${companies[i % companies.length]} ${i + 1}`;
    const email = `${companyName
      .toLowerCase()
      .replace(/\s+/g, "")}@example.com`;
    const contactPerson = `Mr. ${["Tunde", "Chika", "Ayo", "Ngozi", "Emeka", "Bola"][i % 6]}`;
    const phone = `+234-80${Math.floor(10000000 + Math.random() * 89999999)}`;
    const totalTransactions = 50 + Math.floor(Math.random() * 950);
    const totalRevenue = 1_000_000 + Math.floor(Math.random() * 9_000_000);

    // Generate descending partnership dates
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - i * 3);
    const partnershipDate = randomDate.toLocaleDateString("en-NG", {
      timeZone: "Africa/Lagos",
    });

    return {
      id: `${i + 1}`,
      partnerId: `PRT${1000 + i}`,
      companyName,
      companyType: companyTypes[i % companyTypes.length],
      contactPerson,
      email,
      phone,
      totalTransactions,
      totalRevenue,
      status: statuses[i % statuses.length],
      partnershipDate,
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        companyName
      )}`,
    };
  });

  const filterOptions = [
    {
      label: "Company Type",
      options: ["All Types", "Manufacturer", "Distributor", "Retailer"],
      value: selectedCompany,
      onChange: setSelectedCompany,
    },
    {
      label: "Status",
      options: ["All Status", "Active", "Inactive", "Pending"],
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
    {
      label: "Revenue Range",
      options: ["₦0 – ₦1M", "₦1M – ₦5M", "₦5M – ₦10M", "₦10M+"],
      value: amountFilter,
      onChange: setAmountFilter,
    },
  ];

  const sortOptions = [
    { label: "Revenue High-Low", value: "-totalRevenue" },
    { label: "Revenue Low-High", value: "totalRevenue" },
    { label: "Transactions High-Low", value: "-totalTransactions" },
    { label: "Transactions Low-High", value: "totalTransactions" },
    { label: "Newest Partners", value: "-partnershipDate" },
    { label: "Oldest Partners", value: "partnershipDate" },
    { label: "Company (A-Z)", value: "companyName" },
    { label: "Company (Z-A)", value: "-companyName" },
    { label: "Status (A-Z)", value: "status" },
    { label: "Status (Z-A)", value: "-status" },
  ];

  // Filter manufacturers based on search and status
  const filteredPartners = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    // parse amountFilter into numeric range
    const [minRevenue, maxRevenue] = (() => {
      switch (amountFilter) {
        case "₦0 – ₦1M":
          return [0, 1_000_000];
        case "₦1M – ₦5M":
          return [1_000_000, 5_000_000];
        case "₦5M – ₦10M":
          return [5_000_000, 10_000_000];
        case "₦10M+":
          return [10_000_000, Infinity];
        default:
          // no filter
          return [0, Infinity];
      }
    })();

    return allPartners.filter((item) => {
      // Search term match (if provided)
      if (term) {
        const matchesTerm =
          item.companyName.toLowerCase().includes(term) ||
          item.partnerId.toLowerCase().includes(term) ||
          item.id.includes(term) ||
          item.contactPerson.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term) ||
          item.phone.includes(term);

        if (!matchesTerm) return false;
      }

      // Status filter
      if (selectedStatus && selectedStatus !== "All Status") {
        if (item.status !== selectedStatus) return false;
      }

      // Company Type filter
      if (selectedCompany && selectedCompany !== "All Types") {
        if (item.companyType !== selectedCompany) return false;
      }

      // Revenue range filter
      if (
        !(item.totalRevenue >= minRevenue && item.totalRevenue <= maxRevenue)
      ) {
        return false;
      }

      return true;
    });
  }, [allPartners, searchTerm, selectedStatus, selectedCompany, amountFilter]);

  // sort the filtered list according to selectedSort
  const sortedPartners = useMemo(() => {
    if (!selectedSort || filteredPartners.length === 0) return filteredPartners;

    const desc = selectedSort.startsWith("-");
    const key = desc ? selectedSort.slice(1) : selectedSort;

    // shallow copy
    const arr = [...filteredPartners];

    arr.sort((a: any, b: any) => {
      const va = a[key];
      const vb = b[key];

      // numeric comparison for known numeric fields
      if (typeof va === "number" && typeof vb === "number") {
        return desc ? vb - va : va - vb;
      }

      // date-like strings (partnershipDate) -> try Date
      if (key === "partnershipDate") {
        const da = new Date(a.partnershipDate);
        const db = new Date(b.partnershipDate);
        return desc ? db.getTime() - da.getTime() : da.getTime() - db.getTime();
      }

      // string compare fallback
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return desc ? 1 : -1;
      if (sa > sb) return desc ? -1 : 1;
      return 0;
    });

    return arr;
  }, [filteredPartners, selectedSort]);

  // Paginate filtered inventory
  const paginatedPartners = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPartners.slice(startIndex, endIndex);
  }, [sortedPartners, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedPartners.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-200 text-gray-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
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
      <div className="min-h-screen bg-gray-50">
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Partners</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for partners..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button className="flex gap-2 justify-center items-center px-4 py-2 bg-[#003366] rounded-[6px] text-white text-sm font-medium md:w-[230px] md:py-3">
                <Plus className="w-4 h-4" />
                Export Payment Receipts
              </button>
            </div>
          </div>
        </section>

        <div>
          {/* Filter Section */}
          <div className="mb-4 flex items-center justify-between">
            <FilterSection filters={filterOptions} showFilterButton={false} />
            <div>
              {/* quick sort select for testing/wiring */}
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
          {(selectedStatus !== "All Status" ||
            selectedCompany !== "All Types" ||
            amountFilter !== "All Ranges") && (
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
              {selectedCompany !== "All Types" && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Status: {selectedCompany}
                  <button
                    onClick={() => setSelectedCompany("All Types")}
                    className="hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {amountFilter !== "All Ranges" && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Status: {amountFilter}
                  <button
                    onClick={() => setAmountFilter("All Types")}
                    className="hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCompany("All Types");
                  setSelectedStatus("All Status");
                  setAmountFilter("All Ranges");
                }}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Clear all
              </button>
            </div>
          )}

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
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Comapany Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Comapny Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Total Revenue
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Total Transactions
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Contact Person
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Contact Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedPartners.length > 0 ? (
                  paginatedPartners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {partner.partnerId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {partner.companyName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {partner.companyType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                        {formatCurrency(partner.totalRevenue)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {partner.totalTransactions}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            partner.status
                          )}`}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {partner.contactPerson}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {partner.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {partner.partnershipDate}
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
            totalItems={filteredPartners.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            itemLabel="Partners"
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Partners;
