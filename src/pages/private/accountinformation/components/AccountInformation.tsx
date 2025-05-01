import React, { useState } from "react";
import {
  UserCircle,
  BookOpen,
  Star,
  ShoppingBag,
  Heart,
  MapPin,
  MessageSquare,
  Shield,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import Profile from "./Profile";
import AddressBook from "./AddressBook";
import PendingRatings from "./PendingRatings";

// Define the type for sidebar items
type SidebarItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const AccountInformation = () => {
  // State for active sidebar item
  const [activeItem, setActiveItem] = useState<string>("profile");

  const sidebarItems: SidebarItem[] = [
    { id: "profile", icon: <UserCircle size={20} />, label: "Profile" },
    { id: "address", icon: <BookOpen size={20} />, label: "Address Book" },
    { id: "ratings", icon: <Star size={20} />, label: "Pending Ratings" },
    { id: "orders", icon: <ShoppingBag size={20} />, label: "Orders" },
    { id: "saved", icon: <Heart size={20} />, label: "Saved Items" },
    { id: "track", icon: <MapPin size={20} />, label: "Track Order" },
    { id: "messages", icon: <MessageSquare size={20} />, label: "Messages" },
    { id: "security", icon: <Shield size={20} />, label: "Security" },
    { id: "logout", icon: <LogOut size={20} />, label: "Log out" },
  ];

  // Handle sidebar item click
  const handleSidebarItemClick = (id: string) => {
    setActiveItem(id);
  };

  // Render the content based on active sidebar item
  const renderContent = () => {
    switch (activeItem) {
      case "profile":
        return <Profile />;
      case "address":
        return <AddressBook />;
      case "ratings":
        return <PendingRatings />;
      case "orders":
        return (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-gray-500 mt-2">Your orders will appear here.</p>
          </div>
        );
      case "saved":
        return (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Saved Items</h2>
            <p className="text-gray-500 mt-2">
              Your saved items will appear here.
            </p>
          </div>
        );
      case "track":
        return (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Track Order</h2>
            <p className="text-gray-500 mt-2">
              Your order tracking information will appear here.
            </p>
          </div>
        );
      case "messages":
        return (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Messages</h2>
            <p className="text-gray-500 mt-2">
              Your messages will appear here.
            </p>
          </div>
        );
      case "security":
        return (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="text-gray-500 mt-2">
              Your security settings will appear here.
            </p>
          </div>
        );
      case "logout":
        return (
          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold">Log Out</h2>
            <p className="text-gray-500 mt-2">You will be logged out.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#F5F5F5] mx-auto px-4 md:px-16 py-6">
      <div className="flex items-center mb-6">
        {/* Show back button only on mobile when content is shown */}
        <div className="md:hidden">
          {activeItem && (
            <button
              className="mr-2 p-1 rounded-full hover:bg-gray-200"
              onClick={() => setActiveItem("")} // Changed from null to 'profile'
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        <h1 className="text-2xl font-bold">Account Information</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - always shown on desktop, conditionally shown on mobile */}
        <div
          className={`w-full md:w-1/3 lg:w-1/4 ${activeItem ? "hidden md:block" : "block"}`}
        >
          <div className="bg-white rounded-lg">
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`flex items-center gap-3 w-full py-4 px-4 border-b border-gray-100 text-left hover:bg-[#E3E6EA] ${activeItem === item.id ? "bg-[#E3E6EA]" : ""}`}
                    onClick={() => handleSidebarItemClick(item.id)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* User Info at Bottom */}
            <div className="mt-6 flex items-center gap-3 p-4 border-t border-gray-100">
              <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold">
                M
              </div>
              <div>
                <div className="font-medium">Marvellous</div>
                <div className="text-xs text-[#827E7E]">Marvellous</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - always shown on desktop, conditionally shown on mobile */}
        <div
          className={`w-full md:w-2/3 lg:w-3/4 ${!activeItem && window.innerWidth < 768 ? "hidden" : "block"}`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
