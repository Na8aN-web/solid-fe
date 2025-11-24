import { useState, useEffect, useCallback } from "react";
import SidebarFilter from "./components/SidebarFilter";
import ProductGrid from "./components/ProductGrid";
import Recents from "./components/Recents";
import {
  fetchProductCount,
  fetchProductsByCategory,
  searchProducts,
  fetchProducts,
  toggleFavorite,
  setItemsPerPage,
  setCurrentPage,
} from "../../../store/slices/productSlice";
import { addProductToCart } from "../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useLocation } from "react-router-dom";

export interface FilterState {
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

interface ProductPageLayoutProps {
  extraSection?: React.ReactNode;
  pageTitle?: string;
}

const ProductPageLayout: React.FC<ProductPageLayoutProps> = ({
  extraSection,
  pageTitle = "Products",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const name = params.get("name");
  const dispatch = useAppDispatch();
  const { loading: cartLoading } = useAppSelector((state) => state.cart);
  const { products, loading, error, currentPage, itemsPerPage, totalProducts } = useAppSelector((state) => state.products);

  const [filterLoading, setFilterLoading] = useState(false);
  const [activeFilterText, setActiveFilterText] = useState("");

  const [filters, setFilters] = useState<FilterState>({
    maker: "",
    model: "",
    year: "",
    engine: "",
    minPrice: 100,
    maxPrice: 200000,
    categories: [],
    departments: [],
    vehicleTypes: [],
    brands: [],
  });
  const [sortOrder, setSortOrder] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    department: true,
    vehicleType: true,
    brand: true,
  });

  const generateFilterText = (newFilters: FilterState) => {
    const activeFilters = [];

    if (newFilters.categories.length > 0) {
      activeFilters.push(`${newFilters.categories.length} categor${newFilters.categories.length === 1 ? 'y' : 'ies'}`);
    }
    if (newFilters.brands.length > 0) {
      activeFilters.push(`${newFilters.brands.length} brand${newFilters.brands.length === 1 ? '' : 's'}`);
    }
    if (newFilters.vehicleTypes.length > 0) {
      activeFilters.push(`${newFilters.vehicleTypes.length} vehicle type${newFilters.vehicleTypes.length === 1 ? '' : 's'}`);
    }
    if (newFilters.departments.length > 0) {
      activeFilters.push(`${newFilters.departments.length} department${newFilters.departments.length === 1 ? '' : 's'}`);
    }
    if (newFilters.minPrice !== 100 || newFilters.maxPrice !== 200000) {
      activeFilters.push(`price range ₦${newFilters.minPrice} - ₦${newFilters.maxPrice}`);
    }

    return activeFilters.length > 0
      ? `Filtering by: ${activeFilters.join(', ')}`
      : "";
  };

  // FIXED: Removed fetchFilteredProducts from dependencies to prevent infinite loop
  useEffect(() => {
    const fetchData = async () => {
      setFilterLoading(true);

      const hasFilters =
        filters.categories.length > 0 ||
        filters.brands.length > 0 ||
        filters.vehicleTypes.length > 0 ||
        filters.departments.length > 0 ||
        filters.minPrice !== 100 ||
        filters.maxPrice !== 200000;

      try {
        if (name && name.trim()) {
          await dispatch(searchProducts({
            name: name.trim(),
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortOrder
          })).unwrap();
        } else if (hasFilters) {
          await dispatch(fetchProducts({
            categories: filters.categories,
            brands: filters.brands,
            vehicleTypes: filters.vehicleTypes,
            departments: filters.departments,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortOrder
          } as any)).unwrap();
        } else {
          await dispatch(fetchProducts({
            page: currentPage,
            limit: itemsPerPage,
            sortBy: sortOrder
          })).unwrap();
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setFilterLoading(false);
      }
    };

    fetchData();
  }, [
    currentPage,
    itemsPerPage,
    sortOrder,
    filters.categories,
    filters.brands,
    filters.vehicleTypes,
    filters.departments,
    filters.minPrice,
    filters.maxPrice,
    name,
    dispatch
  ]);

  const handleSortOrderChange = async (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    dispatch(setCurrentPage(1));
  };

  const handleItemsPerPageChange = async (newItemsPerPage: number) => {
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(1));
  };

  // FIXED: Updated to properly dispatch Redux action
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const name = params.get("name");
    const category = params.get("category");
    const vehicleType = params.get("vehicleType");
    const brand = params.get("brand");

