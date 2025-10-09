import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseSolidParts = () => {
  const StartShoppingButton = () => (
    <Link
      to="/products"
      className="bg-white border border-gray-200 italic text-primary py-2 px-4 rounded-md text-sm font-medium inline-flex items-center"
    >
      Start Shopping
      <ArrowRight className="w-4 h-4 ml-2" />
    </Link>
  );
  return (
    <div className="mx-auto px-[20px] md:px-[80px] py-[30px] font-roboto">
      <h2 className="text-[20px] md:text-[24px] font-semibold flex items-center mb-16">
        <img src="/double-right.png" alt="double right arrow" />
        <span>Why Choose Solid Spare Parts?</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wide Product Range */}
        <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
          <div className="flex items-left justify-start mb-4">
            <img src="/why1.png" alt="why pick solid" />
          </div>
          <h3 className="text-primary font-bold mb-2">Wide Product Range</h3>
          <p className="text-[12px] text-primary mb-4">
            Access spare parts for all types of vehicles, including cars,
            trucks, and tractors.
          </p>
          <StartShoppingButton />
        </div>

        {/* Bulk Ordering Options - Pushed Up */}
        <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6 relative md:bottom-12">
          <div className="flex items-left justify-start mb-4">
            <img src="/why2.png" alt="why pick solid" />
          </div>
          <h3 className="text-primary font-bold mb-2">Bulk Ordering Options</h3>
          <p className="text-[12px] text-primary mb-4">
            Designed for Bulk buyers and importers to buy in large quantities.
          </p>
          <StartShoppingButton />
        </div>

        {/* Direct Manufacturer Access */}
        <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
          <div className="flex items-left justify-start mb-4">
            <img src="/why3.png" alt="why pick solid" />
          </div>
          <h3 className="text-primary font-bold mb-2">
            Direct Manufacturer Access
          </h3>
          <p className="text-[12px] text-primary mb-4">
            Connect with trusted manufacturers for high-quality parts.
          </p>
          <StartShoppingButton />
        </div>

        {/* Secure Payments */}
        <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
          <div className="flex items-left justify-start mb-4">
            <img src="/why4.png" alt="why pick solid" />
          </div>
          <h3 className="text-primary font-bold mb-2">Secure Payments</h3>
          <p className="text-[12px] text-primary mb-4">
            Reliable delivery services nationwide.
          </p>
          <StartShoppingButton />
        </div>

        {/* Fast Delivery - Pushed Up */}
        <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6 relative md:bottom-12">
          <div className="flex items-left justify-start mb-4">
            <img src="/why5.png" alt="why pick solid" />
          </div>
          <h3 className="text-primary font-bold mb-2">Fast Delivery</h3>
          <p className="text-[12px] text-primary mb-4">
            Simple search and order process.
          </p>
          <StartShoppingButton />
        </div>

        {/* User-Friendly Interface */}
        <div className="border-[2px] border-primary rounded-lg bg-[#00336626] p-6">
          <div className="flex items-left justify-start mb-4">
            <img src="/why6.png" alt="why pick solid" />
          </div>
          <h3 className="text-primary font-bold mb-2">
            User-Friendly Interface
          </h3>
          <p className="text-[12px] text-primary mb-4">
            Multiple payment options with robust security.
          </p>
          <StartShoppingButton />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseSolidParts;
