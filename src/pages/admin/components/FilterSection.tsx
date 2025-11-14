// FilterSection.tsx
import React from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";

type FilterOption = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
};

interface FilterSectionProps {
  filters: FilterOption[];
  showSort?: boolean;
  showFilterButton?: boolean;
  sortOptions?: { label: string; value: string }[];
  currentSort?: string;
  onSortChange?: (value: string) => void;
  onSortClick?: () => void;
  onFilterClick?: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  showSort = true,
  showFilterButton = true,
  sortOptions,
  currentSort,
  onSortChange,
  onSortClick,
  onFilterClick,
}) => {
  return (
    <section className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Scrollable Filters */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide whitespace-nowrap">
          {filters.map((filter, index) => (
            <div key={index} className="shrink-0">
              <label className="text-sm font-semibold text-[#2D2828] pb-2 block">
                {filter.label}
              </label>
              <div className="relative w-[202px] h-[44px]">
                <select
                  className="w-full h-full bg-gray-100 px-2 pr-8 appearance-none rounded-[6px] text-sm font-normal text-customBrown"
                  value={filter.value || filter.options[0]}
                  onChange={(e) => filter.onChange?.(e.target.value)}
                >
                  {filter.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                  <ChevronDown />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sort and Filter Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* {showSort && (
            <div className="w-[75px] h-[44px] bg-gray-100 flex items-center justify-center gap-1 rounded-[6px]">
              <ArrowUpDown className="text-primary w-[19px]" />
              <p className="text-primary font-semibold text-sm">Sort</p>
            </div>
          )} */}
          {showSort && sortOptions && (
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => onSortChange?.(e.target.value)}
                className="min-w-[140px] h-[44px] bg-gray-100 px-3 pr-8 appearance-none rounded-[6px] text-sm font-semibold text-primary cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                <ChevronDown className="text-primary w-[19px]" />
              </div>
            </div>
          )}
          {/* {showFilterButton && (
            <div className="w-[75px] h-[44px] bg-gray-100 flex items-center justify-center gap-1 rounded-[6px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-funnel text-primary w-[17px]"
              >
                <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
              </svg>
              <p className="text-primary font-semibold text-sm">Filter</p>
            </div>
          )} */}
          {/* {showSort && !sortOptions && (
            <button
              onClick={onSortClick}
              className="w-[75px] h-[44px] bg-gray-100 flex items-center justify-center gap-1 rounded-[6px] hover:bg-gray-200 transition-colors"
            >
              <ArrowUpDown className="text-primary w-[19px]" />
              <p className="text-primary font-semibold text-sm">Sort</p>
            </button>
          )} */}
          {showFilterButton && (
            <button
              onClick={onFilterClick}
              className="w-[75px] h-[44px] bg-gray-100 flex items-center justify-center gap-1 rounded-[6px] hover:bg-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-funnel text-primary w-[17px]"
              >
                <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
              </svg>
              <p className="text-primary font-semibold text-sm">Filter</p>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
