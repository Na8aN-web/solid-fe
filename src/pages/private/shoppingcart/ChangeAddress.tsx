import React from "react";

const ChangeAddress = () => {
  return (
    <div className="p-5 flex justify-center items-center">
      <section className="space-y-5 max-w-[525px] w-full min-h-screen">
        <div className="flex justify-between items-center">
          <h2>Address</h2>
          <button className="bg-primary text-white w-[140px] h-[40px] rounded">
            Change Address
          </button>
        </div>
        <section className="border border-primary rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img src="/home-outline.svg" alt="" />
              <p className="text-[10px] text-customGray3">Delivery Address</p>
              <span className="bg-[#BFCCD8] text-xs text-primary p-1 rounded">
                Default
              </span>
            </div>
            <img src="/edit.svg" alt="" />
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
            <img src="/delete.svg" alt="" />
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="" id="" />
            <p className="text-customGray3 text-sm">Set as default address</p>
          </div>
        </section>
        <button
          type="submit"
          className="bg-primary rounded-lg p-4 w-full text-base text-white font-semibold"
        >
          Update
        </button>
        <button
          type="submit"
          className="bg-white rounded-lg p-4 w-full text-base text-primary border border-primary font-semibold"
        >
          Cancel
        </button>
      </section>
    </div>
  );
};

export default ChangeAddress;
