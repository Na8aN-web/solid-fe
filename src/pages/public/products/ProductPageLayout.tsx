import { useState, useEffect } from "react";
import SidebarFilter from "./components/SidebarFilter";
import ProductGrid from "./components/ProductGrid";
import Recents from "./components/Recents";
import { fetchProductCount, searchProducts } from "../../../store/slices/productSlice";
import {
  fetchProducts,
  toggleFavorite,
  setItemsPerPage,
  setCurrentPage,
} from "../../../store/slices/productSlice";
import { addProductToCart } from "../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useLocation } from "react-router-dom";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   maker: string;
//   model: string;
//   year: string;
//   price: number;
//   salePrice: number;
//   image: string;
//   description: string;
//   reviews: number;
//   rating: number;
//   discount: number;
//   favorite: boolean;
// }

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
  // Add this new state variable
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const name = params.get("name");
  const dispatch = useAppDispatch();
  const { loading: cartLoading } = useAppSelector((state) => state.cart);
  const { products, loading, error, currentPage, itemsPerPage, totalProducts } =
    useAppSelector((state) => state.products);



  useEffect(() => {
    if (name && name.trim()) {
      dispatch(setCurrentPage(1));                // ensure page 1 on a new query
      dispatch(searchProducts({ name: name.trim() }));
    } else {
      dispatch(fetchProducts());
      dispatch(fetchProductCount());
    }
  }, [dispatch, name]);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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
  const [sortOrder, setSortOrder] = useState("Alphabetical Order");
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'list'
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    department: true,
    vehicleType: true,
    brand: true,
  });

  // Toggle filter sidebar visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Close filter sidebar when clicking outside
  const handleOverlayClick = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  };

  // Handler for toggling favorite
  // const toggleFavorite = (id: number) => {
  //     setProducts(products.map(product =>
  //         product.id === id ? { ...product, favorite: !product.favorite } : product
  //     ));
  // };

  // Calculate pagination values
  // const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

const addToCart = (productId: string) => {
  console.log('Adding to cart, productId:', productId, 'Type:', typeof productId);
  
  if (!productId) {
    console.error('Product ID is undefined or empty');
    return;
  }

  dispatch(
    addProductToCart({
      productId,
      quantity: 1,
    })
  ).then((result) => {
    if (addProductToCart.fulfilled.match(result)) {
      console.log(`Added product ${productId} to cart successfully`);
    } else {
      console.error('Failed to add to cart:', result.payload);
    }
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
  };

  const toggleSection = (section: SectionKey) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className="font-roboto">
      <div className="bg-gray-100 min-h-screen ">
        {/* Navigation bar. */}
        {/* <nav className="bg-[#F5F5F5] p-4 border-b hidden md:block">
                    <div className="mx-auto flex items-center">
                        <div className="flex space-x-6 ml-[50px]">
                            <a href="#" className="text-gray-500 hover:text-gray-700">Home</a>
                            <img src="/arrow-right.svg" alt="arrow facing right" />
                            <a href="#" className="text-gray-900 font-semibold">Products</a>
                        </div>
                    </div>
                </nav> */}

        <div className="mx-auto p-4 bg-[#F9F9F9] relative">
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
                  <p className="text-[16px] text-primary font-semibold">
                    Apply Filter
                  </p>
                </div>
              )}

              <SidebarFilter
                filters={filters}
                handlePriceChange={handlePriceChange}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
              />
              {/* Apply Button for Mobile */}
              {isMobile && (
                <div className="md:sticky hidden bottom-0 p-4 bg-white border-t">
                  <button
                    onClick={applyFilters}
                    className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md focus:outline-none hover:bg-blue-800"
                  >
                    Apply Filter
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid Component */}
            <ProductGrid
              products={currentProducts}
              viewType={viewType}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              itemsPerPage={itemsPerPage}
              sortOrder={sortOrder}
              setViewType={setViewType}
              setItemsPerPage={setItemsPerPage}
              setSortOrder={setSortOrder}
              setCurrentPage={setCurrentPage}
              toggleFavorite={toggleFavorite}
              addToCart={addToCart}
              cartLoading={cartLoading}
              isMobile={isMobile}
              setIsMobile={setIsMobile}
              toggleFilter={toggleFilter}
              isSortOpen={isSortOpen}
              setIsSortOpen={setIsSortOpen}
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

        {/* Dropdown filters */}
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

          {/* Search button */}
          <button className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-md focus:outline-none hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;
