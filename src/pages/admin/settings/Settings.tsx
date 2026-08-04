import React, { useEffect, useState } from "react";
import carTyre from "../../../assets/tyres.svg";
import AdminLayout from "../components/AdminLayout";
import remove from "../../../assets/cancel-rounded.svg";
import modify from "../../../assets/modify.svg";
import { Plus } from "lucide-react";
import Profile from "./profile/Profile";
import Password from "./password/Password";
import AddNewUser from "../components/AddNewUser";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchAllUsers } from "../../../store/slices/adminDashboardSlice";
import { deleteUser } from "../../../store/slices/userSlice";
import { useToast } from "../../../components/Toast";
import LoaderSpinner from "../../../components/LoaderSpinner";
import ErrorButton from "../../../components/ErrorButton";

const capitalize = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

const AdminAccounts = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const userList = useAppSelector((s) => s.adminDashboard.users);
  const usersLoading = useAppSelector((s) => s.adminDashboard.loading.users);
  const usersError = useAppSelector((s) => s.adminDashboard.error.users);

  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const users = (Array.isArray(userList) ? userList : []).map((user) => {
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || String(user.email ?? "—");
    return {
      id: user._id,
      name,
      email: String(user.email ?? "—"),
      image: carTyre,
      role: capitalize(String(user.role ?? "")) || "—",
    };
  });

  const handleEdit = (id: string) => {
    // console.log("Editing product with ID:", id);
    // Navigate to edit form or open modal
  };

  const handleDelete = (id: string, name: string) => {
    setUserToDelete({ id, name });
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await dispatch(deleteUser(userToDelete.id)).unwrap();
      toast(`${userToDelete.name} was removed.`, "success");
      dispatch(fetchAllUsers());
    } catch (error: any) {
      toast(`Failed to remove user: ${error?.message || error}`, "error");
    } finally {
      setDeleting(false);
      setUserToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Manager":
        return "bg-[#00336626] text-[#003366]";
      case "Admin":
        return "bg-[#FFC30026] text-[#FFC300]";
      case "Auditor":
        return "bg-[#E1F1E0] text-[#15B70D]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm bg-[#F8F8F8] text-gray-600 border-b">
            <th className="p-4">
              <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
            </th>
            <th className="p-4">Name</th>
            <th className="p-4">User Role</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersLoading && (
            <tr>
              <td colSpan={4} className="p-4">
                <LoaderSpinner txt="Users" />
              </td>
            </tr>
          )}
          {usersError && !usersLoading && (
            <tr>
              <td colSpan={4} className="p-4">
                <ErrorButton error={usersError} fetch={() => dispatch(fetchAllUsers())} />
              </td>
            </tr>
          )}
          {!usersLoading && !usersError && users.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-gray-500">
                No admin accounts found.
              </td>
            </tr>
          )}
          {!usersLoading &&
            !usersError &&
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b text-[#5E5E5E] last:border-b-0"
              >
                <td className="p-4">
                  <div className="w-5 h-5 border border-[#D9D9D9] bg-white rounded-[4px]"></div>
                </td>
                <td className="p-4 text-sm flex items-center gap-12">
                  <div className="flex items-center justify-start gap-1">
                    <div className="w-12 h-12 bg-[#FAF9F9] rounded-lg flex items-center justify-center">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-[35px]"
                      />
                    </div>
                    <div className="flex flex-col gap-0">
                      <p> {user.name}</p>
                      <p> {user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-4 flex-wrap">
                    <span
                      className={`px-2 py-[6px] rounded-[4px] text-xs font-normal ${getStatusColor(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="flex items-center gap-2"
                    >
                      <img src={modify} alt="" />
                      <span>Modify Roles</span>
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="flex items-center gap-2"
                    >
                      <img src={remove} alt="" />
                      <span>Remove User</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Remove User</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove {userToDelete.name}? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                disabled={deleting}
                className="px-4 py-2 border rounded-md text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Settings: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const filters: Array<{
    label: string;
    value: "admin" | "profile" | "password";
  }> = [
    { label: "Admin Accounts", value: "admin" },
    { label: "Profile", value: "profile" },
    { label: "Password", value: "password" },
  ];
  const [activeTab, setActiveTab] = useState<"admin" | "profile" | "password">(
    "admin"
  );

  function handleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <AdminLayout pageTitle="">
      <section>
        <section className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Title + Search */}
            <div className="w-full">
              <h1 className="text-xl font-bold text-gray-900">Users</h1>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
              <button
                className="flex gap-2 justify-center items-center px-4 py-3 min-w-[160px] bg-[#003366] rounded-[6px] text-white text-sm font-medium"
                onClick={handleMenu}
              >
                <Plus />
                Add new User
              </button>
            </div>
          </div>
        </section>

        {openMenu && <AddNewUser />}
        <section className="mb-6">
          {/* Scrollable Filters */}
          <div className="overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
            <div className="flex gap-4 shrink-0 w-max">
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
          </div>
        </section>
        {activeTab === "admin" && <AdminAccounts />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "password" && <Password />}
      </section>
    </AdminLayout>
  );
};

export default Settings;
