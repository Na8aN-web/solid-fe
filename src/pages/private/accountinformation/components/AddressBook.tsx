import React from "react";

const AddressBook = () => {
  return (
      <div className="flex justify-center items-center">
        <section className="space-y-5 w-full min-h-screen">
          <div className="flex justify-between items-center">
            <h2 className="text-customBrown text-base font-medium md:text-xl">Address Book</h2>
            <button className="bg-primary text-white w-[140px] h-[40px] rounded">
              Change Address
            </button>
          </div>
          <section className="bg-white shadow-custom rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <img src="/home-outline.svg" alt="" />
                <p className="text-[10px] text-customGray3">Delivery Address</p>
                <span className="bg-[#D9E1E8] text-[10px] text-primary py-1 px-2 rounded">
                  Default
                </span>
              </div>
              <div className="flex gap-[24px] items-center">
                <img src="/edit.svg" alt="" />
                <img src="/delete.svg" alt="" />
              </div>
            </div>
            <p className="text-base text-customBrown">Micheal Afolabi</p>
            <p className="text-xs text-customGray3">
              4517 Lekki Phase I Ave. Lagos, Mbadiwwe Street
            </p>
            <p className="text-xs text-customGray3">Nigeria, Lekki, Lagos</p>
            <div className="flex justify-between items-center">
              <p className="text-xs text-customGray3">
                07012345678 | michaelgordon@gmail.com
              </p>
            </div>
          </section>
        </section>
      </div>
  );
};

export default AddressBook;
