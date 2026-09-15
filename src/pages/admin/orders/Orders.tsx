import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, Bell } from "lucide-react";
import ProductIcon from "../../../assets/productIcon.svg";
import AdminLayout from "../components/AdminLayout";
import FilterSection from "../components/FilterSection";
import Pagination from "../components/Pagination";
import { useToast } from "../../../components/Toast";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAdminOrders,
  updateOrderStatus,
  AdminOrder,
  OrderStatus,
} from "../../../store/slices/adminDashboardSlice";
import LoaderSpinner from "../../../components/LoaderSpinner";
import ErrorButton from "../../../components/ErrorButton";

const ORDER_STATUSES: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

// View-model so the table doesn't have to care whether user/product refs
// came back populated (objects) or as raw ObjectId strings.
type TableOrder = {
  id: string;
  orderRef: string;
  productName: string;
  extraItemsCount: number;
  buyerName: string;
  orderDate: string;
  orderAmount: string;
  image: string;
  status: OrderStatus;
};

const getBuyerName = (user: any): string => {
  if (!user) return "—";
  if (typeof user === "string") return user.slice(-8).toUpperCase();
  const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  return name || user.email || "—";
};

const getFirstProductName = (item: any): string => {
  const product = item?.product;
  if (!product) return "Product";
  if (typeof product === "string") return "Product";
  return product.name || "Product";
};

const getFirstProductImage = (item: any): string => {
  const product = item?.product;
  if (product && typeof product === "object" && Array.isArray(product.images)) {
    return product.images[0] || ProductIcon;
  }
  return ProductIcon;
};

