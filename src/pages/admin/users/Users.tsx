// src/pages/admin/users/Users.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus, ChevronDown, ArrowUpDown, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllUsers,
  fetchUserById,
} from "../../../store/slices/adminDashboardSlice";

// Backend model (export this type from your slice)
import type { User as ApiUser } from "../../../store/slices/adminDashboardSlice";

// view-model for the table to keep UI stable
type TableUser = {
  id: string;
  userId: string;
  name: string;
  email: string;
  accountType: "Personal" | "Wholesaler" | "Importer" | "Manufacturer";
  status: "Active" | "Inactive";
  dateJoined: string;
};

const Users: React.FC = () => {
  const dispatch = useAppDispatch();

  // --- UI state
  const [activeFilter, setActiveFilter] = useState<string>("All Users");
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  // --- Redux state
  const userList: ApiUser[] = useAppSelector((s) => s.adminDashboard.users);
  const usersLoading = useAppSelector((s) => s.adminDashboard.loading.users);
  const usersError = useAppSelector((s) => s.adminDashboard.error.users);

  // used by the modal (populated by fetchUserById)
  const userDetails = useAppSelector((s) => s.adminDashboard.userDetails);
  const userLoading = useAppSelector((s) => s.adminDashboard.loading.user);
  const userError = useAppSelector((s) => s.adminDashboard.error.user);

  // fetch list on mount
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // map API -> table view model
  const tableUsers: TableUser[] = useMemo(() => {
    if (!Array.isArray(userList)) return [];
    return userList.map((u): TableUser => {
      const id = String((u as any)._id ?? (u as any).id ?? "");
      const first = String((u as any).firstName ?? "");
      const last = String((u as any).lastName ?? "");
      const fullName = `${first} ${last}`.trim();
      const email = String((u as any).email ?? "—");

      const roleStr = String((u as any).role ?? "").toLowerCase();
      let accountType: TableUser["accountType"] = "Personal";
      if (roleStr.includes("wholesale")) accountType = "Wholesaler";
      else if (roleStr.includes("import")) accountType = "Importer";
      else if (roleStr.includes("manufact")) accountType = "Manufacturer";

      const createdAt = (u as any).createdAt;

      return {
        id: id || Math.random().toString(36).slice(2),
        userId: id ? id.slice(-6).toUpperCase() : "—",
        name: fullName || email || "—",
        email,
        accountType,
        status: "Active",
        dateJoined: createdAt ? new Date(createdAt).toLocaleDateString() : "—",
      };
    });
  }, [userList]);

  // combined filter: accountType + search
  const filteredUsers: TableUser[] = useMemo(() => {
    let rows = tableUsers;
    if (activeFilter !== "All Users") {
      rows = rows.filter((u) => u.accountType === (activeFilter as TableUser["accountType"]));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((u) =>
        `${u.name} ${u.email} ${u.userId}`.toLowerCase().includes(q)
      );
    }
    return rows;
  }, [tableUsers, activeFilter, search]);

  const filterOptions = ["All Users", "Personal", "Wholesaler", "Importer", "Manufacturer"];

  const getStatusColor = (status: TableUser["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#E8F5E8] text-[#4CAF50]";
      case "Inactive":
        return "bg-[#F5F5F5] text-[#9E9E9E]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // --- modal open wired to thunk for a single user
  const openView = (id: string) => {
    setSelectedUserId(id);
    setShowModal(true);
    dispatch(fetchUserById(id));
  };

  const closeView = () => {
    setShowModal(false);
    setSelectedUserId("");
  };

  return (
    <AdminLayout pageTitle="">
      {/* Header & Search */}
      <section className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 w-full">
            <h1 className="text-xl font-bold text-gray-900">Users</h1>
            <div className="relative w-full sm:w-[290px]">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[10px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
            <button className="flex gap-2 justify-center items-center px-4 py-3 min-w-[170px] bg-[#003366] rounded-[6px] text-white text-sm font-medium">
              <Plus className="w-4 h-4" />
              Send Notification
            </button>
          </div>
        </div>
      </section>

      {/* Filters / Sort */}
      <section className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="overflow-x-auto whitespace-nowrap w-full">
            <div className="flex gap-4 w-max">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-[6px] transition-colors ${
                    activeFilter === filter
                      ? "bg-[#003366] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="px-4 py-2 bg-white border border-gray-300 rounded-[6px] text-sm text-gray-700 pr-8 appearance-none min-w-[120px]">
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-[6px] text-sm font-medium text-gray-700">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm bg-gray-50 text-gray-600 border-b">
              <th className="p-4"><div className="w-4 h-4 border border-gray-300 bg-white rounded" /></th>
              <th className="p-4 font-medium">User ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Account Type</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Date Joined</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersLoading && (
              <tr><td colSpan={8} className="p-4">Loading…</td></tr>
            )}
            {usersError && !usersLoading && (
              <tr><td colSpan={8} className="p-4 text-red-600">{usersError}</td></tr>
            )}
            {!usersLoading && !usersError && filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4"><div className="w-4 h-4 border border-gray-300 bg-white rounded" /></td>
                <td className="p-4 text-sm text-gray-700">{user.userId}</td>
                <td className="p-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="p-4 text-sm text-gray-700">{user.email}</td>
                <td className="p-4 text-sm text-gray-700">{user.accountType}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-700">{user.dateJoined}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openView(user.id)}
                      className="px-3 py-1 bg-[#003366] text-white text-xs font-medium rounded-[4px] hover:bg-[#002244]"
                    >
                      View
                    </button>
                    <button className="px-3 py-1 bg-[#F248221A] text-[#F24822] text-xs font-medium rounded-[4px]">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!usersLoading && !usersError && filteredUsers.length === 0 && (
              <tr><td colSpan={8} className="p-4 text-gray-500">No users.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View modal (uses fetchUserById result) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-gray-900">User</h3>
              <button onClick={closeView} className="p-1 rounded hover:bg-gray-100" aria-label="Close">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4 min-h-[160px]">
              {userLoading && <p className="text-sm text-gray-600">Loading user…</p>}
              {userError && !userLoading && (
                <p className="text-sm text-red-600">{userError}</p>
              )}
              {!userLoading && !userError && userDetails && (
                <div className="grid grid-cols-1 gap-4">
                  <Item label="Name" value={`${userDetails.firstName ?? ""} ${userDetails.lastName ?? ""}`.trim() || "—"} />
                  <Item label="Email" value={userDetails.email ?? "—"} />
                  <Item label="Phone" value={userDetails.phoneNumber ?? "—"} />
                  <Item label="Company" value={(userDetails as any).companyName ?? "—"} />
                  <Item label="Account Type" value={userDetails.role ?? "—"} />
                  <Item
                    label="Date Joined"
                    value={(userDetails as any).createdAt ? new Date((userDetails as any).createdAt).toLocaleString() : "—"}
                  />
                </div>
              )}
              {!userLoading && !userError && !userDetails && (
                <p className="text-sm text-gray-600">No user found for ID {selectedUserId}.</p>
              )}
            </div>

            <div className="p-4 flex justify-between gap-2">
              <button className="px-4 py-4 rounded-md bg-[#D9D9D9] text-white border-gray-300 text-sm w-full">
                Activate
              </button>
              <button className="px-4 py-4 rounded-md bg-[#003366] text-[#F24822] text-sm w-full bg-[#F248221A]">
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

function Item({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm text-gray-900">{value || "—"}</span>
    </div>
  );
}

export default Users;