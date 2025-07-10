import React, { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

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
    showHeader = true 
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-roboto">
            {/* Sidebar */}
            <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm transition-all duration-300`}>
                <AdminSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto font-roboto">
                {/* Header */}
                {showHeader && (
                    <header className="bg-white shadow-sm border-b">
                        <div className="flex items-center justify-between px-6 py-[37px]">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                {showSearch && (
                                    <div className="relative">
                                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search for products, orders etc..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <Bell className="w-5 h-5" />
                                </button>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm font-medium">Marvellous Calebs</span>
                                </div>
                            </div>
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <main className="p-6">
                    {pageTitle && (
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">{pageTitle}</h1>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;