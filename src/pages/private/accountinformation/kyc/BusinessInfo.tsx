import React, { useState } from "react";
import BusinessCard from "./components/BusinessCard";
import UploadCard from "./components/UploadCard";
import { ArrowLeft } from "lucide-react";
import SuccessMessage from "../../../../components/SuccessMessage";

interface Step {
  id: number;
  title: string;
}

interface StepsDataType {
  [key: string]: Step[];
}

const BusinessInfo = () => {
  const [businessCert, setBusinessCert] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [idCard, setIdCard] = useState<File | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Continue");
  const [isCompleted, setIsCompleted] = useState(false);


  const allUploaded = businessCert && proofOfAddress && idCard;

  const handleContinue = () => {
    if (!allUploaded) return;

    //  Scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });

    setIsCompleted(true); 

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setButtonLabel("Home");
      // If you want to navigate:
      // navigate("/");
    }, 2000);
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
      <section className="border w-[1100px] rounded-[16px] p-6 md:p-10">
        <div>
          {showSuccess && (
            <SuccessMessage
              message="Your documents have been uploaded successfully"
              onClose={() => setShowSuccess(false)}
            />
          )}
        </div>
        <ArrowLeft />
        <div className="relative w-full">
          {/* Horizontal connecting lines */}
          {/* Green segment */}
          <div
            className="absolute top-4 h-0.5 bg-[#15B70D] z-0"
            style={{
              left: "calc(12.5%)",
              width: isCompleted ? "calc(87.5%)" : "calc(80% - 12.5%)",
            }}
          ></div>
          {/* Gray segment */}
          <div
            className="absolute top-4 h-0.5 bg-gray-300 z-0"
            style={{
              left: "calc(50%)",
              width:  "calc(37.5%)", // from center of step 2 to center of step 3
            }}
          ></div>

          {/* Steps */}
          <div className="flex justify-between relative z-10 w-full my-12">
            {currentSteps.map((step, index) => {
              let bgColor;
              if (index < 2)
                bgColor = "#15B70D"; // Step 1 & 2 green
              else if (index === 1 || index === 2)
                bgColor = "#003366"; // 3 blue
              else bgColor = "#d1d5db"; // others gray if more than 2 steps

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
                    {index < 2 ? "✓" : index + 1}
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-800 text-center">
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="basis-[45%]">
              <BusinessCard />
            </div>
            <div className="basis-[55%]">
              <UploadCard
                title="Upload Your Business Registration Certificate"
                onFileUpload={setBusinessCert}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="basis-[45%]">
              <BusinessCard />
            </div>
            <div className="basis-[55%]">
              <UploadCard
                title="Upload Proof of Business Address"
                onFileUpload={setProofOfAddress}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="basis-[45%]">
              <BusinessCard />
            </div>
            <div className="basis-[55%]">
              <UploadCard
                title="Upload Your Valid ID Card"
                onFileUpload={setIdCard}
              />
            </div>
          </div>
          <button
            onClick={handleContinue}
            disabled={!allUploaded}
            className={`w-full px-6 py-2 rounded text-white font-semibold transition ${
              allUploaded
                ? "bg-primary hover:bg-primary-dark"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {buttonLabel}
          </button>
        </div>
      </section>
    </div>
  );
};

export default BusinessInfo;
