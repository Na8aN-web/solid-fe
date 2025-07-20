import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { ListFilter, ArrowUpDown, Search } from "lucide-react";

const SendNotifications = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All Users");
  const [showMessages, setShowMessages] = useState<string>("All Messages");

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
      <div className="flex mt-6 gap-12">
        <div className="w-3/5 h-[500px] border rounded"></div>
        <section className="border min-h-[520px] p-5 rounded-[8px] w-2/5">
          <div className="flex justify-between items-center border-b pb-2">
            <h2>All Messages</h2>
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
            <div className="flex items-start space-x-3 py-5 px-3 border-b border-gray-200">
              <input
                type="checkbox"
                id="message-1"
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <div className="flex flex-col">
                <label
                  htmlFor="message-1"
                  className="font-[500] text-xs text-[#081312] cursor-pointer"
                >
                  New Document Submission
                </label>
                <p className="text-xs text-[#B6BEBD] font-[500]">
                  A new document has been uploaded for your review. Please check
                  and approve.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <span>Save as draft</span>
        <button>Send</button>
      </div>
    </AdminLayout>
  );
};

export default SendNotifications;
