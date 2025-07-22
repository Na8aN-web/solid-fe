import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import {
  ListFilter,
  ArrowUpDown,
  Search,
  Clock5,
  Calendar,
  CircleX,
} from "lucide-react";
import TipTap from "./components/Tiptap";

// Sent Messages
const SentMessages = () => {
  return (
    <div className="flex mt-6 gap-12">
      <section className="border min-h-[580px] p-5 rounded-[8px] w-2/5">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-base font-semibold text-customBrown">
            Sent Messages
          </h2>
          <div className="flex items-center gap-4">
            <ListFilter />
            <ArrowUpDown />
          </div>
        </div>
        <div className="relative my-6">
          <Search className="w-6 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-customBrown" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div>
          <div className="flex items-center space-x-6 py-5 px-3 border-b border-gray-200">
            <input
              type="checkbox"
              id="message-1"
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <div className="flex flex-col">
              <label
                htmlFor="message-1"
                className="font-[500] text-sm text-[#081312] cursor-pointer"
              >
                Solid Spare Parts
              </label>
              <p className="text-sm text-[#B6BEBD] font-[500]">
                I will deliver the package tomorrow by 8pm
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-3/5">
        <div className="flex justify-center">
          <span className="text-center bg-[#E7EAEA] px-2 py-1 text-xs text-customBrown">
            12 May 2024
          </span>
        </div>
        <div className="pt-4">
          <div className="bg-primary w-full p-3">
            <h2 className="text-customLight font-semibold text-base">
              Message Title here
            </h2>
          </div>
          <p className="pt-4 text-xs font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            recusandae velit quae maiores doloribus autem odio saepe, temporibus
            ipsum adipisci deleniti culpa perspiciatis natus. Consequatur
            deserunt optio facere similique voluptas.
          </p>
        </div>
      </section>
    </div>
  );
};

// Specific Users
const SpecificUsers = () => {
  return (
    <section className="border min-h-[580px] p-5 rounded-[8px] w-2/5">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-base font-semibold text-customBrown">
          Select user
        </h2>
        <p className="text-sm font-semibold text-primary">View All</p>
      </div>
      <div className="relative my-6">
        <Search className="w-6 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-customBrown" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <div>
        <div className="flex items-center space-x-6 py-5 px-3 border-b border-gray-200">
          <input
            type="checkbox"
            id="message-1"
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <div className="flex flex-col">
            <label
              htmlFor="message-1"
              className="font-[500] text-sm text-[#081312] cursor-pointer"
            >
              Marvelous Afolabi
            </label>
            <p className="text-sm text-[#B6BEBD] font-[500]">
              marvelous@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const SendNotifications = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All Users");
  const [showMessages, setShowMessages] = useState<string>("All Messages");
  const [open, setOpen] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);

  const filterOptions = [
    "All Users",
    "Personal",
    "Wholesaler",
    "Importer",
    "Manufacturer",
    "Specific User",
  ];

  const messageOptions = ["Sent Messages", "Drafts"];
  return (
    <AdminLayout pageTitle="">
      <section className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-900">Send Notifications</h1>
        <div>
          <button
            className="flex items-center gap-2 border border-primary p-3 min-w-[140px] rounded-[6px]"
            onClick={() => setOpen(true)}
          >
            <Clock5 className="w-4" /> <span>Schedule Send</span>
          </button>
          {open && (
            <div className="absolute right-4 p-8 pr-16 mt-2 bg-white border rounded shadow">
              <div className="flex justify-end pb-4">
                <CircleX onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-xl font-semibold text-customBrown">
                Schedule Send (GMT +01:00)
              </h3>
              <p className="font-sm font-normal text-customBrown">
                To send, keep PC on and connect to Wi-Fi
              </p>
              <div className="pt-6 mb-3 pb-3 border-b">
                <div className="flex items-center gap-2">
                  <Clock5 className="w-4" />
                  <p
                    className="text-sm font-semibold text-primary cursor-pointer"
                    onClick={() => {
                      setScheduledTime("Tomorrow, 8:00pm");
                      setOpenTimer(true);
                    }}
                  >
                    Tomorrow, 8:00pm
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4" />
                <p className="text-sm font-semibold text-primary">
                  Select date and time
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="flex justify-between">
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
          {messageOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setShowMessages(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-[6px] transition-colors ${
                showMessages === filter
                  ? "bg-[#003366] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {showMessages === "Sent Messages" ? (
        <SentMessages />
      ) : (
        <div className="flex mt-6 gap-12">
          <div
            className={activeFilter === "Specific User" ? "w-3/5" : "w-full"}
          >
            {/* Timer for Schedule send */}
            {openTimer && (
              <div className="flex justify-between p-4 bg-[#0033661A]">
                <p className="text-sm font-semibold text-primary">
                  Tomorrow, 8:00pm
                </p>
                <CircleX
                  onClick={() => {
                    setOpenTimer(false);
                  }}
                />
              </div>
            )}
            <TipTap />
          </div>
          {activeFilter === "Specific User" && <SpecificUsers />}
        </div>
      )}
    </AdminLayout>
  );
};

export default SendNotifications;
