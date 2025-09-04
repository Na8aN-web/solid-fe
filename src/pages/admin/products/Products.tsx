import React, {useEffect} from "react";
import { Search, Plus, ChevronDown, ArrowUpDown } from "lucide-react";
import ProductIcon from "../../../assets/productIcon.svg";
import carTyre from "../../../assets/tyres.svg";
import edit from "../../../assets/edit.svg";
import deLete from "../../../assets/delete.svg";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteProduct, fetchAllProducts, type Product  } from "../../../store/slices/adminDashboardSlice";

// interface Product {
//   id: string;
//   product: string;
//   productId: string;
//   category: string;
//   store: string;
//   price: string;
//   stock: string;
//   image: string;
//   status: "Active" | "Inactive";
// }

const Products: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.adminDashboard);

  const filterOptions = [
    { label: "Category", options: ["All Category", "Engine", "Brakes"] },
    { label: "Store", options: ["Solid Spare Parts", "AutoHub"] },
    { label: "Price", options: ["₦250K - ₦5M", "₦5M - ₦10M"] },
    { label: "Status", options: ["All Status", "Available", "Out of Stock"] },
  ];
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-[#F3F3F3] text-[#919191]" };
    if (stock <= 20) return { text: "Low Stock", color: "bg-[#FFF3E0] text-[#FF8A00]" };
    return { text: "In Stock", color: "bg-[#E1F1E0] text-[#15B70D]" };
  };

  const handleEdit = (id: string) => {
    console.log("Editing product with ID:", id);
    // Navigate to edit product page
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id: string) => {
 
  };


  useEffect(() => {
    dispatch(fetchAllProducts());
    console.log(products);
    
  }, [dispatch]);

  return (
    <AdminLayout pageTitle="">
      <div className="">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button
                className="flex gap-2 justify-center items-center px-4 py-2 md:min-w-[175px] md:min-h-[50px] bg-[#003366] rounded-[6px] text-white text-sm font-medium"
                onClick={() => navigate("/admin/add-product")}
              >
                <Plus />
                Add new Product
              </button>
              <button
                className="flex gap-2 justify-center items-center px-4 py-3 md:min-w-[175px] md:min-h-[50px] text-[#003366] border border-[#003366] rounded-[6px] bg-white text-sm font-medium"
                onClick={() => navigate("/admin/product-category")}
              >
                <img src={ProductIcon} alt="" />
                Product Category
              </button>
            </div>
          </div>
        </section>
        
        <div>
          <FilterSection filters={filterOptions} />
        </div>

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
                <th className="p-4">Store</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product) => {
                const currentStock = product.stock || product.quantity || 0;
                const stockStatus = getStockStatus(currentStock);
                
                if (loading.products) return <div>Loading...</div>;
                if (error.products) return <div>Error: {error.products}</div>;
                
                return (
                <tr
                key={product._id}
                  className="border-b text-[#5E5E5E] last:border-b-0"
                >
                  <td className="p-4">
                    <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
                  </td>
                  <td className="p-4 text-sm flex items-center justify-start gap-4">
                    <div className="w-12 h-12 bg-[#FAF9F9] rounded-lg flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[26px]"
                      />
                    </div>
                    {product.name}
                  </td>
                  <td className="p-4 text-sm">{product._id.slice(-8).toUpperCase()}</td>
                    <td className="p-4 text-sm">{product.categoryName}</td>
                    <td className="p-4 text-sm font-medium">{product.brandName}</td>
                    <td className="p-4 text-sm">₦{product.displayPrice.toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium">{currentStock}</td>
                  <td className="p-4">
                  <span
                        className={`px-2 py-1 rounded-[4px] text-xs font-normal ${stockStatus.color}`}
                      >
                      {stockStatus.text}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="w-[55px] h-[30px] bg-primary rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1"
                      >
                        <img src={edit} alt="" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="border border-[#E3E6EA] bg-white p-2 rounded-[8px]"
                      >
                        <img src={deLete} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
               );
              })}
            </tbody>
          </table>
        </div>

         {/* Empty state */}
         {products.length === 0 && !loading.products && (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-4">
              <img src={ProductIcon} alt="" className="mx-auto w-16 h-16 opacity-50" />
            </div>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Add your first product to get started</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#003366] text-white rounded text-sm font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            &gt;
          </button>
        </div>
        <div className="text-center mt-2 text-sm text-gray-600">
          1-12 of 18 Products
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
