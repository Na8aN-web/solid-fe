import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import ProductIcon from "../../../assets/productIcon.svg";
import edit from "../../../assets/edit.svg";
import deLete from "../../../assets/delete.svg";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchProducts,
  searchProducts,
  setCurrentPage,
} from "../../../store/slices/productSlice";
import {
  deleteProduct,
  fetchAllBrands,
  fetchAllCategories,
} from "../../../store/slices/adminDashboardSlice";
import ErrorButton from "../../../components/ErrorButton";
import LoaderSpinner from "../../../components/LoaderSpinner";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, error, currentPage, totalProducts } =
    useAppSelector((state) => state.products);

  const { categories, brands } = useAppSelector(
    (state) => state.adminDashboard
  );

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("-createdAt");

  const productsList = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);
  const itemsPerPage = 10;

  // Sort options
  const sortOptions = [
    { label: "Newest First", value: "-createdAt" },
    { label: "Oldest First", value: "createdAt" },
    { label: "Name Ascending", value: "name-asc" },
    { label: "Price Low to High", value: "price-asc" },
    { label: "Price High to Low", value: "price-desc" },
    { label: "Rating Descending", value: "rating-desc" },
  ];

  // filter options
  const categoryOptions = useMemo(
    () => [
      "All Category",
      ...(Array.isArray(categories) ? categories.map((cat) => cat.name) : []),
    ],
    [categories]
  );

  const brandOptions = useMemo(
    () => [
      "All Brands",
      ...(Array.isArray(brands) ? brands.map((brand) => brand.name) : []),
    ],
    [brands]
  );
  const statusOptions = ["All Status", "In Stock", "Out of Stock"];

  const filterOptions = [
    {
      label: "Category",
      options: categoryOptions,
      value: selectedCategory,
      onChange: setSelectedCategory,
    },
    {
      label: "Brand",
      options: brandOptions,
      value: selectedBrand,
      onChange: setSelectedBrand,
    },
    {
      label: "Status",
      options: statusOptions,
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
  ];

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { text: "Out of Stock", color: "bg-[#F3F3F3] text-[#919191]" };
    if (stock <= 20)
      return { text: "Low Stock", color: "bg-[#FFF3E0] text-[#FF8A00]" };
    return { text: "In Stock", color: "bg-[#E1F1E0] text-[#15B70D]" };
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();

        // Show success message
        alert("Product deleted successfully!");

        // Refresh current page after delete
        fetchProductsWithFilters();
      } catch (error: any) {
        console.error("Failed to delete product:", error);
        alert(`Failed to delete product: ${error.message || error}`);
      }
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(setCurrentPage(1));
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    dispatch(setCurrentPage(1));
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const hasMore = currentPage < totalPages;

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Function to fetch products with filters
  const fetchProductsWithFilters = () => {
    const filters: any = {
      page: currentPage,
      limit: itemsPerPage,
      sortBy: sortBy,
    };

    // Add category filter if selected
    if (selectedCategory !== "All Category") {
      const category = categories.find((cat) => cat.name === selectedCategory);
      if (category) {
        filters.categories = [category._id];
      }
    }

    // Add brand filter if selected
    if (selectedBrand !== "All Brands") {
      const brand = brands.find((b) => b.name === selectedBrand);
      if (brand) {
        filters.brands = [brand._id];
      }
    }

    // Search or fetch products
    if (searchTerm.trim()) {
      dispatch(
        searchProducts({
          name: searchTerm,
          ...filters,
        })
      );
    } else {
      dispatch(fetchProducts(filters));
    }
  };

  // Fetch categories and brands on mount
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllBrands());
  }, [dispatch]);

  // Fetch products when filters, page, search, or sort changes
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        fetchProductsWithFilters();
      },
      searchTerm ? 500 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [
    dispatch,
    currentPage,
    searchTerm,
    selectedCategory,
    selectedBrand,
    sortBy,
  ]);

  // Filter products by stock status on frontend
  const filteredProducts = React.useMemo(() => {
    if (selectedStatus === "All Status") return productsList;

    return productsList.filter((product) => {
      const stock = product.stock || product.quantity || 0;
      const status = getStockStatus(stock);

      if (selectedStatus === "In Stock") return status.text === "In Stock";
      if (selectedStatus === "Low Stock") return status.text === "Low Stock";
      if (selectedStatus === "Out of Stock")
        return status.text === "Out of Stock";

      return true;
    });
  }, [productsList, selectedStatus]);


  // Calculate display range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalProducts);

  return (
    <AdminLayout pageTitle="">
      <div className="">
        {/* Header Section */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Products</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button
                className="flex gap-2 justify-center items-center px-4 py-2 md:min-w-[175px] md:min-h-[50px] bg-[#003366] rounded-[6px] text-white text-sm font-medium hover:bg-[#002244] transition-colors"
                onClick={() => navigate("/admin/add-product")}
              >
                <Plus />
                Add new Product
              </button>
              <button
                className="flex gap-2 justify-center items-center px-4 py-3 md:min-w-[175px] md:min-h-[50px] text-[#003366] border border-[#003366] rounded-[6px] bg-white text-sm font-medium hover:bg-gray-50 transition-colors"
                onClick={() => navigate("/admin/product-category")}
              >
                <img src={ProductIcon} alt="" />
                Product Category
              </button>
            </div>
          </div>
        </section>

        {/* Filters and Sort */}
        <div className="mb-4">
          <FilterSection
            filters={filterOptions}
            sortOptions={sortOptions}
            currentSort={sortBy}
            onSortChange={handleSortChange}
            showFilterButton={false}
          />
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "All Category" ||
          selectedBrand !== "All Brands" ||
          selectedStatus !== "All Status") && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedCategory !== "All Category" && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All Category")}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {selectedBrand !== "All Brands" && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Brand: {selectedBrand}
                <button
                  onClick={() => setSelectedBrand("All Brands")}
                  className="hover:text-green-900"
                >
                  ×
                </button>
              </span>
            )}
            {selectedStatus !== "All Status" && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Status: {selectedStatus}
                <button
                  onClick={() => setSelectedStatus("All Status")}
                  className="hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCategory("All Category");
                setSelectedBrand("All Brands");
                setSelectedStatus("All Status");
              }}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Table with Loading Overlay */}
        <div className="relative">
          {loading && filteredProducts.length > 0 && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003366]"></div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm bg-[#F8F8F8] text-gray-600 border-b">
                  <th className="p-4">
                    <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
                  </th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Product Id</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && filteredProducts.length === 0 && (
                    <tr><td colSpan={8} className="p-4"><LoaderSpinner txt="Pruducts"/></td></tr>
                )}
                  {error && filteredProducts.length === 0 && (
                    <tr><td colSpan={8} className="p-4"><ErrorButton  error={error} fetch={fetchProductsWithFilters}/></td></tr>
                    // <ErrorButton />
                )}
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const currentStock = product.stock || product.quantity || 0;
                    const stockStatus = getStockStatus(currentStock);

                    return (
                      <tr
                        key={product._id}
                        className="border-b text-[#5E5E5E] last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#FAF9F9] rounded-lg flex items-center justify-center flex-shrink-0">
                              <img
                                src={product.image || ProductIcon}
                                alt={product.name}
                                className="w-[36px] h-[36px] object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    ProductIcon;
                                }}
                              />
                            </div>
                            <span className="line-clamp-2">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-mono">
                          {product._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="p-4 text-sm">
                          {product.categoryName || product.category || "N/A"}
                        </td>
                        <td className="p-4 text-sm font-medium">
                          {product.brandName || product.maker || "N/A"}
                        </td>
                        <td className="p-4 text-sm">
                          ₦{(product.displayPrice || 0).toLocaleString()}
                        </td>
                        <td className="p-4 text-sm font-medium">
                          {currentStock}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-[4px] text-xs font-normal whitespace-nowrap ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="w-[55px] h-[30px] bg-[#003366] rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1 hover:bg-[#002244] transition-colors"
                            >
                              <img src={edit} alt="" className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              disabled={loading}
                              className="border border-[#E3E6EA] bg-white p-2 rounded-[8px] hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <img src={deLete} alt="" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-12 text-gray-500">
                      <div className="flex flex-col items-center">
                        <img
                          src={ProductIcon}
                          alt=""
                          className="w-16 h-16 opacity-50 mb-4"
                        />
                        <p className="text-lg font-medium mb-1">
                          {searchTerm ||
                          selectedCategory !== "All Category" ||
                          selectedBrand !== "All Brands" ||
                          selectedStatus !== "All Status"
                            ? "No products found matching your filters"
                            : "No products found"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {searchTerm ||
                          selectedCategory !== "All Category" ||
                          selectedBrand !== "All Brands" ||
                          selectedStatus !== "All Status"
                            ? "Try adjusting your filters"
                            : "Add your first product to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalProducts > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
                className={`w-8 h-8 flex items-center justify-center border rounded text-sm transition-colors ${
                  currentPage === 1 || loading
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-2 text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      disabled={loading}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-[#003366] text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}

              <button
                onClick={handleNextPage}
                disabled={!hasMore || loading}
                className={`w-8 h-8 flex items-center justify-center border rounded text-sm transition-colors ${
                  !hasMore || loading
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center mt-2 text-sm text-gray-600">
              Showing {startItem}-{endItem} of {totalProducts} products
              {(selectedCategory !== "All Category" ||
                selectedBrand !== "All Brands" ||
                selectedStatus !== "All Status") &&
                " (filtered)"}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Products;
