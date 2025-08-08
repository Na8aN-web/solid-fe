import { useState } from "react";
import { useNavigate, useLocation, To } from "react-router-dom";
import { useSelector } from "react-redux";
import SidebarIcon1 from "../../../assets/1.png";
import SidebarIcon2 from "../../../assets/2.png";
import SidebarIcon3 from "../../../assets/3.png";
import SidebarIcon4 from "../../../assets/4.png";
import SidebarIcon5 from "../../../assets/5.png";
import SidebarIcon6 from "../../../assets/6.png";
import SidebarIcon7 from "../../../assets/7.png";
import SidebarIcon8 from "../../../assets/8.png";
import SidebarIcon9 from "../../../assets/9.png";
import SidebarIcon10 from "../../../assets/10.png";
import SidebarIcon11 from "../../../assets/11.png";
import SidebarIcon12 from "../../../assets/12.png";
import Logo from "../../../assets/logo.png";

// Define the shape of your Redux state
interface RootState {
  auth: {
    user: {
      role?: string;
    } | null;
  };
}

// Full admin sidebar items
const fullAdminSidebarItems = [
  { icon: SidebarIcon1, label: "Dashboard", path: "/admin/dashboard" },
  { icon: SidebarIcon2, label: "Products", path: "/admin/products" },
  { icon: SidebarIcon3, label: "Orders", path: "/admin/orders" },
  { icon: SidebarIcon4, label: "Users", path: "/admin/users" },
  {
    icon: SidebarIcon4,
    label: "KYC Verifications",
    path: "/admin/kyc-verification",
  },
  { icon: SidebarIcon5, label: "Inventory", path: "/admin/inventory" },
  { icon: SidebarIcon6, label: "Transactions", path: "/admin/transactions" },
  { icon: SidebarIcon7, label: "Manufacturers", path: "/admin/manufacturers" },
  { icon: SidebarIcon8, label: "Partners", path: "/admin/partners" },
  { icon: SidebarIcon9, label: "Reports & Analytics", path: "/admin/report" },
  {
    icon: SidebarIcon10,
    label: "Send Notifications",
    path: "/admin/send-notifications",
  },
  { icon: SidebarIcon11, label: "Inbox", path: "/admin/inbox" },
  { icon: SidebarIcon12, label: "Settings", path: "/admin/settings" },
];

// Subdistributor sidebar items (excluding Partners, Manufacturers, KYC)
const subdistributorSidebarItems = [
  { icon: SidebarIcon1, label: "Dashboard", path: "/admin/dashboard" },
  { icon: SidebarIcon2, label: "Products", path: "/admin/products" },
  { icon: SidebarIcon3, label: "Orders", path: "/admin/orders" },
  { icon: SidebarIcon5, label: "Inventory", path: "/admin/inventory" },
  { icon: SidebarIcon6, label: "Transactions", path: "/admin/transactions" },
  { icon: SidebarIcon9, label: "Reports & Analytics", path: "/admin/report" },
  {
    icon: SidebarIcon10,
    label: "Send Notifications",
    path: "/admin/send-notifications",
  },
  { icon: SidebarIcon11, label: "Inbox", path: "/admin/inbox" },
  { icon: SidebarIcon12, label: "Settings", path: "/admin/settings" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleNavigation = (path: To) => {
    navigate(path);
  };

    const handleSwitchToBuyer = () => {
    navigate("/home");
  };

  // Determine which sidebar items to show based on user role
  const isSubdistributor = user?.role === "SubDistributor" || user?.role === "sub-distributors";
  const sidebarItems = isSubdistributor ? subdistributorSidebarItems : fullAdminSidebarItems;

  return (
    <div className="fixed z-0 overflow-y-auto w-full h-screen bg border-r py-[40px] bg-white">
      <div className="px-[40px]">
        <img src={Logo} alt="Logo" className="w-[140px]" />
        {/* Show subdistributor badge if applicable */}
        {isSubdistributor && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
              Seller Panel
            </span>
          </div>
        )}
      </div>
      <nav className="mt-10 space-y-1">
        {sidebarItems.map((sidebaritem, index) => {
          const isActive = location.pathname === sidebaritem.path;

          return (
            <div
              key={index}
              onClick={() => handleNavigation(sidebaritem.path)}
              className={`flex items-center px-[44px] py-[20px] text-[14px] font-normal cursor-pointer hover:bg-gray-50 transition-all
                                ${isActive ? "bg-[#0033661A] text-[#003366] border-r-4 border-[#003366]" : "text-gray-700"}`}
            >
              <img
                src={sidebaritem.icon}
                alt={sidebaritem.label}
                className="w-5 h-5"
              />
              <span className="ml-3">
                {sidebaritem.label}
                {/* Add context for Users page if subdistributor */}
                {sidebaritem.label === "Users" && isSubdistributor && (
                  <span className="text-xs text-gray-500 block">Customers</span>
                )}
              </span>
            </div>
          );
        })}
      </nav>

      {isSubdistributor && (
        <div
          className="flex items-center px-[44px] py-[20px] text-[14px] font-normal cursor-pointer hover:bg-gray-50 transition-all text-gray-700"
          onClick={handleSwitchToBuyer}
        >
          <img src="/buyer.png" alt="buyer mode" />
        
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;