import React from "react";

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <div className="space-y-2">
      <span className="text-sm font-normal text-[#827E7E]">{label}</span>
      <p className="text-base font-medium text-customBrown">{value}</p>
    </div>
    <button className="w-[88px] h-[52px] bg-[#D9D9D9] rounded-[4px]">
      Edit
    </button>
  </div>
);

const Profile = () => {
  return (
    <div>
      <section className="w-full border-2 rounded-[8px]">
        <div className="w-full bg-primary flex justify-between items-center py-4 px-8 rounded-t-lg">
          <div>
            <div className="flex gap-4 justify-center items-center pb-4">
              <div className="w-[60px] h-[60px] rounded-full bg-[#E3E6EA] flex justify-center items-center">
                <span>M</span>
              </div>
              <div>
                <p className="text-base font-semibold text-customLight">
                  Marvelous
                </p>
                <span className="text-xs font-normal text-customLight">
                  Admin
                </span>
              </div>
            </div>
            <p className="text-base font-semibold text-customLight">
              Last visit 12/12/2024
            </p>
          </div>
          <button className="bg-[#FFC300] w-[214px] h-[52px] rounded-[4px] text-base font-normal text-customDark">
            Upload Profile Picture
          </button>
        </div>
        <div className="px-8 pt-8 pb-6 space-y-6">
          <InfoField label="First Name" value="Marvelous" />
          <InfoField label="Last Name" value="Afolabi" />
          <InfoField label="Phone Number" value="07088980354" />
          <InfoField label="Email Address" value="marvelous@yahoo.com" />
          <button className="w-full h-[60px] bg-primary rounded-lg text-customLight text-base font-semibold">
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
