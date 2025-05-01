import React from "react";
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
} from "lucide-react";

type SidebarItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

type LayoutProps = {
  activeItem: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
};

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

const LayoutWithSidebar: React.FC<LayoutProps> = ({ activeItem, onSelect, children }) => {
  return (
    <div className="bg-[#F5F5F5] mx-auto px-4 md:px-16 py-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Account Information</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg">
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`flex items-center gap-3 w-full py-4 px-4 border-b border-gray-100 text-left hover:bg-[#E3E6EA] ${
                      activeItem === item.id ? "bg-[#E3E6EA]" : ""
                    }`}
                    onClick={() => onSelect(item.id)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
