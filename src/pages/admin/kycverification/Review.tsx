import React from "react";

interface VerificationChecklistProps {
  label: string;
}

const handleViewDocument = (documentUrl: string | undefined) => {
    if (!documentUrl) return;
    
    // Open document in a new tab
    window.open(documentUrl, '_blank');
};

const VerificationChecklist: React.FC<VerificationChecklistProps> = ({
  label,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={label}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor="document-quality" className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

const Review = () => {
  return (
    <section className="fixed p-10 bg-gray-50 rounded-2xl">
      <div className="flex gap-8">
        {/* Business Info Section */}
        <article className="mb-8">
          <header className="mb-4">
            <h1 className="text-xl font-semibold">Business Info</h1>
          </header>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-customGray3 text-sm font-normal">
                Business Name
              </p>
              <p className="text-customBrown text-base font-meduim">
                Marvelous
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-customGray3 text-sm font-normal">
                Registration Number
              </p>
              <p className="text-customBrown text-base font-meduim">
                07039123456
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-customGray3 text-sm font-normal">
                Business Address
              </p>
              <address className="text-customBrown text-base font-meduim">
                No 254, Ikeja Alausa
              </address>
            </div>
            <div className="space-y-2">
              <p className="text-customGray3 text-sm font-normal">
                Business Type
              </p>
              <p className="text-customBrown text-base font-meduim">
                Limited Company
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-customGray3 text-sm font-normal">
                Business Email Address
              </p>
              <p className="text-customBrown text-base font-meduim">
                marvellous@yahoo.com
              </p>
            </div>
          </div>
        </article>

        {/* Document Upload Section */}
        <article>
          <header className="mb-4">
            <h2 className="text-lg font-semibold">Upload Document</h2>
          </header>
          <div className="space-y-4">
            <div>
              <p className="text-base text-customBrown font-normal pb-2">
                Business Registration Certifictae
              </p>
              <div className="border border-customGray3 rounded-md p-4 flex items-center gap-4 w-[400px]">
                <input
                  type="text"
                  placeholder="Uploaded PDF file name"
                  value="pdf"
                  className="flex-1 px-3 py-2 text-sm w-4"
                />
                <button className="w-[71px] h-[34px] rounded-[8px] text-customLight bg-primary text-sm font-medium hover:underline">
                  View
                </button>
              </div>
            </div>
            <div>
              <p className="text-base text-customBrown font-normal pb-2">
                Proof of Address
              </p>
              <div className="border border-customGray3 rounded-md p-4 flex items-center gap-4 w-[400px]">
                <input
                  type="text"
                  placeholder="Uploaded PDF file name"
                  value="pdf"
                  className="flex-1 px-3 py-2 text-sm w-4"
                />
                <button className="w-[71px] h-[34px] rounded-[8px] text-customLight bg-primary text-sm font-medium hover:underline">
                  View
                </button>
              </div>
            </div>
            <div>
              <p className="text-base text-customBrown font-normal pb-2">
                Proof of Product Signing
              </p>
              <div className="border border-customGray3 rounded-md p-4 flex items-center gap-4 w-[400px]">
                <input
                  type="text"
                  placeholder="Uploaded PDF file name"
                  value="pdf"
                  className="flex-1 px-3 py-2 text-sm w-4"
                />
                <button className="w-[71px] h-[34px] rounded-[8px] text-customLight bg-primary text-sm font-medium hover:underline">
                  View
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
      {/* Verification Checklist Section */}
      <div>
        <h1 className="text-xl font-bold pb-2">Verification Checklist</h1>
        <div className="space-y-2">
          <VerificationChecklist label="Document Quality" />
          <VerificationChecklist label="Matching Details" />
          <VerificationChecklist label="Valid Expiry Dates" />
        </div>
      </div>
      <div className="flex gap-4 pt-6">
        <button className="bg-primary h-[55px] rounded-[8px] text-customLight w-full">
          Approve
        </button>
        <button className="bg-[#F248221A] h-[55px] rounded-[8px] text-[#F24822] w-full">
          Reject
        </button>
      </div>
    </section>
  );
};

export default Review;
