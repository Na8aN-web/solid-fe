import React, { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  showSearch?: boolean;
  showHeader?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  pageTitle = "Admin Dashboard",
  showSearch = true,
  showHeader = true,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen font-roboto">
      {/* Sidebar */}
      <div
        className={`${!sidebarCollapsed ? "w-[75px] md:w-64" : "w-64 md:w-[75px]"} shadow-sm transition-all duration-300`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="relatve z-20 flex-1 overflow-auto font-roboto bg-gray-50">
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
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    Marvellous Calebs
                  </span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="p-6">
          <div>
            {pageTitle && (
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {pageTitle}
              </h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
