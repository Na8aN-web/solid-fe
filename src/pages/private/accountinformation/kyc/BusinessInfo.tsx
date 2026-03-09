import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BusinessCard from "./components/BusinessCard";
import UploadCard from "./components/UploadCard";
import { ArrowLeft } from "lucide-react";
import SuccessMessage from "../../../../components/SuccessMessage";
import { AppDispatch, RootState } from "../../../../store";
import { submitKYC, clearError } from "../../../../store/slices/kycSlice";
import { KYCFormData } from "../../../../services/kyc/types";

interface Step {
  id: number;
  title: string;
}

interface StepsDataType {
  [key: string]: Step[];
}

const BusinessInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { submitting, error } = useSelector((state: RootState) => state.kyc);
   const { user } = useSelector((state: RootState) => state.auth);

  const [businessCert, setBusinessCert] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [proofOfSourcing, setProofOfSourcing] = useState<File | null>(null);
  // const [idCard, setIdCard] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Continue");
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});

  // Get form data from previous step
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    // Get form data from sessionStorage
    const savedFormData = sessionStorage.getItem('kycFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    } else {
      // Redirect back to form if no data found
      navigate('/kyc-form');
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      setSubmitError(error);
      // Clear error after showing it
      setTimeout(() => {
        dispatch(clearError());
        setSubmitError("");
      }, 5000);
    }
  }, [error, dispatch]);

  const validateFiles = () => {
    const errors: { [key: string]: string } = {};

    if (!businessCert) errors.businessCert = "Business certificate is required";
    if (!proofOfAddress) errors.proofOfAddress = "Proof of address is required";
    if (!proofOfSourcing) errors.proofOfSourcing = "Proof of sourcing is required";
    setFileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const allUploaded = businessCert && proofOfAddress && proofOfSourcing;

  const handleContinue = async () => {
    if (!formData || !validateFiles() || !user?.email) return;

    const kycData: KYCFormData = {
      businessName: formData.businessName,
      registrationNumber: formData.registrationNumber,
      typeOfBusiness: formData.typeOfBusiness,
      dateOfIncorporation: formData.dateOfIncorporation,
      businessAddress: formData.businessAddress,
      taxId: formData.taxId,
      emailAddress: user.email,
      website: formData.website || undefined,
      businessCert: businessCert!,
      proofOfAddress: proofOfAddress!,
      proofOfSourcing: proofOfSourcing!,
    };

    try {
      // const result = await dispatch(submitKYC(kycData)).unwrap();

      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsCompleted(true);
      setShowSuccess(true);
      sessionStorage.removeItem('kycFormData');

      setTimeout(() => {
        setShowSuccess(false);
        setButtonLabel("Go to Dashboard");
        navigate("/account-information/profile");
      }, 2000);

    } catch (error) {
      console.error('KYC submission failed:', error);
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

  if (!formData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
          {submitError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">Submission Error:</p>
              <p>{submitError}</p>
            </div>
          )}
        </div>

        <ArrowLeft
          className="cursor-pointer mb-4"
          onClick={() => navigate('/kyc-form')}
        />

        <div className="relative w-full">
          {/* Horizontal connecting lines */}
          {/* Green segment */}
          <div
            className="absolute top-4 h-0.5 bg-[#15B70D] z-0"
            style={{
              left: "calc(12.5%)",
              width: isCompleted ? "calc(75%)" : "calc(37.5%)",
            }}
          ></div>
          {/* Gray segment */}
          <div
            className="absolute top-4 h-0.5 bg-gray-300 z-0"
            style={{
              left: isCompleted ? "calc(87.5%)" : "calc(50%)",
              width: isCompleted ? "calc(0%)" : "calc(37.5%)",
            }}
          ></div>

          {/* Steps */}
          <div className="flex justify-between relative z-10 w-full my-12">
            {currentSteps.map((step, index) => {
              let bgColor;
              if (index < 2 || (index === 2 && isCompleted))
                bgColor = "#15B70D"; // Completed steps green
              else if (index === 2 && !isCompleted)
                bgColor = "#003366"; // Current step blue
              else bgColor = "#d1d5db"; // Future steps gray

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
                    {(index < 2 || (index === 2 && isCompleted)) ? "✓" : index + 1}
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
                fileType="businessCert"
              />
              {fileErrors.businessCert && (
                <p className="text-red-500 text-sm mt-1">{fileErrors.businessCert}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="basis-[45%]">
              <div className="border w-full px-4 py-6 rounded-[10px]">
                <h2 className="text-xl font-semibold text-customBrown pb-2">
                  Proof of Business Address
                </h2>
                <p className="text-sm font-normal text-customGray3">
                  Please upload a clear copy of your business address verification
                  document (e.g., utility bill, lease agreement, or bank statement)
                  showing your business address. Ensure the document is recent
                  (within 3 months) and in PDF, JPG, or PNG format.
                </p>
              </div>
            </div>
            <div className="basis-[55%]">
              <UploadCard
                title="Upload Proof of Business Address"
                onFileUpload={setProofOfAddress}
                fileType="proofOfAddress"
              />
              {fileErrors.businessCert && (
                <p className="text-red-500 text-sm mt-1">{fileErrors.proofOfAddress}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="basis-[45%]">
              <div className="border w-full px-4 py-6 rounded-[10px]">
                <h2 className="text-xl font-semibold text-customBrown pb-2">
                  Proof of Sourcing
                </h2>
                <p className="text-sm font-normal text-customGray3">
                  Please upload documents that verify your business's sourcing 
                  capabilities and supply chain legitimacy. This could include supplier 
                  agreements, import/export documentation, or certificates of origin. 
                  Ensure documents are clear and in PDF, JPG, or PNG format.
                </p>
              </div>
            </div>
            <div className="basis-[55%]">
              <UploadCard
                title="Upload Proof of Sourcing"
                onFileUpload={setProofOfSourcing} // Changed from setIdCard
                fileType="proofOfSourcing" // Changed from idCard
              />
              {fileErrors.proofOfSourcing && ( // Changed from idCard
                <p className="text-red-500 text-sm mt-1">{fileErrors.proofOfSourcing}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!allUploaded || submitting}
            className={`w-full px-6 py-3 rounded text-white font-semibold transition ${allUploaded && !submitting
              ? "bg-primary hover:bg-primary-dark"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              buttonLabel
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default BusinessInfo;