const Orders: React.FC = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const adminOrders = useAppSelector((s) => s.adminDashboard.adminOrders);
  const ordersLoading = useAppSelector((s) => s.adminDashboard.loading.adminOrders);
  const ordersError = useAppSelector((s) => s.adminDashboard.error.adminOrders);
  const updatingStatus = useAppSelector((s) => s.adminDashboard.loading.updateOrderStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [orderToUpdate, setOrderToUpdate] = useState<TableOrder | null>(null);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus>("Pending");
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const tableOrders: TableOrder[] = useMemo(() => {
    if (!Array.isArray(adminOrders)) return [];
    return adminOrders.map((order: AdminOrder): TableOrder => {
      const firstItem = order.orderItems?.[0];
      return {
        id: order._id,
        orderRef: order._id ? order._id.slice(-8).toUpperCase() : "—",
        productName: getFirstProductName(firstItem),
        extraItemsCount: Math.max((order.orderItems?.length ?? 1) - 1, 0),
        buyerName: getBuyerName(order.user),
        orderDate: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "—",
        orderAmount: `₦${(order.totalAmount ?? 0).toLocaleString()}`,
        image: getFirstProductImage(firstItem),
        status: order.status,
      };
    });
  }, [adminOrders]);

  const filterOptions = [
    {
      label: "Status",
      options: ["All Status", ...ORDER_STATUSES],
      value: selectedStatus,
      onChange: setSelectedStatus,
    },
  ];

  const sortOptions = [
    { label: "Newest First", value: "-createdAt" },
    { label: "Oldest First", value: "createdAt" },
    { label: "Amount High-Low", value: "-amount" },
    { label: "Amount Low-High", value: "amount" },
  ];

  // Filter orders based on search and status
  const filteredOrders = useMemo(() => {
    return tableOrders.filter((order) => {
      const matchesSearch =
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderRef.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "All Status" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [tableOrders, searchTerm, selectedStatus]);

  // Paginate filtered orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shipped":
        return "bg-[#E3F2FD] text-[#1976D2]";
      case "Processing":
        return "bg-[#EDE7F6] text-[#5E35B1]";
      case "Pending":
        return "bg-[#FFF3E0] text-[#F57C00]";
      case "Cancelled":
        return "bg-[#FFEBEE] text-[#D32F2F]";
      case "Delivered":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdate = (order: TableOrder) => {
    setOrderToUpdate(order);
    setPendingStatus(order.status);
  };

  const confirmUpdate = async () => {
    if (!orderToUpdate) return;
    try {
      await dispatch(
        updateOrderStatus({ id: orderToUpdate.id, status: pendingStatus })
      ).unwrap();
      toast(`Order ${orderToUpdate.orderRef} status updated to ${pendingStatus}.`, "success");
      setOrderToUpdate(null);
    } catch (error: any) {
      toast(`Failed to update order: ${error?.message || error}`, "error");
    }
  };

  const handleNotify = (order: TableOrder) => {
    toast(`${order.buyerName} was notified about order ${order.orderRef}.`, "success");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  return (
    <AdminLayout pageTitle="">
      <div className="">
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
              <h1 className="text-xl font-bold text-gray-900">Orders</h1>
              <div className="relative w-full sm:w-[290px]">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for orders..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button
                onClick={() =>
                  toast("Select an order from the list below to update its status.", "info")
                }
                className="flex gap-2 justify-center items-center px-4 py-2 md:min-w-[195px] min-h-[50px] bg-[#003366] rounded-[6px] text-white text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Update Order Status
              </button>
              <button
                onClick={() =>
                  toast("Buyers with pending orders were notified.", "success")
                }
                className="flex gap-2 justify-center items-center px-4 py-2 md:min-w-[175px] min-h-[50px] text-[#003366] border border-[#003366] rounded-[6px] bg-white text-sm font-medium"
              >
                <Bell className="w-4 h-4" />
                Notify Buyer
              </button>
            </div>
          </div>
        </section>

        <div>
          <FilterSection
            filters={filterOptions}
            sortOptions={sortOptions}
            showFilterButton={false}
          />
        </div>

        {/* Active Filters */}
        {selectedStatus !== "All Status" && (
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Status: {selectedStatus}
              <button
                onClick={() => setSelectedStatus("All Status")}
                className="hover:text-blue-900 text-lg leading-none"
              >
                ×
              </button>
            </span>
          </div>
        )}

        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
                <th className="p-4">
                  <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                </th>
                <th className="p-4 font-medium">Product Name</th>
                <th className="p-4 font-medium">Buyer Name</th>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Order Date</th>
                <th className="p-4 font-medium">Order Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersLoading && (
                <tr>
                  <td colSpan={8} className="p-4">
                    <LoaderSpinner txt="Orders" />
                  </td>
                </tr>
              )}
              {ordersError && !ordersLoading && (
                <tr>
                  <td colSpan={8} className="p-4">
                    <ErrorButton
                      error={ordersError}
                      fetch={() => dispatch(fetchAdminOrders())}
                    />
                  </td>
                </tr>
              )}
              {!ordersLoading && !ordersError && paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="w-4 h-4 border border-gray-300 bg-white rounded"></div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={order.image}
                            alt={order.productName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = ProductIcon;
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {order.productName}
                          {order.extraItemsCount > 0 &&
                            ` +${order.extraItemsCount} more`}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {order.buyerName}
                    </td>
                    <td className="p-4 text-sm text-gray-700 font-mono">
                      {order.orderRef}
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {order.orderDate}
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-900">
                      {order.orderAmount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdate(order)}
                          className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleNotify(order)}
                          className="px-3 py-1 bg-white text-[#003366] border border-[#003366] text-xs font-medium rounded-[4px] hover:bg-gray-50"
                        >
                          Notify
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : null}
              {!ordersLoading && !ordersError && paginatedOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    <p className="text-lg font-medium mb-1">No orders found</p>
                    <p className="text-sm text-gray-400">
                      {searchTerm || selectedStatus !== "All Status"
                        ? "Try adjusting your filters"
                        : "No orders available"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          itemLabel="Orders"
        />
      </div>

      {orderToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Update Order Status</h2>
            <p className="text-sm text-gray-600 mb-4">
              Order {orderToUpdate.orderRef} — {orderToUpdate.buyerName}
            </p>
            <select
              value={pendingStatus}
              onChange={(e) => setPendingStatus(e.target.value as OrderStatus)}
              className="w-full p-3 border rounded-md text-sm mb-6"
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOrderToUpdate(null)}
                disabled={updatingStatus}
                className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                disabled={updatingStatus}
                className="px-4 py-2 bg-[#003366] text-white rounded-md text-sm hover:bg-[#002244] disabled:opacity-50"
              >
                {updatingStatus ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Orders;
