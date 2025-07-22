import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { ArrowUpDown, ListFilter, Search } from "lucide-react";

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All Users");
  const [showMessages, setShowMessages] = useState<string>("All Messages");

  const filterOptions = [
    "All Users",
    "Personal",
    "Wholesaler",
    "Importer",
    "Manufacturer",
  ];
  const messageOptions = ["All Messages", "Archived"];

  return (
    <AdminLayout pageTitle="Inbox">
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
      <section className="flex gap-12 mt-8 w-full">
        <section className="border min-h-[520px] p-5 rounded-[8px] w-2/5">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-base font-semibold text-customBrown">
              All Messages
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
        <section className="w-3/5">
          <div className="flex justify-center">
            <span className="text-center bg-[#E7EAEA] px-2 py-1 text-xs text-customBrown">
              12 May 2024
            </span>
          </div>
          <div className="pt-4">
            <div className="flex gap-2 pb-2">
              <div className="h-[40px] w-[40px] rounded-full bg-[#E7EAEA]"></div>
              <div className="max-w-[80%]">
                <p className="w-full bg-primary py-3 px-4 rounded-r-[30px] rounded-tl-[30px] text-xs text-customLight font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae pariatur similique iure laborum dolores nulla
                  distinctio quo, quam, quae, nesciunt molestiae vitae
                  praesentium! Impedit a laboriosam quam rerum, incidunt fuga.
                </p>
                <span className="text-[10px] text-shadeGray">6:30 PM</span>
              </div>
            </div>
            <div className="flex flex-row-reverse gap-2">
              <div className="h-[40px] w-[40px] rounded-full bg-[#E7EAEA]"></div>
              <div className="max-w-[80%]">
                <p className="bg-[#E7EAEA] py-3 px-4 rounded-l-[30px] rounded-tr-[30px] text-xs text-customGray1 font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <span className="flex justify-end text-[10px] text-shadeGray">
                  6:30 PM
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </AdminLayout>
  );
};

export default Inbox;
