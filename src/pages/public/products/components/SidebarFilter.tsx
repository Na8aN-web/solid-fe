import React from 'react';
import PriceRange from "./PriceRange";

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
}

interface FilterState {
  maker: string;
  model: string;
  year: string;
  engine: string;
  minPrice: number;
  maxPrice: number;
  categories: string[];
  departments: string[];
  vehicleTypes: string[];
  brands: string[];
}
type SectionKey = 'category' | 'department' | 'vehicleType' | 'brand';


interface SidebarFilterProps {
  filters: FilterState;
  handlePriceChange: ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => void;
  expandedSections: Record<SectionKey, boolean>;
  toggleSection: (section: SectionKey) => void;
}


// Filter Section Component for reusable collapsible sections
const FilterSection: React.FC<FilterSectionProps> = ({ title, isExpanded, toggleSection, children }) => (
  <div className="p-4 font-roboto">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-[16px]">{title}</h3>
      <button
        onClick={toggleSection}
        className="text-black hover:text-gray-600"
      >
        <span>{isExpanded ? '−' : '+'}</span>
      </button>
    </div>
    {isExpanded && <div className="space-y-2">{children}</div>}
  </div>
);

// Checkbox Item Component for filter options
const CheckboxItem = ({ name, count }: { name: string; count: number }) => (
  <div className="flex justify-start gap-2 py-4 items-center">
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
      <span className="ml-3 text-gray-700">{name}</span>
    </label>
    <span className="text-[16px] text-[#5E5E5E] bg-[#E7EAEA] px-2 py-0.5 rounded-md">{count}</span>
  </div>
);

const SidebarFilter: React.FC<SidebarFilterProps> = ({ 
  filters, 
  handlePriceChange, 
  expandedSections, 
  toggleSection 
}) => {
  return (
    <div className="w-full">
      {/* Yellow search box */}
      <div className="bg-[#FFC30026] rounded-md shadow-sm mb-6 md:block hidden">
        <div className="p-4">
          <div className="relative">
            <select
              className="appearance-none bg-[#FFC300] w-full rounded-md p-3 pl-4 pr-8 font-semibold text-gray-800 focus:outline-none"
              value="All Categories"
            >
              <option>All Categories</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown filters */}
        <div className="p-4 border-t border-gray-200">
          {['Maker', 'Model', 'Year', 'Engine'].map((filter) => (
            <div key={filter} className="mb-4">
              <div className="relative">
                <select
                  className="appearance-none bg-[#F3F3F3] text-[16px] w-full rounded-md p-4 pl-4 pr-8 text-gray-800 focus:outline-none border border-amber-100"
                >
                  <option>{`Select ${filter}`}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Search button */}
          <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md focus:outline-none hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>

      {/* Filters section */}
      <div className="bg-white rounded-none md:rounded-md shadow-sm">
        <div className="p-4 hidden md:block">
          <h2 className="text-[20px] font-semibold">Filter</h2>
        </div>

        {/* Price filter */}
        <div className="filter-section p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Price (₦)</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <span>−</span>
            </button>
          </div>
          <PriceRange
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onPriceChange={handlePriceChange}
            minLimit={100}
            maxLimit={200000}
            currency="₦"
          />
        </div>

        {/* Category filter */}
        <FilterSection 
          title="Category" 
          isExpanded={expandedSections.category} 
          toggleSection={() => toggleSection('category')}
        >
          {[
            { name: 'Repair Parts', count: 11 },
            { name: 'Body Parts', count: 11 },
            { name: 'Performance Parts', count: 11 },
            { name: 'Electronics', count: 2 },
            { name: 'Lighting', count: 5 }
          ].map((category) => (
            <CheckboxItem key={category.name} name={category.name} count={category.count} />
          ))}
        </FilterSection>

        {/* Department filter */}
        <FilterSection 
          title="Department" 
          isExpanded={expandedSections.department} 
          toggleSection={() => toggleSection('department')}
        >
          {[
            { name: 'Accessories', count: 11 },
            { name: 'Brakes', count: 11 },
            { name: 'Car Lights', count: 11 },
            { name: 'Custom Wheels', count: 2 }
          ].map((dept) => (
            <CheckboxItem key={dept.name} name={dept.name} count={dept.count} />
          ))}
        </FilterSection>

        {/* Vehicle Type filter */}
        <FilterSection 
          title="Vehicle Type" 
          isExpanded={expandedSections.vehicleType} 
          toggleSection={() => toggleSection('vehicleType')}
        >
          {[
            { name: 'Passenger Cars', count: 11 },
            { name: 'SUVs & Crossovers', count: 11 },
            { name: 'Buses', count: 11 },
            { name: 'Tricycles', count: 2 }
          ].map((type) => (
            <CheckboxItem key={type.name} name={type.name} count={type.count} />
          ))}
        </FilterSection>

        {/* Brand filter */}
        <FilterSection 
          title="Brand" 
          isExpanded={expandedSections.brand} 
          toggleSection={() => toggleSection('brand')}
        >
          {[
            { name: 'Chevrolet', count: 11 },
            { name: 'Toyota', count: 11 },
            { name: 'Lexus', count: 11 },
            { name: 'Honda', count: 2 }
          ].map((brand) => (
            <CheckboxItem key={brand.name} name={brand.name} count={brand.count} />
          ))}
        </FilterSection>
      </div>
    </div>
  );
};

export default SidebarFilter;