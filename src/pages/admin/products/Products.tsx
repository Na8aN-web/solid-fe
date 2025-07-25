import React from "react";
import { Search, Plus, ChevronDown, ArrowUpDown } from "lucide-react";
import ProductIcon from "../../../assets/productIcon.svg";
import carTyre from "../../../assets/tyres.svg";
import edit from "../../../assets/edit.svg";
import deLete from "../../../assets/delete.svg";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  product: string;
  productId: string;
  category: string;
  store: string;
  price: string;
  stock: string;
  image: string;
  status: "Active" | "Inactive";
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const products: Product[] = [
    {
      id: "1",
      product: "Michellene Tyre",
      productId: "2563823270",
      category: "Body Parts",
      store: "Solid Spare Parts",
      price: "₦250,000.00",
      stock: "20/250",
      image: carTyre,
      status: "Inactive",
    },
    {
      id: "2",
      product: "Michellene Tyre",
      productId: "2563823270",
      category: "Body Parts",
      store: "Solid Spare Parts",
      price: "₦250,000.00",
      stock: "20/250",
      image: carTyre,
      status: "Active",
    },
    {
      id: "3",
      product: "Michellene Tyre",
      productId: "2563823270",
      category: "Body Parts",
      store: "Solid Spare Parts",
      price: "₦250,000.00",
      stock: "20/250",
      image: carTyre,
      status: "Active",
    },
    {
      id: "4",
      product: "Michellene Tyre",
      productId: "2563823270",
      category: "Body Parts",
      store: "Solid Spare Parts",
      price: "₦250,000.00",
      stock: "20/250",
      image: carTyre,
      status: "Active",
    },
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#E1F1E0] text-[#15B70D]";
      case "Inactive":
        return "bg-[#F3F3F3] text-[#919191]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (id: string) => {
    console.log("Editing product with ID:", id);
    // Navigate to edit form or open modal
  };

  const handleDelete = (id: string) => {
    console.log("Deleting product with ID:", id);
    // Show confirm dialog or call API
  };
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
        <section className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Scrollable Filters */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide whitespace-nowrap">
              {/* Each filter group */}
              <div className="shrink-0">
                <label className="text-sm font-semibold text-[#2D2828] pb-2">
                  Category
                </label>
                <div className="relative w-[202px] h-[44px]">
                  <select className="w-full h-full bg-[#F8F8F8] px-2 pr-8 appearance-none rounded-[6px] text-sm font-normal text-customBrown">
                    <option value="">All Category</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <label className="text-sm font-semibold text-[#2D2828] pb-2">
                  Store
                </label>
                <div className="relative w-[202px] h-[44px]">
                  <select className="w-full h-full bg-[#F8F8F8] px-2 pr-8 appearance-none rounded-[6px] text-sm font-normal text-customBrown">
                    <option value="">Solid Spare Parts</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <label className="text-sm font-semibold text-[#2D2828] pb-2">
                  Price
                </label>
                <div className="relative w-[202px] h-[44px]">
                  <select className="w-full h-full bg-[#F8F8F8] px-2 pr-8 appearance-none rounded-[6px] text-sm font-normal text-customBrown">
                    <option value="">₦250K - ₦5M</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <label className="text-sm font-semibold text-[#2D2828] pb-2">
                  Status
                </label>
                <div className="relative w-[202px] h-[44px]">
                  <select className="w-full h-full bg-[#F8F8F8] px-2 pr-8 appearance-none rounded-[6px] text-sm font-normal text-customBrown">
                    <option value="">All Status</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>

            {/* Sort and Filter buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-[75px] h-[52px] bg-[#F8F8F8] flex items-center justify-center gap-1 rounded-[6px]">
                <ArrowUpDown className="text-primary w-[19px]" />
                <p className="text-primary font-semibold text-sm">Sort</p>
              </div>
              <div className="w-[75px] h-[52px] bg-[#F8F8F8] flex items-center justify-center gap-1 rounded-[6px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
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
            </div>
          </div>
        </section>

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
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b text-[#5E5E5E] last:border-b-0"
                >
                  <td className="p-4">
                    <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
                  </td>
                  <td className="p-4 text-sm flex items-center justify-start gap-4">
                    <div className="w-12 h-12 bg-[#FAF9F9] rounded-lg flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.product}
                        className="w-[26px]"
                      />
                    </div>
                    {product.product}
                  </td>
                  <td className="p-4 text-sm">{product.productId}</td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4 text-sm font-medium">{product.store}</td>
                  <td className="p-4 text-sm">{product.price}</td>
                  <td className="p-4 text-sm font-medium">{product.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-[4px] text-xs font-normal ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="w-[55px] h-[30px] bg-primary rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1"
                      >
                        <img src={edit} alt="" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="border border-[#E3E6EA] bg-white p-2 rounded-[8px]"
                      >
                        <img src={deLete} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
