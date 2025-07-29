import React, { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import AdminSidebar from "../components/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  showSearch?: boolean;
  showHeader?: boolean;
}

// Define the shape of your Redux state
interface RootState {
  auth: {
    user: {
      firstName?: string;
      lastName?: string;
      businessOwnerName?: string;
      businessName?: string;
      role?: string;
    } | null;
  };
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  pageTitle = "Admin Dashboard",
  showSearch = true,
  showHeader = true,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  // Get user display name based on role
  const getUserDisplayName = () => {
    if (!user) return "Admin User";

    if (user.role === "SubDistributor" || user.role === "sub-distributors") {
      // For subdistributors, prefer business owner name, fallback to first/last names
      return (
        user.businessOwnerName ||
        (user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName) ||
        "Subdistributor"
      );
    }

    // For regular admins
    return user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || "Admin User";
  };

  // Get business name for subdistributors
  const getBusinessName = () => {
    if (user?.role === "SubDistributor" || user?.role === "sub-distributors") {
      return user.businessName;
    }
    return null;
  };

  const displayName = getUserDisplayName();
  const businessName = getBusinessName();
  const isSubdistributor =
    user?.role === "SubDistributor" || user?.role === "sub-distributors";

  return (
    <div className="flex h-screen font-roboto">
      {/* Sidebar */}
      <div
        className={`${!sidebarCollapsed ? "w-[75px] md:w-64" : "w-64 md:w-[75px]"} shadow-sm transition-all duration-300`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 overflow-auto font-roboto bg-gray-50">
        {/* Header */}
        {showHeader && (
          <header className="shadow-sm border-b">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 sm:py-[37px]">
              {/* Left Section: Menu + Search */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-gray-100 rounded-lg self-start sm:self-auto"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {showSearch && (
                  <div className="relative w-full sm:w-80">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for products, orders etc..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Right Section: Bell + Avatar */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{displayName}</span>
                    {businessName && (
                      <span className="text-xs text-gray-500">
                        {businessName}
                      </span>
                    )}
                    {isSubdistributor && (
                      <span className="text-xs text-blue-600 font-medium">
                        Subdistributor
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="p-6">
          <div>
            {pageTitle && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {pageTitle}
                </h1>
                {isSubdistributor && businessName && (
                  <p className="text-sm text-gray-600 mt-1">
                    {businessName} - Seller Dashboard
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
