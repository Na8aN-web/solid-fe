import React from "react";
import carTyre from "../../../assets/tyres.svg";
import AdminLayout from "../components/AdminLayout";
import remove from "../../../assets/cancel-rounded.svg";
import modify from "../../../assets/modify.svg";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  roles: ("Manager" | "Admin" | "Auditor")[];
  isLoggedIn: boolean;
}

const Settings: React.FC = () => {
  const users: User[] = [
    {
      id: "1",
      name: "Michellene Tyre",
      email: "marvellouscalebs@gmail.com",
      image: carTyre,
      roles: ["Manager", "Admin", "Auditor"],
      isLoggedIn: false,
    },
    {
      id: "2",
      name: "Michellene Tyre",
      email: "marvellouscalebs@gmail.com",
      image: carTyre,
      roles: ["Admin", "Auditor"],
      isLoggedIn: true,
    },
    {
      id: "3",
      name: "Michellene Tyre",
      email: "marvellouscalebs@gmail.com",
      image: carTyre,
      roles: ["Admin"],
      isLoggedIn: false,
    },
    {
      id: "4",
      name: "Michellene Tyre",
      email: "marvellouscalebs@gmail.com",
      image: carTyre,
      roles: ["Manager"],
      isLoggedIn: false,
    },
  ];
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

  const handleEdit = (id: string) => {
    console.log("Editing product with ID:", id);
    // Navigate to edit form or open modal
  };

  const handleDelete = (id: string) => {
    console.log("Deleting product with ID:", id);
    // Show confirm dialog or call API
  };
  return (
    <AdminLayout pageTitle="settings">
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
            {users.map((user) => (
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
                  {!user.isLoggedIn && (
                    <span className="text-base font-normal text-[#FF5F00]">
                      Not Logged In
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-4 flex-wrap">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className={`px-2 py-[6px] rounded-[4px] text-xs font-normal ${getStatusColor(role)}`}
                      >
                        {role}
                      </span>
                    ))}
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
                      onClick={() => handleDelete(user.id)}
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
      </div>
    </AdminLayout>
  );
};

export default Settings;
