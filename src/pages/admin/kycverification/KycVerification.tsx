import React, { useState } from "react";
import { Search, Plus, ChevronDown, ArrowUpDown, Bell } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import boxBroken from "../../../assets/box-broken.svg";
import Review from "./Review";

interface User {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  submissionDate: string;
  status: "All" | "Approved" | "Rejected" | "Pending" | "Resubmit";
}

interface KycCardProps {
  title: string;
  count: number;
}

const KycCard: React.FC<KycCardProps> = ({ title, count }) => (
  <div className="bg-white flex gap-2 items-center justify-start p-4 rounded-lg shadow-sm border w-full">
    <div>
      <img src={boxBroken} alt="kyc" />
    </div>
    <div className="flex flex-col justify-between text-start">
      <p className="text-sm text-customGray3">{title}</p>
      <span>{count}</span>
    </div>
  </div>
);

const KycVerification: React.FC<KycCardProps> = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showReview, setShowReview] = useState<boolean>(false);

  const users: User[] = [
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Approved",
    },
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Approved",
    },
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Rejected",
    },
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Pending",
    },
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Rejected",
    },
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Pending",
    },
    {
      id: "1",
      businessName: "LuxeMart Ltd",
      ownerName: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      submissionDate: "25th July, 2024",
      status: "Resubmit",
    },
  ];

  const filterOptions = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
    "Needs Resubmission",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#E1F1E0] text-[#15B70D]";
      case "Rejected":
        return "bg-[#F248221A] text-[#F24822]";
      case "Pending":
        return "bg-[#FFC30026] text-[#FFC300]";
      case "Resubmit":
        return "bg-[#FFF1F1] text-[#827E7E]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers =
    activeFilter === "All"
      ? users
      : users.filter((user) => user.status === activeFilter);

  const openReview = () => setShowReview(true);
  const closeReview = () => setShowReview(false);

  return (
    <AdminLayout pageTitle="">
      <div className="relative">
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">
                Kyc Verification
              </h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for KYC Verifications..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button className="flex gap-2 justify-center min-w-[170px] items-center px-4 py-3 bg-[#003366] rounded-[6px] text-white text-sm font-medium">
                <Plus className="w-4 h-4" />
                Send Notification
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col lg:flex-row justify-between w-full gap-5 border-t border-l border-r p-6 mb-10">
          <KycCard title="Total Submitted" count={350} />
          <KycCard title="Pending" count={47} />
          <KycCard title="Approved" count={270} />
          <KycCard title="Rejected" count={25} />
          <KycCard title="Flagged" count={8} />
        </section>

        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Scrollable Filters */}
            <div className="overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
              <div className="flex gap-4 shrink-0 w-max">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-sm font-medium rounded-[6px] transition-colors ${
                      activeFilter === filter
                        ? "bg-[#003366] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Select + Sort Buttons */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="relative">
                <select className="px-4 py-2 bg-white border border-gray-300 rounded-[6px] text-sm text-gray-700 pr-8 appearance-none min-w-[120px]">
                  <option value="">All</option>
                  <option value="Active">Pending</option>
                  <option value="Inactive">Approved</option>
                  <option value="Inactive">Rejected</option>
                  <option value="Inactive">Needs Resubmission</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-[6px] text-sm font-medium text-gray-700">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
            </div>
          </div>
        </section>

        <div className="relative overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
                <th className="p-4">
                  <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                </th>
                <th className="p-4 font-medium">Business Name</th>
                <th className="p-4 font-medium">Owner Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Submission Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {user.businessName}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {user.ownerName}
                  </td>
                  <td className="p-4 text-sm text-gray-700">{user.email}</td>
                  <td className="p-4 text-sm text-gray-700">
                    {user.submissionDate}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-2 rounded-sm text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]"
                      onClick={openReview}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showReview && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-[2px] flex items-center justify-center z-50">
              <button
                onClick={closeReview}
                className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
              >
                ✕
              </button>
              <Review />
            </div>
          )}
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

export default KycVerification;
