import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";

interface Step {
  id: number;
  title: string;
}

interface StepsDataType {
  [key: string]: Step[];
}

interface FormData {
  businessName: string;
  registrationNumber: string;
  typeOfBusiness: string;
  dateOfIncorporation: string;
  taxId: string;
  businessAddress: string;
  website: string;
  termsAccepted: boolean;
}

const KycForm = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    registrationNumber: "",
    typeOfBusiness: "",
    dateOfIncorporation: "",
    taxId: "",
    businessAddress: "",
    website: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }
    if (!formData.typeOfBusiness.trim()) {
      newErrors.typeOfBusiness = "Type of business is required";
    }
    if (!formData.dateOfIncorporation.trim()) {
      newErrors.dateOfIncorporation = "Date of incorporation is required";
    }
    if (!formData.taxId.trim()) {
      newErrors.taxId = "Tax identification number is required";
    }
    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Store form data in sessionStorage or pass to next step
      sessionStorage.setItem('kycFormData', JSON.stringify(formData));
      navigate("/business-information");
    }
  };

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
        <Link to="/account-information/profile">
          <ArrowLeft />
        </Link>

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm text-customBrown"
            >
              Full Legal Business Name*
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className={`mt-1 text-[16px] block w-full border rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.businessName ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Name of Business"
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="registrationNumber"
              className="block text-sm text-customBrown"
            >
              Business Registration Number*
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              className={`mt-1 text-[16px] block w-full border rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.registrationNumber ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter business registration number"
            />
            {errors.registrationNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="typeOfBusiness"
              className="block text-sm text-customBrown"
            >
              Type of Business*
            </label>
            <input
              type="text"
              id="typeOfBusiness"
              name="typeOfBusiness"
              value={formData.typeOfBusiness}
              onChange={handleInputChange}
              className={`mt-1 text-[16px] block w-full border rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.typeOfBusiness ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="e.g., Limited Company, Sole Proprietorship"
            />
            {errors.typeOfBusiness && (
              <p className="text-red-500 text-sm mt-1">{errors.typeOfBusiness}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dateOfIncorporation"
              className="block text-sm text-customBrown"
            >
              Date of Incorporation/Registration*
            </label>
            <input
              type="date"
              id="dateOfIncorporation"
              name="dateOfIncorporation"
              value={formData.dateOfIncorporation}
              onChange={handleInputChange}
              className={`mt-1 text-[16px] block w-full border rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.dateOfIncorporation ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.dateOfIncorporation && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfIncorporation}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="taxId"
              className="block text-sm text-customBrown"
            >
              Tax Identification Number*
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleInputChange}
              className={`mt-1 text-[16px] block w-full border rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.taxId ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter tax identification number"
            />
            {errors.taxId && (
              <p className="text-red-500 text-sm mt-1">{errors.taxId}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="businessAddress"
              className="block text-sm text-customBrown"
            >
              Business Address*
            </label>
            <input
              type="text"
              id="businessAddress"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleInputChange}
              className={`mt-1 text-[16px] block w-full border rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.businessAddress ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter your business address"
            />
            {errors.businessAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.businessAddress}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm text-customBrown"
            >
              Business Website (optional)
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="mt-1 text-[16px] block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Terms and conditions */}
          <div>
            <div className="flex items-center pb-4">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="termsAccepted"
                className="ml-2 block text-sm text-gray-900"
              >
                Yes, I understand and agree with Solid Spare Parts'
                <button className="text-primary hover:underline ml-1">
                  Terms of Service
                </button>
                , including the Privacy Policy*
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
            )}
          </div>

         
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-bold transition-all duration-300 bg-primary hover:bg-blue-700 active:bg-blue-800"
            >
              Continue
            </button>
          
        </form>
      </div>
    </div>
  );
};

export default KycForm;