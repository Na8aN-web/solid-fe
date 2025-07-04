import React, { useState } from "react";
import { Search, Plus, ChevronDown, ArrowUpDown } from "lucide-react";
import ProductIcon from "../../../assets/productIcon.svg";
import carTyre from "../../../assets/tyres.svg";
import edit from "../../../assets/edit.svg";
import deLete from "../../../assets/delete.svg";

interface Product {
  id: string;
  product: string;
  image: string;
  createdDate: string;
}

const products: Product[] = [
  {
    id: "1",
    product: "Michellene Tyre",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
  {
    id: "2",
    product: "Michellene Tyre",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
  {
    id: "3",
    product: "Michellene Tyre",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
  {
    id: "4",
    product: "Michellene Tyre",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
];

const productsBrand: Product[] = [
  {
    id: "1",
    product: "Michellene brand",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
  {
    id: "2",
    product: "Michellene brand",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
  {
    id: "3",
    product: "Michellene brand",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
  {
    id: "4",
    product: "Michellene Tyre",
    image: carTyre,
    createdDate: "25th July, 2024",
  },
];


const handleEdit = (id: string) => {
  console.log("Editing product with ID:", id);
};

const handleDelete = (id: string) => {
  console.log("Deleting product with ID:", id);
};

// product categories table
const Categories = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm bg-[#F8F8F8] text-gray-600 border-b">
            <th className="p-4">
              <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
            </th>
            <th className="p-4">Name</th>
            <th className="p-4">Created Date</th>
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
              <td className="p-4 text-sm">{product.createdDate}</td>

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
  );
};
// brands table
const Brands = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm bg-[#F8F8F8] text-gray-600 border-b">
            <th className="p-4">
              <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
            </th>
            <th className="p-4">Name</th>
            <th className="p-4">Created Date</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {productsBrand.map((product) => (
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
              <td className="p-4 text-sm">{product.createdDate}</td>

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
  );
};
// vehicles table
const Vehicles = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm bg-[#F8F8F8] text-gray-600 border-b">
            <th className="p-4">
              <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
            </th>
            <th className="p-4">Name</th>
            <th className="p-4">Created Date</th>
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
              <td className="p-4 text-sm">{product.createdDate}</td>

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
  );
};

const ProductCat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "brands" | "vehicles"
  >("categories");

  return (
    <div className="p-10">
      <section className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] w-[290px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            />
          </div>
        </div>
        <div>
          <button className="flex gap-2 justify-center items-center w-[182px] h-[48px] bg-[#003366] rounded-[6px] text-white text-[14px] font-semibold">
            <Plus />
            Add new Brand Name
          </button>
        </div>
      </section>
      <section className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <h2
            onClick={() => setActiveTab("categories")}
            className={`cursor-pointer ${
              activeTab === "categories"
                ? "text-sm bg-[#F3F3F3] p-2 rounded-[6px]"
                : "text-sm text-customBrown"
            }`}
          >
            Product Categories
          </h2>
          <h2
            onClick={() => setActiveTab("brands")}
            className={`cursor-pointer ${
              activeTab === "brands"
                ? "text-sm bg-[#F3F3F3] p-2 rounded-[6px]"
                : "text-sm text-customBrown"
            }`}
          >
            Brand Name
          </h2>
          <h2
            onClick={() => setActiveTab("vehicles")}
            className={`cursor-pointer ${
              activeTab === "vehicles"
                ? "text-sm bg-[#F3F3F3] p-2 rounded-[6px]"
                : "text-sm text-customBrown"
            }`}
          >
            Vehicle Types
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[75px] h-[52px] bg-[#F8F8F8] flex items-center justify-center gap-1 rounded-[6px]">
            <ArrowUpDown className="text-primary w-[19px]" />
            <p className="text-primary font-semibold text-sm">Sort</p>
          </div>
        </div>
      </section>
      {activeTab === "categories" && <Categories />}
      {activeTab === "brands" && <Brands />}
      {activeTab === "vehicles" && <Brands />}
    </div>
  );
};

export default ProductCat;
