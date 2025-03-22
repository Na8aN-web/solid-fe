import React from "react";
import { ChevronRight } from 'lucide-react';

const PopularVehicleTypes = () => {
  return (
    <div>
      {/* Popular Vehicle type */}
      <section className="py-8">
        <div className="flex justify-between items-center pb-2 sm:pb-6">
          <div className="flex gap-0 items-center">
            <img src="/double-right.svg" alt="right" className="w-9 md:w-16" />
            <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
              Popular Vehicles Types
            </h2>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-base font-semibold text-customGray1">See All</p>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <img src="/passenger-car.svg" alt="" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Passengers Cars
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/suvs.svg" alt="suvs" />
            <p className="text-sm text-customBrown font-normal pt-4">
              SUVs and Crossovers
            </p>
          </div>
          <div className="sm:flex flex-col items-center hidden">
            <img src="/trucks.svg" alt="trucks" />
            <p className="text-sm text-customBrown font-normal pt-4">Trucks</p>
          </div>
          <div className="sm:flex flex-col items-center hidden">
            <img src="/equip-heavy.svg" alt="heavy-equipment" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Heavy Equipment and Machinery
            </p>
          </div>
          <div className="lg:flex flex-col items-center hidden">
            <img src="/tricycles.svg" alt="tricycle" />
            <p className="text-sm text-customBrown font-normal pt-4">
              Tricycles
            </p>
          </div>
          <div className="lg:flex flex-col items-center hidden">
            <img src="/buses.svg" alt="buses" />
            <p className="text-sm text-customBrown font-normal pt-4">Buses</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularVehicleTypes;
