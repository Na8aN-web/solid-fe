import React, { useState, useEffect } from "react";
import { Search, Plus, ArrowLeft, ArrowUpDown } from "lucide-react";
import edit from "../../../../assets/edit.svg";
import deLete from "../../../../assets/delete.svg";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import AddNewProductCategory from "../components/AddNewProductCategory";
import AddNewProductBrand from "../components/AddNewProductBrand";
import AddNewVehicleType from "../components/AddNewVehicleType";
import AddNewDepartment from "../components/AddNewDepartment";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  fetchAllCategories,
  fetchAllBrands,
  fetchAllVehiclesType,
  fetchAllDepartments,
  ProductCategory,
  deleteProductCategory,
  ProductBrand,
  ProductVehicleType,
  deleteProductBrand,
  deleteProductVehicleType,
  ProductDepartment,
  deleteProductDepartment,
} from "../../../../store/slices/adminDashboardSlice";


const handleEdit = (id: string) => {
  console.log("Editing product with ID:", id);
};

const handleDelete = (id: string) => {
  console.log("Deleting product with ID:", id);
};

// product categories table
const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (s) => s.adminDashboard
  );
  const [editCategory, setEditCategory] = useState<ProductCategory | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // if (loading.getCategories) return <p>Loading...</p>;
  // if (error.getCategories) return <p>{error.getCategories}</p>;
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
          {categories.map((cat) => (
            <tr
              key={cat._id}
              className="border-b text-[#5E5E5E] last:border-b-0"
            >
              <td className="p-4">
                <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
              </td>
              <td className="p-4 text-sm">{cat.name}</td>
              <td className="p-4 text-sm">
                {cat.createdAt
                  ? new Date(cat.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setEditCategory(cat)}
                    className="w-[55px] h-[30px] bg-primary rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1"
                  >
                    <img src={edit} alt="" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(cat._id)}
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
      {/* EDIT category modal (reuses Add modal) */}
      {editCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <AddNewProductCategory
            onClose={() => setEditCategory(null)}
            // AddNewProductCategory to accept an optional `category` prop
            category={editCategory}
          />
        </div>
      )}

      {/* DELETE confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[360px]">
            <h3 className="text-lg font-semibold mb-2">Delete Category?</h3>
            <p className="text-sm text-gray-600 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 h-9 rounded border"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 h-9 rounded bg-red-600 text-white"
                onClick={async () => {
                  try {
                    // import from slice:
                    // import { deleteProductCategory } from "../../../../store/slices/adminDashboardSlice";
                    await dispatch(deleteProductCategory(deleteId!)).unwrap();
                    setDeleteId(null);
                  } catch (e) {
                    console.error("Delete failed:", e);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// brands table
const Brands = () => {
  const dispatch = useAppDispatch();
  const { brands, loading, error } = useAppSelector((s) => s.adminDashboard);

  const [editBrand, setEditBrand] = useState<ProductBrand | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [dispatch]);

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
          {brands.map((brand) => (
            <tr
              key={brand._id}
              className="border-b text-[#5E5E5E] last:border-b-0"
            >
              <td className="p-4">
                <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
              </td>
              <td className="p-4 text-sm">{brand.name}</td>
              <td className="p-4 text-sm">
                {brand.createdAt
                  ? new Date(brand.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setEditBrand(brand)}
                    className="w-[55px] h-[30px] bg-primary rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1"
                  >
                    <img src={edit} alt="" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(brand._id)}
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
      {/* EDIT brand modal (reuses Add modal) */}
      {editBrand && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <AddNewProductBrand
            onClose={() => setEditBrand(null)}
            // AddNewProductCategory to accept an optional `category` prop
            brand={editBrand}
          />
        </div>
      )}

      {/* DELETE confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[360px]">
            <h3 className="text-lg font-semibold mb-2">Delete Brand?</h3>
            <p className="text-sm text-gray-600 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 h-9 rounded border"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 h-9 rounded bg-red-600 text-white"
                onClick={async () => {
                  try {
                    await dispatch(deleteProductBrand(deleteId!)).unwrap();
                    setDeleteId(null);
                  } catch (e) {
                    console.error("Delete failed:", e);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// vehicles table
const Vehicles = () => {
  const dispatch = useAppDispatch();
  const { vehicles, loading, error } = useAppSelector((s) => s.adminDashboard);

  const [editVehicle, setEditVehicle] = useState<ProductVehicleType | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllVehiclesType());
  }, [dispatch]);

  // const list = Array.isArray(vehicles) ? vehicles.filter(Boolean) : [];
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
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle._id}
              className="border-b text-[#5E5E5E] last:border-b-0"
            >
              <td className="p-4">
                <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
              </td>
              <td className="p-4 text-sm">{vehicle.name}</td>
              <td className="p-4 text-sm">
                {vehicle.createdAt
                  ? new Date(vehicle.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setEditVehicle(vehicle)}
                    className="w-[55px] h-[30px] bg-primary rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1"
                  >
                    <img src={edit} alt="" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(vehicle._id)}
                    className="border border-[#E3E6EA] bg-white p-2 rounded-[8px]"
                  >
                    <img src={deLete} alt="" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {vehicles.length === 0 && (
            <tr>
              <td className="p-4 text-sm text-gray-500" colSpan={4}>
                No vehicles yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* EDIT vehicle modal (reuses Add modal) */}
      {editVehicle && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <AddNewVehicleType
            onClose={() => setEditVehicle(null)}
            // AddNewProductCategory to accept an optional `category` prop
            vehicle={editVehicle}
          />
        </div>
      )}

      {/* DELETE confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[360px]">
            <h3 className="text-lg font-semibold mb-2">Delete Vehicle?</h3>
            <p className="text-sm text-gray-600 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 h-9 rounded border"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 h-9 rounded bg-red-600 text-white"
                onClick={async () => {
                  try {
                    await dispatch(
                      deleteProductVehicleType(deleteId!)
                    ).unwrap();
                    setDeleteId(null);
                  } catch (e) {
                    console.error("Delete failed:", e);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Departments = () => {
  const dispatch = useAppDispatch();
  const { departments, loading, error } = useAppSelector((s) => s.adminDashboard);
  

  const [editDepartment, setEditDepartment] = useState<ProductDepartment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, [dispatch]);

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
          {departments.map((department) => (
            <tr
              key={department._id}
              className="border-b text-[#5E5E5E] last:border-b-0"
            >
              <td className="p-4">
                <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
              </td>
              <td className="p-4 text-sm">{department.name}</td>
              <td className="p-4 text-sm">
                {department.createdAt
                  ? new Date(department.createdAt).toLocaleDateString()
                  : "—"}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setEditDepartment(department)}
                    className="w-[55px] h-[30px] bg-primary rounded-[6px] text-white flex items-center justify-center text-xs font-semibold gap-1"
                  >
                    <img src={edit} alt="" /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(department._id)}
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

      {/* EDIT department modal (reuses Add modal) */}
      {editDepartment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <AddNewDepartment
            onClose={() => setEditDepartment(null)}
            department={editDepartment}
          />
        </div>
      )}

      {/* DELETE confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[360px]">
            <h3 className="text-lg font-semibold mb-2">Delete Department?</h3>
            <p className="text-sm text-gray-600 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 h-9 rounded border"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 h-9 rounded bg-red-600 text-white"
                onClick={async () => {
                  try {
                    await dispatch(deleteProductDepartment(deleteId!)).unwrap();
                    setDeleteId(null);
                  } catch (e) {
                    console.error("Delete failed:", e);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



type Tab = "categories" | "brands" | "vehicles" | "departments";

const ProductCat: React.FC = () => {
  const [openModalFor, setOpenModalFor] = useState<Tab | null>(null);
  const navigate = useNavigate();
  const filters: Array<{ label: string; value: Tab }> = [
    { label: "Product Categories", value: "categories" },
    { label: "Brands", value: "brands" },
    { label: "Vehicles", value: "vehicles" },
    { label: "Departments", value: "departments" },
  ];

  const [activeTab, setActiveTab] = useState<Tab>("categories");

  const addLabel =
    activeTab === "categories"
      ? "Add new Product Category"
      : activeTab === "brands"
        ? "Add new Brand"
        : "Add new Vehicle Type";

  const handleAddClick = () => setOpenModalFor(activeTab);

  return (
    <AdminLayout pageTitle="">
      <div className="p-10">
        <section className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-8">
            <div className="flex gap-2 items-center text-xl font-semibold text-customBrown mb-8">
              <button onClick={() => navigate("/admin/products")}>
                <ArrowLeft />
              </button>
              <h1>
                {activeTab === "categories"
                  ? "Product Categories"
                  : activeTab === "brands"
                    ? "Brands"
                    : activeTab === "vehicles"
                      ? "Vehicles"
                    : "Departments"}
              </h1>
            </div>
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
            <button
              className="flex gap-2 justify-center items-center px-2 h-[48px] bg-[#003366] rounded-[6px] text-white text-[14px] font-semibold"
              onClick={handleAddClick}
            >
              <Plus />
              {addLabel}
            </button>
          </div>
        </section>
        {/* {openMenu && <AddNewProductCategory />} */}
        {openModalFor === "categories" && (
          <AddNewProductCategory onClose={() => setOpenModalFor(null)} />
        )}
        {openModalFor === "brands" && (
          <AddNewProductBrand onClose={() => setOpenModalFor(null)} />
        )}
        {openModalFor === "vehicles" && (
          <AddNewVehicleType onClose={() => setOpenModalFor(null)} />
        )}
         {openModalFor === "departments" && (
          <AddNewDepartment onClose={() => setOpenModalFor(null)} />
        )}

        <section className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`px-4 py-2 text-sm font-medium rounded-[6px] transition-colors ${
                  activeTab === value
                    ? "bg-[#003366] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
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
        {activeTab === "vehicles" && <Vehicles />}
        {activeTab === "departments" && <Departments />}
      </div>
    </AdminLayout>
  );
};

export default ProductCat;
