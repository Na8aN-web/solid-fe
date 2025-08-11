import React, { useState } from "react";
import Recents from "./components/Recents";
import { Outlet, useParams } from "react-router-dom";

const Account = () => {
  const { section } = useParams<{ section?: string }>();


  return (
    <div>
      <nav className="bg-[#F5F5F5] p-4 border-b hidden md:block">
        <div className="mx-auto flex items-center">
          <div className="flex space-x-6 ml-[50px]">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Home
            </a>
            <img src="/arrow-right.svg" alt="arrow facing right" />
            <a href="#" className="text-gray-900 font-semibold first-letter:uppercase">
              {section}
            </a>
          </div>
        </div>
      </nav>

      <Outlet />
      <div className="my-12 px-4 md:px-16 hidden md:block">
        <Recents />
      </div>
    </div>
  );
};

export default Account;
