import React from "react";
import { Search, ChevronDown, ArrowUpDown } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

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
  const manufacturers: Manufacturer[] = [
    {
      id: "1",
      serialNumber: 1,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Approved",
      logo: "/api/placeholder/40/40",
    },
    {
      id: "2",
      serialNumber: 2,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Approved",
      logo: "/api/placeholder/40/40",
    },
    {
      id: "3",
      serialNumber: 3,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Rejected",
      logo: "/api/placeholder/40/40",
    },
    {
      id: "4",
      serialNumber: 4,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Pending",
      logo: "/api/placeholder/40/40",
    },
    {
      id: "5",
      serialNumber: 5,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Rejected",
      logo: "/api/placeholder/40/40",
    },
    {
      id: "6",
      serialNumber: 6,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Pending",
      logo: "/api/placeholder/40/40",
    },
    {
      id: "7",
      serialNumber: 7,
      company: "Solid Spare Parts",
      email: "solidspareparts@gmail.com",
      contact: "+2348097685599",
      status: "Approved",
      logo: "/api/placeholder/40/40",
    },
  ];

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

  return (
    <AdminLayout pageTitle="">
      <div className="p-6">
        <section className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900">Manufacturers</h1>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for inventory..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] w-[290px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-2">Status</h2>
              <div className="relative w-[150px] h-[40px]">
                <select className="w-full h-full bg-white px-3 pr-8 appearance-none rounded-[6px] text-sm border border-gray-300 text-gray-700">
                  <option value="">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-[6px] text-sm font-medium text-gray-700">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-[6px] text-sm font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
              </svg>
              Filter
            </button>
          </div>
        </section>

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
              {manufacturers.map((manufacturer) => (
                <tr key={manufacturer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-700">{manufacturer.serialNumber}</td>
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
                  <td className="p-4 text-sm text-gray-700">{manufacturer.email}</td>
                  <td className="p-4 text-sm text-gray-700">{manufacturer.contact}</td>
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

export default Manufacturers;