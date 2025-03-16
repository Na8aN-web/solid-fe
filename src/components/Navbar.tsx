import React from "react";
import solidLogo from "../images/Frame 47.svg";
import help from "../images/help.svg";
import cart from "../images/cart.svg";
import arrowDown from "../images/arrow-down.svg";
import arrowDownWhite from "../images/arrow-right-white.svg";
import arrowRight from "../images/arrowright.svg";
import search from "../images/search.svg";
import bodyParts from "../images/game-icons_race-car.svg";
import electronics from "../images/iconoir_electronics-chip.svg";
import performanceParts from "../images/performance-part.svg";
import repairParts from "../images/repair-parts.svg";
import wheelsTyres from "../images/wheels-tyres.svg";
import toolsEquip from "../images/tools-equip.png";
import steering from "../images/steering.svg";
import filters from "../images/filter.svg";
import coolingHeat from "../images/cooling-heat.svg";
import airCondition from "../images/air-conditioner.svg";
import carHeader from "../images/car-header.svg";
// import solidLogo from "../images/Frame 47.svg";
// import help from "../images/help.svg";
// import cart from "../images/cart.svg";
// import arrowDown from "../images/arrow-down.svg";
// import arrowDownWhite from "../images/arrow-right-white.svg";
// import arrowRight from "../images/arrowright.svg";
// import search from "../images/search.svg";
// import bodyParts from "../images/game-icons_race-car.svg";
// import electronics from "../images/iconoir_electronics-chip.svg";
// import performanceParts from "../images/performance-part.svg";
// import repairParts from "../images/repair-parts.svg";
// import wheelsTyres from "../images/wheels-tyres.svg";
// import toolsEquip from "../images/tools-equip.png";
// import steering from "../images/steering.svg";
// import filters from "../images/filter.svg";
// import coolingHeat from "../images/cooling-heat.svg";
// import airCondition from "../images/air-conditioner.svg";


const Navbar = () => {
  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex justify-between items-center py-11 px-5 border-b">
          <div className="flex gap-20">
            <img src="/Frame 47.svg" alt="solid-logo" />
            {/* dropdown */}
            <div className="flex gap-4">
              <div className="flex">
                <div className="flex justify-around items-center w-44 h-12 border border-r-0 rounded-l-lg">
                  <p className="text-sm">All Categories</p>
                  <img src="/arrow-down.svg" alt="arrow-down" className="w-3" />
                </div>
                <div className="relative">
                  <img
                    src="/search.svg"
                    alt="search"
                    className="absolute top-4 left-5 w-5"
                  />
                  <input
                    type="text"
                    className="border h-12 w-96 p-2 rounded-r-lg text-sm pl-12"
                    placeholder="Search by part name of OEM number"
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
          </div>
          {/* User Options */}
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <img src="/help.svg" alt="help" className="w-8" />
              <select defaultValue="" name="" id="" className="text-sm">
                <option value="">Help</option>
              </select>
            </div>
            <div className="flex gap-1">
              <img src="cart.svg" alt="cart" className="w-8" />
              <p className="text-sm">My Cart</p>
            </div>
            <button
              type="submit"
              className="border border-primary h-12 w-16 rounded-lg bg-white text-primary text-sm font-semibold"
            >
              Log in
            </button>
            <button
              type="submit"
              className="border h-12 w-20 rounded-lg bg-primary text-white text-sm font-semibold"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Main Navigation with Sidebar Dropdown */}
        <div>
          <nav>
            <div className="flex items-start w-full gap-10 pt-6 pb-4 pr-20">
              {/* Sidebar Contents */}
              <aside className="relative">
                <div className="">
                  <div className="flex justify-around items-center w-72 h-14 bg-primary">
                    <p className="text-base text-white font-normal">
                      All Categories
                    </p>
                    <img
                      src="/arrow-right-white.svg"
                      alt="arrow-down"
                      className="w-3"
                    />
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
              <ul className="flex w-full justify-between items-center pt-1 text-customGray1 text-sm font-semibold">
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
                  <img src="/arrowright.svg" alt="arrow-right" className="w-4" />
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
