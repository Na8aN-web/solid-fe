import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <header>
        <div className="flex items-center pt-11 px-5 w-full relative lg:gap-20 lg:border-b lg:pb-11">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="flex justify-between">
              <div className="flex gap-4">
                <img src="/hamburger.svg" alt="" className="w-6 lg:hidden" />
                <img
                  src="/Frame 47.svg"
                  alt="solid-logo"
                  className="w-32 lg:w-44"
                />
              </div>
              <img src="/cart.svg" alt="" className="w-8 lg:hidden" />
            </div>
            {/* mobile input */}
            <input
              type="text"
              className="border h-12 w-full p-2 rounded-lg lg:rounded-r-lg text-sm pl-12 lg:hidden"
              placeholder="Search by part name of OEM number"
            />
          </div>
          <div className="hidden lg:flex w-full">
            {/* input search */}
            <div className="flex gap-4 w-full">
              <div className="flex w-full">
                <div className="flex justify-around items-center w-52 gap-1 h-12 px-2 border border-r-0 rounded-l-lg">
                  <p className="text-sm">All Categories</p>
                  <img src="/arrow-down.svg" alt="arrow-down" className="w-3" />
                </div>
                <div className="relative max-w-96 w-full">
                  <img
                    src="/search.svg"
                    alt="search"
                    className="absolute top-4 left-5 w-5"
                  />
                  <input
                    type="text"
                    className="border h-12 w-full p-2 rounded-r-lg text-sm pl-12"
                    placeholder="Search by part name or OEM number"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="border h-12 rounded-lg bg-primary text-white px-4 text-base font-semibold"
              >
                Search
              </button>
            </div>
            {/* User Options */}
            <div className="flex gap-4 items-center justify-end w-full">
              <div className="flex gap-1 items-center">
                <img src="/help.svg" alt="help" className="w-8" />
                <select defaultValue="" name="" id="" className="text-sm">
                  <option value="">Help</option>
                </select>
              </div>
              <div className="flex gap-1 items-center">
                <img src="cart.svg" alt="cart" className="w-auto" />
                <p className="text-sm">My Cart</p>
              </div>
              <button
                type="submit"
                className="border border-primary h-12 w-20 rounded-lg bg-white text-primary text-sm font-semibold"
              >
                Log in
              </button>
              <button
                type="submit"
                className="border h-12 w-24 rounded-lg bg-primary text-white text-sm font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation with Sidebar Dropdown */}
        <div>
          <nav>
            <div className="flex flex-col lg:flex-row items-start w-full gap-5 pt-6 pb-4  pr-20">
              {/* Sidebar Contents */}
              <aside>
                <div className="w-full">
                  <div className="flex items-center justify-between gap-4 w-screen px-8 sm:w-72 h-14 bg-primary">
                    <div className="flex items-center gap-4">
                      <p className="text-base text-white font-normal">
                        All Categories
                      </p>
                      <img
                        src="/arrow-right-white.svg"
                        alt="arrow-down"
                        className="w-3"
                      />
                    </div>
                    <p className="text-base text-white font-semibold">
                      See All
                    </p>
                  </div>
                  {/* <ul className="flex flex-col justify-around items-start h-inherit px-11 py-3 bg-white text-gray-500 text-sm font-normal">
                    <li className="flex items-center gap-4">
                      <img src={bodyParts} alt="body-part" />
                      <span>Body Parts</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={electronics} alt="electronics" />
                      <span>Electronics</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={performanceParts} alt="performance-parts" />
                      <span>Performance Parts</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={repairParts} alt="repair-parts" />
                      <span>Repairs Parts</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={wheelsTyres} alt="wheels-tyres" />
                      <span>Wheels & Tyres</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={toolsEquip} alt="tools-equip" />
                      <span>Tools & Equipments</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={steering} alt="steering" />
                      <span>Steering Systems</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={filters} alt="filters" />
                      <span>Filters</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={coolingHeat} alt="cooling-heat" />
                      <span>Cooling & Heating Systems</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <img src={airCondition} alt="air-condition" />
                      <span>Air Conditioning</span>
                    </li>
                    <li>See More +</li>
                  </ul> */}
                </div>
              </aside>
              {/* main navigation */}
              <ul className="flex w-full justify-between items-center text-customGray1 text-sm font-semibold">
                <li className="bg-gray-100 rounded-3xl px-6 py-3">
                  All Brands
                </li>
                <li>Toyota</li>
                <li>Mercedes</li>
                <li>BMW</li>
                <li>Ford</li>
                <li>Honda</li>
                <li>Hyundai</li>
                <li>Kia</li>
                <li>Mazda</li>
                <li>Audi</li>
                <li>
                  <img
                    src="/arrowright.svg"
                    alt="arrow-right"
                    className="w-4"
                  />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
