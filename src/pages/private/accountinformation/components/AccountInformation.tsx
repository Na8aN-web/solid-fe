import React, { useState, useEffect } from "react";
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
import AddressBook from "./addressbook/AddressBook";
import PendingRatings from "./rating/PendingRatings";
import Orders from "./orders/Orders";
import SavedItems from "./saveditems/SavedItems";
import TrackOrder from "./orders/TrackOrder";
import Messages from "./messages/Messages";
import Security from "./security/Security";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setUser } from "../../../../store/slices/authSlice";

// Define the type for sidebar items
type SidebarItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const AccountInformation = () => {
  // State for active sidebar item
  // const [activeItem, setActiveItem] = useState<string>("profile");
  const { section } = useParams(); // Get section from URL
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // Set activeItem based on URL param, default to 'profile'
  const activeItem = section || "profile";

  const isWholesaler = !user?.firstName && !user?.lastName && user?.name;

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
    // setActiveItem(id);
    if (id === "logout") {
      // Handle logout logic here
      // For now, just stay on the same page
      return;
    }
    // Navigate to the new section
    navigate(`/account-information/${id}`);
  };

    const getInitials = () => {
    if (isWholesaler) {
      return user?.name ? user.name.charAt(0).toUpperCase() : "W";
    }
    
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (isWholesaler) {
      return user?.name || "Wholesaler";
    }
    return user?.firstName || "User";
  };

  // Get username/email for display
  const getUsername = () => {
    return user?.email || user?.emailAddress || "";
  };
  // Update activeItem when URL parameter changes
  // useEffect(() => {
  //   if (section && sidebarItems.find((item) => item.id === section)) {
  //     setActiveItem(section);
  //   }
  // }, [section]);

    // Redirect to profile if no section is specified
    useEffect(() => {
      if (!section) {
        navigate("/account-information", { replace: true });
      }
    }, [section, navigate]);

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
        return <Orders />;
      case "saved":
        return <SavedItems />;
      case "track":
        return <TrackOrder />;
      case "messages":
        return <Messages />;
      case "security":
        return <Security />;
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeItem]);

  return (
    <div className="bg-[#F5F5F5] mx-auto px-4 md:px-16 py-6">
      <div className="flex items-center mb-6">
        {/* Show back button only on mobile when content is shown */}
        <div className="md:hidden">
          {!activeItem && (
            <button
              className="mr-2 p-1 rounded-full hover:bg-gray-200"
              onClick={() => navigate("/account-information")}
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
          className={`w-full md:w-1/3 lg:w-1/4 ${!activeItem ? "hidden md:block" : "block"}`}
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
                {getInitials()}
              </div>
              <div>
                <div className="font-medium">{getDisplayName()}</div>
                <div className="text-xs text-[#827E7E]">{getUsername()}</div>
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
