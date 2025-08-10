import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { title } from "process";

interface Step {
  id: number;
  title: string;
}

interface StepsDataType {
  [key: string]: Step[];
}

const KycForm = () => {
  // current steps
  const stepsData: StepsDataType = {
    kycform: [
      {
        id: 1,
        title: "Account Information",
      },
      {
        id: 2,
        title: "Business Information",
      },
      {
        id: 3,
        title: "Upload Document",
      },
    ],
  };

  // Get steps for current active tab
  const currentSteps = stepsData.kycform;
  return (
    <div className="flex justify-center items-center py-12 px-6">
      <div className="border w-full md:w-[660px] px-4 md:px-10 py-8 rounded-[16px]">
        <ArrowLeft />

        <div className="relative w-full">
          {/* Horizontal connecting lines */}
          {/* Green segment */}
          <div
            className="absolute top-4 h-0.5 bg-[#15B70D] z-0"
            style={{
              left: "calc(12.5%)",
              width: "calc(37.5%)", // from center of step 1 to center of step 2
            }}
          ></div>
          {/* Gray segment */}
          <div
            className="absolute top-4 h-0.5 bg-gray-300 z-0"
            style={{
              left: "calc(50%)",
              width: "calc(37.5%)", // from center of step 2 to center of step 3
            }}
          ></div>

          {/* Steps */}
          <div className="flex justify-between relative z-10 w-full my-8 md:my-12">
            {currentSteps.map((step, index) => {
              let bgColor;
              if (index === 0)
                bgColor = "#15B70D"; // Step 1 green
              else if (index === 1 || index === 2)
                bgColor = "#003366"; // Step 2 & 3 blue
              else bgColor = "#d1d5db"; // others gray if more than 3 steps

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-2 w-[25%]"
                >
                  {/* Numbered Circle */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: bgColor }}
                  >
                   {index === 0 ? "✓" : index + 1}
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-800 text-center md:w-[20ch]">
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        <h1 className="text-base font-medium text-customBrown pb-4">
          Enter your details as they appear on your identification document
        </h1>
        <form action="" className="space-y-4">
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Full Legal Business Name
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Name of Business"
            />
          </div>
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Business Registration Name
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter business registration name"
            />
          </div>
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Type of Business
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Limited Company, Sole Proprietorship"
            />
          </div>
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Date of Incorporation/Registration
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g 12/05/2024"
            />
          </div>
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Tax Identification Number
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tax identification number"
            />
          </div>
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Business Address
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label
              htmlFor="businessWebsite"
              className="block text-sm text-customBrown"
            >
              Business Website (optional)
            </label>
            <input
              type="text"
              id="businessWebsite"
              name="businessWebsite"
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          {/* Terms and conditions - common to all forms */}
          <div>
            <div className="flex items-center pb-4">
              <input
                type="checkbox"
                id="termsCheckbox"
                name="termsAccepted"
                className="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="termsCheckbox"
                className="ml-2 block text-sm text-gray-900"
              >
                Yes, I understand and agree with Solid Spare Parts'
                <a href="#" className="text-primary hover:underline ml-1">
                  Terms of Service
                </a>
                , including the Privacy Policy
              </label>
            </div>
          </div>

          <Link to="/business-information">
            <button className="w-full py-3 rounded-lg text-white font-bold transition-all duration-300 bg-primary hover:bg-blue-700 active:bg-blue-800">
              Continue
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default KycForm;
