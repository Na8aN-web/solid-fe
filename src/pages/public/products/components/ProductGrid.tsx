import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import SortSidebar from "./SortSidebar";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate import
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addProductToCart, updateCartProductData } from "../../../../store/slices/cartSlice";
import { FilterState } from "../ProductPageLayout";
import SuccessModal from "../../../../components/SuccessModal";

interface Product {
  _id: string;
  name: string;
  category: string;
  maker: string;
  model: string;
  year: string;
  price: number;
  displayPrice: number;
  image: string;
  description: string;
  numReviews: number;
  rating: number;
  discount: number;
  favorite: boolean;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
  productName?: string;
}

interface ProductGridProps {
  products: Product[];
  viewType: string;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  itemsPerPage: number;
  sortOrder: string;
  setViewType: (type: string) => void;
  setItemsPerPage: (count: number) => void;
  setSortOrder: (order: string) => void;
  setCurrentPage: (page: number) => void;
  toggleFavorite: (id: string) => void;
  addToCart: (productId: string, quantity: number) => void;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFilter: () => void;
  isSortOpen: boolean;
  setIsSortOpen: (isOpen: boolean) => void;
  cartLoading: boolean;
  filterLoading?: boolean;
  setFilters: (filters: FilterState) => void;
  activeFilterText?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewType,
  currentPage,
  totalPages,
  totalProducts,
  itemsPerPage,
  sortOrder,
  setViewType,
  setItemsPerPage,
  setSortOrder,
  setCurrentPage,
  toggleFavorite,
  toggleFilter,
  isMobile,
  setIsMobile,
  addToCart,
  isSortOpen,
  setIsSortOpen,
  cartLoading,
  activeFilterText,
  setFilters,
  filterLoading,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ id: string, name: string } | null>(null);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);
  const navigate = useNavigate(); // Add useNavigate hook

  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [setIsMobile]);

  useEffect(() => {
    // When products are loaded, update cart items with full product data
    if (products.length > 0 && cart && cart.products) {
      let hasUpdated = false;

      products.forEach(product => {
        const cartItem = cart.products.find(item => item.product._id === product._id);
        if (cartItem && (!cartItem.product.name || cartItem.product.name === 'Product' || !cartItem.product.salesPrice)) {
          // Update cart item with full product data
          dispatch(updateCartProductData({
            productId: product._id,
            productData: {
              name: product.name,
              images: [product.image],
              salesPrice: product.displayPrice,
              stockStatus: 'In Stock',
              brand: {
                _id: product.maker || 'unknown',
                name: product.maker || 'Unknown'
              }
            }
          }));
          hasUpdated = true;
        }
      });
    }
  }, [products, cart, dispatch]);

  const handleAddToCart = async (productId: string, productName: string) => {
    // Find the complete product
    const product = products.find(p => p._id === productId);

    if (!product) {
      console.error('Product not found');
      return;
    }

    // Prepare full product data with consistent structure
    const productData = {
      _id: product._id,
      name: product.name,
      images: [product.image],
      salesPrice: product.displayPrice || product.price,
      displayPrice: product.displayPrice || product.price,
      regularPrice: product.price,
      stockStatus: 'In Stock',
      brand: {
        _id: product.maker || 'unknown',
        name: product.maker || 'Unknown'
      },
      maker: product.maker || 'Unknown'
    };

    try {
      setAddingProductId(productId);
      await dispatch(addProductToCart({
        productId,
        quantity: 1,
        productData
      })).unwrap();

      // Show success modal
      setLastAddedProduct({ id: productId, name: productName });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    } finally {
      setAddingProductId(null);
    }
  }

  const handleViewCart = () => {
    setShowSuccessModal(false);
    // Use React Router navigation instead of window.location.href
    navigate('/cart');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setLastAddedProduct(null);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage); // This will trigger the API call
  };

  // NEW: Handler for sort order change
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };


  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full md:w-3/4">
      {activeFilterText && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex justify-between items-center">
          <p className="text-blue-700 text-sm">{activeFilterText}</p>
          <button
            onClick={() => {
              // Reset all filters to their default state
              setFilters({
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
              setSortOrder("");
              // Use the prop directly instead of dispatch
              setCurrentPage(1);
            }}
            className="ml-4 px-3 py-1 bg-white text-blue-700 border border-blue-300 rounded-md text-sm hover:bg-blue-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}


      <div className="bg-white rounded-md shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section */}
          <div className="flex flex-col space-y-6 w-full">
            <h1 className="text-[20px] font-semibold">Products</h1>

            {/* Icons */}
            <div className="flex items-center space-x-2">
              <div className="inline-flex">
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 border ${viewType === "list" ? "bg-primary" : "bg-[#D9D9D9]"} rounded-l-lg`}
                >
                  <img
                    src={`${viewType === "list" ? "/list2.png" : "/list1.png"}`}
                    alt="list"
                  />
                </button>
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 border ${viewType === "grid" ? "bg-primary" : "bg-[#D9D9D9]"} rounded-r-lg`}
                >
                  <img
                    src={`${viewType === "grid" ? "/grid1.png" : "/grid2.png"}`}
                    alt="grid"
                  />
                </button>
              </div>
            </div>

            {/* Filter Button Below Icons */}
            {isMobile && (
              <div className="flex flex-row gap-4 w-full mt-2">
                <div className="flex-1">
                  <button
                    onClick={toggleFilter}
                    className="w-full bg-white text-primary border border-primary px-4 py-2 rounded-md flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Filter
                  </button>
                </div>

                <div className="flex-1">
                  <button
                    onClick={() => setIsSortOpen(true)}
                    className="w-full bg-white text-primary border border-primary px-4 py-2 rounded-md flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                    Sort
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Sorting Controls */}
          <div className="md:flex hidden flex-row flex-nowrap sm:space-x-8 items-center font-roboto">
            <div className="flex items-center justify-between w-[200px]">
              <div className="text-sm text-gray-600 mr-2">Show</div>
              <select
                className="border border-black rounded-[10px] px-4 py-2 text-sm"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange} // Updated: Use new handler
              >
                <option value={10}>Default</option>
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
              </select>
              <div className="text-sm text-gray-600 ml-2">products per page</div>
            </div>

            <div className="flex items-center w-[250px]">
              <span className="text-sm text-gray-600 mr-2">Sort By</span>
              <select
                className="border border-black rounded-[10px] px-4 py-2 text-sm"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="">Default</option>
                <option value="name-asc">Alphabetical Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {products.length === 0 && !filterLoading ? (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 max-w-md mb-4">
            {activeFilterText
              ? `No products match your current filters. Try adjusting your filter criteria.`
              : "No products are currently available. Please check back later."}
          </p>
          {activeFilterText && (
            <button
              onClick={() => {
                // Use React Router navigation instead of window.location.href
                navigate(window.location.pathname);
              }}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div
          className={`grid ${viewType === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"} gap-4`}
        >
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div
                className={`bg-white rounded-[20px] hover:shadow-[0px_4px_4px_4px_rgba(0,0,0,0.15)] ${viewType === "list" ? "p-4" : "p-2"} overflow-hidden`}
              >
                <div className="relative">
                  {/* Discount tag */}
                  <div
                    className={`absolute ${viewType === "grid" ? "top-2 left-2" : "top-2 left-2"} bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold">
                      {product.discount}%
                    </span>
                  </div>

                  {/* Favorite button - Moved to top right for both views as shown in reference image 2 */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(product._id);
                    }}
                    className="absolute top-2 right-2 bg-transparent"
                  >
                    <svg
                      className={`w-5 h-5 ${product.favorite ? "text-primary fill-current" : "text-primary fill-transparent"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`${viewType === "list" ? "flex flex-row gap-4 items-start" : ""}`}
                >
                  <div
                    className={`${viewType === "list" ? "flex-shrink-0 w-1/3" : ""} p-2`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`${viewType === "list" ? "max-w-none w-full h-auto" : "w-full h-32 object-contain"} mx-auto`}
                    />
                  </div>

                  <div className={`${viewType === "list" ? "flex-1" : ""} p-2`}>
                    <div className="text-[10px] text-[#9A9A9A] uppercase mb-1">
                      BODY PARTS
                    </div>
                    <h3 className="text-sm font-semibold text-[#2D2828] mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                      <span className="text-xs text-[#827E7E] ml-1">
                        ({product.numReviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-[#2D2828]">
                        ₦{product.displayPrice?.toLocaleString()}
                      </span>
                      {product.price > product.displayPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          ₦{product.price?.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {viewType === "list" && (
                      <div className="text-[12px] my-2 text-[#919191]">
                        Designed for ultimate comfort and durability, featuring
                        all adjustable, a...
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product._id, product.name);
                      }}
                      disabled={cartLoading && addingProductId === product._id}
                      className={`w-full flex items-center justify-center py-2 px-4 rounded transition text-sm mt-2 ${cartLoading && addingProductId === product._id
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-blue-700"
                        }`}
                    >
                      {cartLoading && addingProductId === product._id ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Adding...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          Add to cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onViewCart={handleViewCart}
        productName={lastAddedProduct?.name}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}

      />

      <SortSidebar
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onApply={() => {
          // Apply sorting logic here if needed
          setIsSortOpen(false);
        }}
      />
    </div>
  );
};

export default ProductGrid;