    const fetchInitialData = async () => {
      setFilterLoading(true);
      try {
        if (name && name.trim()) {
          dispatch(setCurrentPage(1));
          await dispatch(searchProducts({
            name: name.trim(),
            page: 1,
            limit: itemsPerPage,
            sortBy: sortOrder
          })).unwrap();
        } else if (category) {
          dispatch(setCurrentPage(1));
          await dispatch(fetchProductsByCategory({
            categoryId: category,
            page: 1,
            limit: itemsPerPage
          })).unwrap();

          setFilters(prev => ({
            ...prev,
            categories: [category]
          }));
        }
        else if (brand) { // NEW: Handle brand filter
          dispatch(setCurrentPage(1));
          setFilters(prev => ({
            ...prev,
            brands: [brand]
          }));

          // Fetch products with brand filter
          await dispatch(fetchProducts({
            brands: [brand],
            page: 1,
            limit: itemsPerPage,
            sortBy: sortOrder
          } as any)).unwrap();
        }
        else if (vehicleType) {
          dispatch(setCurrentPage(1));
          setFilters(prev => ({
            ...prev,
            vehicleTypes: [vehicleType]
          }));
        } else {
          await dispatch(fetchProducts({
            page: 1,
            limit: itemsPerPage,
            sortBy: sortOrder
          })).unwrap();
          await dispatch(fetchProductCount()).unwrap();
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setFilterLoading(false);
      }
    };

    fetchInitialData();
  }, [dispatch, search]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const category = params.get("category");

    if (category) {
      const newUrl = window.location.pathname + '?' + params.toString().replace(`category=${category}`, '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [search]);

  useEffect(() => {
    setActiveFilterText(generateFilterText(filters));
  }, [filters]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleOverlayClick = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const addToCart = (productId: string, quantity: number) => {
    dispatch(addProductToCart({ productId, quantity }))
      .unwrap()
      .then(() => {
      })
      .catch((error) => {
        console.error('Failed to add product to cart:', error);
      });
  };

  const handlePriceChange = ({
    minPrice,
    maxPrice,
  }: {
    minPrice: number;
    maxPrice: number;
  }): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice,
      maxPrice,
    }));
    dispatch(setCurrentPage(1)); // Reset to first page when price changes
  };

  const toggleSection = (section: SectionKey) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    dispatch(setCurrentPage(1)); // Reset to first page when filters change
  };

  const applyFilters = async () => {
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className="font-roboto">
      <div className="bg-gray-100 min-h-screen ">
        <div className="mx-auto p-4 bg-[#F9F9F9] relative">
          {(loading || filterLoading) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-700">Loading products...</p>
                {activeFilterText && (
                  <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
                    {activeFilterText}
                  </p>
                )}
               
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 relative min-h-[calc(100vh-200px)]">
            {isMobile && isFilterOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={handleOverlayClick}
              ></div>
            )}
            <div
              className={`
            ${isMobile ? "fixed left-0 top-0 h-full overflow-y-auto z-40 transition-transform duration-300 ease-in-out" : "md:sticky top-4 self-start h-fit max-h-screen overflow-y-auto"} 
            ${isMobile && !isFilterOpen ? "-translate-x-full" : "translate-x-0"}
            w-[350px]
        `}
              style={{
                width: isMobile ? "100%" : "30%",
                maxWidth: isMobile ? "100%" : "30%",
              }}
            >
              {isMobile && (
                <div className="flex justify-between items-center bg-white p-4 border-b">
                  <div className="flex items-center gap-4">
                    <button onClick={toggleFilter} className="text-gray-500">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <h2 className="font-semibold text-[20px]">Filter</h2>
                  </div>
                  <button
                    onClick={applyFilters}
                    className="text-[16px] text-primary font-semibold"
                  >
                    Apply Filter
                  </button>
                </div>
              )}

              <SidebarFilter
                filters={filters}
                handlePriceChange={handlePriceChange}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                selectedCategory={params.get("category")}
                onFilterChange={handleFilterChange}
              />
              {isMobile && (
                <div className="md:sticky bottom-0 p-4 bg-white border-t">
                  <button
                    onClick={applyFilters}
                    className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md focus:outline-none hover:bg-blue-800"
                  >
                    Apply Filter
                  </button>
                </div>
              )}
            </div>

            <ProductGrid
              products={products}
              viewType={viewType}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              itemsPerPage={itemsPerPage}
              sortOrder={sortOrder}
              setViewType={setViewType}
              setCurrentPage={handlePageChange}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
              cartLoading={cartLoading}
              isMobile={isMobile}
              setIsMobile={setIsMobile}
              toggleFilter={toggleFilter}
              isSortOpen={isSortOpen}
              setIsSortOpen={setIsSortOpen}
              setItemsPerPage={handleItemsPerPageChange}
              setSortOrder={handleSortOrderChange}
              filterLoading={filterLoading}
              setFilters={setFilters}
              activeFilterText={activeFilterText}
            />
          </div>
        </div>
      </div>
      <div className="hidden md:block mb-8">
        <Recents />
      </div>
      <div className="bg-[#FFC30026] rounded-md shadow-sm mb-6 block md:hidden">
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

        <div className="p-4 border-t border-gray-200">
          {["Maker", "Model", "Year", "Engine"].map((filter) => (
            <div key={filter} className="mb-4">
              <div className="relative">
                <select className="appearance-none bg-[#F3F3F3] text-[16px] w-full rounded-md p-4 pl-4 pr-8 text-gray-800 focus:outline-none border border-amber-100">
                  <option>{`Select ${filter}`}</option>
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
          ))}

          <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md focus:outline-none hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;