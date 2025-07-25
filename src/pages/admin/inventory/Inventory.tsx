import React from "react";
import { Search, ChevronDown, ArrowUpDown, Bell } from "lucide-react";
import carTyre from "../../../assets/tyres.svg";
import AdminLayout from "../components/AdminLayout";

interface InventoryItem {
  id: string;
  productName: string;
  sales: string;
  revenue: string;
  price: string;
  stock: string;
  image: string;
  status: "In stock" | "Out of stock" | "Low stock";
}

const Inventory: React.FC = () => {
  const inventory: InventoryItem[] = [
    {
      id: "1",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "650/560",
      image: carTyre,
      status: "In stock",
    },
    {
      id: "2",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "450/560",
      image: carTyre,
      status: "In stock",
    },
    {
      id: "3",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "0/560",
      image: carTyre,
      status: "Out of stock",
    },
    {
      id: "4",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "20/560",
      image: carTyre,
      status: "Low stock",
    },
    {
      id: "5",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "0/560",
      image: carTyre,
      status: "Out of stock",
    },
    {
      id: "6",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "20/560",
      image: carTyre,
      status: "Low stock",
    },
    {
      id: "7",
      productName: "Michellene Tyre",
      sales: "127 pcs",
      revenue: "₦42,000.00",
      price: "₦250,000.00",
      stock: "400/560",
      image: carTyre,
      status: "In stock",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In stock":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      case "Out of stock":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      case "Low stock":
        return "bg-[#FFF3E0] text-[#F57C00]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActionButtons = (item: InventoryItem) => {
    if (item.status === "Out of stock" || item.status === "Low stock") {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]">
            Restock
          </button>
          <button className="px-3 py-1 bg-[#00336626] text-primary text-xs font-medium rounded-[4px] hover:bg-gray-50">
            Notify
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-[#6C757D] text-white text-xs font-medium rounded-[4px] hover:bg-[#5A6268]">
            Restock
          </button>
          <button className="px-3 py-1 bg-[#00336626] text-primary text-xs font-medium rounded-[4px] hover:bg-gray-50">
            Notify
          </button>
        </div>
      );
    }
  };

  const handleRestock = (id: string) => {
    console.log("Restocking item with ID:", id);
  };

  const handleNotify = (id: string) => {
    console.log("Notifying about item with ID:", id);
  };

  return (
    <AdminLayout pageTitle="">
      <div className="">
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for inventory..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button className="flex gap-2 justify-center items-center px-4 py-3 w-full min-w-[140px] bg-[#003366] rounded-[6px] text-white text-sm font-medium">
                <Bell className="w-4 h-4" />
                Notify Store
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Scrollable filter group */}
            <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <div className="shrink-0">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="relative w-[150px] h-[40px]">
                  <select className="w-full h-full bg-white px-3 pr-8 appearance-none rounded-[6px] text-sm border border-gray-300 text-gray-700">
                    <option value="">All Category</option>
                    <option value="Body Parts">Body Parts</option>
                    <option value="Engine Parts">Engine Parts</option>
                    <option value="Tyres">Tyres</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Store
                </label>
                <div className="relative w-[150px] h-[40px]">
                  <select className="w-full h-full bg-white px-3 pr-8 appearance-none rounded-[6px] text-sm border border-gray-300 text-gray-700">
                    <option value="">Solid Spare Parts</option>
                    <option value="Auto Parts Plus">Auto Parts Plus</option>
                    <option value="Premium Motors">Premium Motors</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <div className="relative w-[150px] h-[40px]">
                  <select className="w-full h-full bg-white px-3 pr-8 appearance-none rounded-[6px] text-sm border border-gray-300 text-gray-700">
                    <option value="">₦250K - ₦5M</option>
                    <option value="₦0 - ₦100K">₦0 - ₦100K</option>
                    <option value="₦100K - ₦500K">₦100K - ₦500K</option>
                    <option value="₦500K - ₦1M">₦500K - ₦1M</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="relative w-[150px] h-[40px]">
                  <select className="w-full h-full bg-white px-3 pr-8 appearance-none rounded-[6px] text-sm border border-gray-300 text-gray-700">
                    <option value="">All Status</option>
                    <option value="In stock">In stock</option>
                    <option value="Out of stock">Out of stock</option>
                    <option value="Low stock">Low stock</option>
                  </select>
                  <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sort and Filter buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-[6px] text-sm font-medium text-gray-700">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-[6px] text-sm font-medium text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
                </svg>
                Filter
              </button>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
                <th className="p-4">
                  <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                </th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Sales</th>
                <th className="p-4 font-medium">Revenue</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-6 h-6"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.productName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{item.sales}</td>
                  <td className="p-4 text-sm text-gray-700">{item.revenue}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {item.price}
                  </td>
                  <td className="p-4 text-sm text-gray-700">{item.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">{getActionButtons(item)}</td>
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

export default Inventory;
