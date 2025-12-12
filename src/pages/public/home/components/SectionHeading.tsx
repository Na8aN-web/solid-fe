import React from "react";

type SectionHeadingProps = {
  title: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({title}) => {
  return (
    <div>
      <div className="flex justify-between items-center pb-2 sm:pb-6">
        <div className="flex gap-0 items-center">
          <img src="/double-right.png" alt="right" className="w-9 md:w-16" />
          <h2 className="text-xl sm:text-2xl text-customGray1 font-semibold">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
