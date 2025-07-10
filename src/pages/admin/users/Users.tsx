import React, { useState } from "react";
import { Search, Plus, ChevronDown, ArrowUpDown, Bell } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  accountType: "Personal" | "Wholesaler" | "Importer" | "Manufacturer";
  status: "Active" | "Inactive";
  dateJoined: string;
}

const Users: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All Users");

  const users: User[] = [
    {
      id: "1",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Personal",
      status: "Active",
      dateJoined: "25th July, 2024",
    },
    {
      id: "2",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Wholesaler",
      status: "Active",
      dateJoined: "25th July, 2024",
    },
    {
      id: "3",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Manufacturer",
      status: "Inactive",
      dateJoined: "25th July, 2024",
    },
    {
      id: "4",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Importer",
      status: "Active",
      dateJoined: "25th July, 2024",
    },
    {
      id: "5",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Personal",
      status: "Inactive",
      dateJoined: "25th July, 2024",
    },
    {
      id: "6",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Personal",
      status: "Active",
      dateJoined: "25th July, 2024",
    },
    {
      id: "7",
      userId: "1102345",
      name: "Marvellous Calebs",
      email: "marvellouscalebs@gmail.com",
      accountType: "Importer",
      status: "Active",
      dateJoined: "25th July, 2024",
    },
  ];

  const filterOptions = ["All Users", "Personal", "Wholesaler", "Importer", "Manufacturer"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      case "Inactive":
        return "bg-[#F5F5F5] text-[#9E9E9E]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButtons = (user: User) => {
    if (user.status === "Active") {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]">
            View
          </button>
          <button className="px-3 py-1 bg-[#F248221A] text-[#F24822] text-xs font-medium rounded-[4px] hover:bg-[#C82333]">
            Suspend
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]">
            View
          </button>
          <button className="px-3 py-1 bg-[#00336626] text-primary text-xs font-medium rounded-[4px] hover:bg-[#218838]">
            Activate
          </button>
        </div>
      );
    }
  };

  const filteredUsers = activeFilter === "All Users" 
    ? users 
    : users.filter(user => user.accountType === activeFilter);

  const handleView = (id: string) => {
    console.log("Viewing user with ID:", id);
  };

  const handleSuspend = (id: string) => {
    console.log("Suspending user with ID:", id);
  };

  const handleActivate = (id: string) => {
    console.log("Activating user with ID:", id);
  };

  return (
    <AdminLayout pageTitle="">
      <div className="p-6">
        <section className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-900">Users</h1>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] w-[290px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex gap-2 justify-center items-center px-4 py-2 bg-[#003366] rounded-[6px] text-white text-sm font-medium">
              <Plus className="w-4 h-4" />
              Send Notification
            </button>
          </div>
        </section>

        <section className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="px-4 py-2 bg-white border border-gray-300 rounded-[6px] text-sm text-gray-700 pr-8 appearance-none min-w-[120px]">
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
        </section>

        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
                <th className="p-4">
                  <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                </th>
                <th className="p-4 font-medium">User ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Account Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Date Joined</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{user.userId}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="p-4 text-sm text-gray-700">{user.email}</td>
                  <td className="p-4 text-sm text-gray-700">{user.accountType}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{user.dateJoined}</td>
                  <td className="p-4">{getActionButtons(user)}</td>
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

export default Users;