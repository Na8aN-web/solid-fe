import React, { useEffect } from "react";
import PriceRange from "./PriceRange";
import { RootState, AppDispatch } from "../../../../store";
import { fetchBrands } from "../../../../store/slices/brandSlice";
import { fetchCategories } from "../../../../store/slices/categoriesSlice";
import { fetchVehicleTypes } from "../../../../store/slices/vehicleSlice";
// Import the new slices
import { fetchMakers } from "../../../../store/slices/makerSlice";
import { fetchModels } from "../../../../store/slices/modelSlice";
import { fetchYears } from "../../../../store/slices/yearSlice";
import { fetchEngines } from "../../../../store/slices/engineSlice";
import { useDispatch, useSelector } from "react-redux";

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

type SectionKey = "category" | "department" | "vehicleType" | "brand";

interface SidebarFilterProps {
  filters: FilterState;
  handlePriceChange: ({
    minPrice,
    maxPrice,
  }: {
    minPrice: number;
    maxPrice: number;
  }) => void;
  expandedSections: Record<SectionKey, boolean>;
  toggleSection: (section: SectionKey) => void;
  selectedCategory?: string | null;
  onCategorySelect?: (category: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters?: () => void;
}

// Filter Section Component for reusable collapsible sections
const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isExpanded,
  toggleSection,
  children,
}) => (
  <div className="p-4 font-roboto">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-[16px]">{title}</h3>
      <button
        onClick={toggleSection}
        className="text-black hover:text-gray-600"
      >
        <span>{isExpanded ? "−" : "+"}</span>
      </button>
    </div>
    {isExpanded && <div className="space-y-2">{children}</div>}
  </div>
);

