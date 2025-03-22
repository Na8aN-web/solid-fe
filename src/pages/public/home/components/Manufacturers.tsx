import React from "react";

const manufacturers = Array(12).fill({ name: "Manufacturer", logo: "Logo" });

const ManufacturersGrid: React.FC = () => {
  return (
    <div className="bg-[#F3F3F3] py-[20px] px-[20px] md:px-[80px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
        {manufacturers.map((manufacturer, index) => (
          <div
            key={index}
            className="bg-[#0033661A] rounded-lg p-6 text-center shadow-md font-roboto"
          >
            <p className="font-bold text-[24px] text-primary">{manufacturer.logo}</p>
            <p className="text-[16px] text-primary">{manufacturer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManufacturersGrid;