// Checkbox Item Component for filter options
const CheckboxItem = ({
  name,
  checked,
  onChange,
}: {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex justify-start gap-2 py-4 items-center">
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-600"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ml-3 text-gray-700">{name}</span>
    </label>
  </div>
);

// Custom Dropdown Component for the filter dropdowns
const FilterDropdown = ({
  label,
  value,
  options,
  loading,
  error,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ _id: string; name: string }>;
  loading: boolean;
  error: string | null;
  onChange: (value: string) => void;
}) => (
  <div className="mb-4">
    <div className="relative">
      <select
        className="appearance-none bg-[#F3F3F3] text-[16px] w-full rounded-md p-4 pl-4 pr-8 text-gray-800 focus:outline-none border border-amber-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">{`Select ${label}`}</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : error ? (
          <option disabled>Error loading {label.toLowerCase()}s</option>
        ) : (
          options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))
        )}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  filters,
  handlePriceChange,
  expandedSections,
  toggleSection,
  onFilterChange,
  onClearFilters,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Existing selectors
  const { brands, loading: brandsLoading, error: brandsError } = useSelector(
    (state: RootState) => state.brands
  );
  const {
    vehicleTypes,
    loading: vehicleLoading,
    error: vehicleError,
  } = useSelector((state: RootState) => state.vehicle);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  // New selectors for maker, model, year, engine
  const {
    makers,
    loading: makersLoading,
    error: makersError,
  } = useSelector((state: RootState) => state.maker);

  const {
    models,
    loading: modelsLoading,
    error: modelsError,
  } = useSelector((state: RootState) => state.model);

  const {
    years,
    loading: yearsLoading,
    error: yearsError,
  } = useSelector((state: RootState) => state.year);

  const {
    engines,
    loading: enginesLoading,
    error: enginesError,
  } = useSelector((state: RootState) => state.engine);

  // Fetch all data on component mount
  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchCategories());
    dispatch(fetchVehicleTypes());
    dispatch(fetchMakers());
    dispatch(fetchModels());
    dispatch(fetchYears());
    dispatch(fetchEngines());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");

    if (categoryFromUrl && !filters.categories.includes(categoryFromUrl)) {
      onFilterChange({
        ...filters,
        categories: [categoryFromUrl],
      });
    }
  }, [window.location.search]);

  // Handler for category checkbox changes
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId);

    onFilterChange({
      ...filters,
      categories: updatedCategories,
    });
  };

  // Handler for vehicle type checkbox changes
  const handleVehicleTypeChange = (vehicleTypeId: string, checked: boolean) => {
    const updatedVehicleTypes = checked
      ? [...filters.vehicleTypes, vehicleTypeId]
      : filters.vehicleTypes.filter((id) => id !== vehicleTypeId);

    onFilterChange({
      ...filters,
      vehicleTypes: updatedVehicleTypes,
    });
  };

  // Handler for brand checkbox changes
  const handleBrandChange = (brandId: string, checked: boolean) => {
    const updatedBrands = checked
      ? [...filters.brands, brandId]
      : filters.brands.filter((id) => id !== brandId);

    onFilterChange({
      ...filters,
      brands: updatedBrands,
    });
  };

  // Handler for department checkbox changes
  const handleDepartmentChange = (department: string, checked: boolean) => {
    const updatedDepartments = checked
      ? [...filters.departments, department]
      : filters.departments.filter((d) => d !== department);

    onFilterChange({
      ...filters,
      departments: updatedDepartments,
    });
  };

  // Handler for dropdown filter changes
  const handleDropdownChange = (filterType: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [filterType]: value,
    });
  };

  // Handler for search button click
  const handleSearch = () => {
    // You can add additional search logic here if needed
    console.log("Search clicked with filters:", filters);
    // Optionally trigger a parent component search function
  };

  // Handler for clearing all dropdown filters
  const clearDropdownFilters = () => {
    onFilterChange({
      ...filters,
      maker: "",
      model: "",
      year: "",
      engine: "",
    });
  };

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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown filters */}
        <div className="p-4 border-t border-gray-200">
          {/* Maker dropdown */}
          <FilterDropdown
            label="Maker"
            value={filters.maker}
            options={makers}
            loading={makersLoading}
            error={makersError}
            onChange={(value) => handleDropdownChange("maker", value)}
          />

          {/* Model dropdown */}
          <FilterDropdown
            label="Model"
            value={filters.model}
            options={models}
            loading={modelsLoading}
            error={modelsError}
            onChange={(value) => handleDropdownChange("model", value)}
          />

          {/* Year dropdown */}
          <FilterDropdown
            label="Year"
            value={filters.year}
            options={years}
            loading={yearsLoading}
            error={yearsError}
            onChange={(value) => handleDropdownChange("year", value)}
          />

          {/* Engine dropdown */}
          <FilterDropdown
            label="Engine"
            value={filters.engine}
            options={engines}
            loading={enginesLoading}
            error={enginesError}
            onChange={(value) => handleDropdownChange("engine", value)}
          />

          {/* Clear dropdown filters button */}
          {(filters.maker || filters.model || filters.year || filters.engine) && (
            <button
              onClick={clearDropdownFilters}
              className="w-full mb-4 bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md focus:outline-none hover:bg-gray-300 text-sm"
            >
              Clear Dropdown Filters
            </button>
          )}

          {/* Search button */}
          <button 
            onClick={handleSearch}
            className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md focus:outline-none hover:bg-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      {/* Filters section */}
      <div className="bg-white rounded-none md:rounded-md shadow-sm">
        <div className="p-4 hidden md:flex justify-between items-center">
          <h2 className="text-[20px] font-semibold">Filter</h2>
          <button
            onClick={() => {
              onClearFilters?.();
              clearDropdownFilters();
            }}
            className="ml-4 px-3 py-1 bg-white text-primary border border-blue-300 rounded-md text-sm hover:bg-blue-50 transition-colors"
          >
            Clear All Filters
          </button>
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
          toggleSection={() => toggleSection("category")}
        >
          {categoriesLoading ? (
            <div className="py-4 text-center text-gray-500">
              Loading categories...
            </div>
          ) : categoriesError ? (
            <div className="py-4 text-center text-red-500">
              Error loading categories
            </div>
          ) : (
            categories?.map((category) => (
              <CheckboxItem
                key={category._id}
                name={category.name}
                checked={filters.categories.includes(category._id)}
                onChange={(checked) =>
                  handleCategoryChange(category._id, checked)
                }
              />
            ))
          )}
        </FilterSection>

        {/* Department filter */}
        <FilterSection
          title="Department"
          isExpanded={expandedSections.department}
          toggleSection={() => toggleSection("department")}
        >
          {[
            { name: "Accessories", count: 11 },
            { name: "Brakes", count: 11 },
            { name: "Car Lights", count: 11 },
            { name: "Custom Wheels", count: 2 },
          ].map((dept) => (
            <CheckboxItem
              key={dept.name}
              name={dept.name}
              checked={filters.departments.includes(dept.name)}
              onChange={(checked) => handleDepartmentChange(dept.name, checked)}
            />
          ))}
        </FilterSection>

        {/* Vehicle Type filter */}
        <FilterSection
          title="Vehicle Type"
          isExpanded={expandedSections.vehicleType}
          toggleSection={() => toggleSection("vehicleType")}
        >
          {vehicleLoading ? (
            <div className="py-4 text-center text-gray-500">
              Loading vehicle types...
            </div>
          ) : vehicleError ? (
            <div className="py-4 text-center text-red-500">
              Error loading vehicle types
            </div>
          ) : (
            vehicleTypes?.map((vehicle) => (
              <CheckboxItem
                key={vehicle._id}
                name={vehicle.name}
                checked={filters.vehicleTypes.includes(vehicle._id)}
                onChange={(checked) =>
                  handleVehicleTypeChange(vehicle._id, checked)
                }
              />
            ))
          )}
        </FilterSection>

        {/* Brand filter */}
        <FilterSection
          title="Brand"
          isExpanded={expandedSections.brand}
          toggleSection={() => toggleSection("brand")}
        >
          {brandsLoading ? (
            <div className="py-4 text-center text-gray-500">
              Loading brands...
            </div>
          ) : brandsError ? (
            <div className="py-4 text-center text-red-500">
              Error loading brands
            </div>
          ) : (
            brands?.map((brand) => (
              <CheckboxItem
                key={brand._id}
                name={brand.name}
                checked={filters.brands.includes(brand._id)}
                onChange={(checked) => handleBrandChange(brand._id, checked)}
              />
            ))
          )}
        </FilterSection>
      </div>
    </div>
  );
};

export default SidebarFilter;