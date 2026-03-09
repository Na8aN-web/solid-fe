import React, { useState } from "react";
import { useAppSelector } from "../../../../../store/hooks";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Security = () => {
  const [showPage, setShowPage] = useState<boolean>(false);
  // const { user } = useAppSelector((state) => state.auth);
  
  // Password form state
  // const [passwordForm, setPasswordForm] = useState<PasswordForm>({
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: ""
  // });

   // Loading and error states
  //  const [isLoading, setIsLoading] = useState<boolean>(false);
  //  const [errors, setErrors] = useState<Partial<PasswordForm>>({});
  //  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleRateProduct = () => {
    setShowPage(true);
  };

  const handleBackToList = () => {
    setShowPage(false);
  };
  const SecurityAccount = () => {
    return (
      <div>
        <h1 className="text-customBrown font-bold text-xl pb-4">Security</h1>
        <section className="border p-5 bg-white mb-6 md:px-8">
          <h2 className="text-customBrown text-base font-semibold">
            Change Password
          </h2>
          <form className="space-y-4 pt-4">
            <div>
              <label
                htmlFor="currentPass"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Current Password
              </label>
              <input
                id="currentPass"
                name="currentPass"
                type="text"
                placeholder="Current password"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newPass"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                New Password
              </label>
              <input
                id="newPass"
                name="newPass"
                type="text"
                placeholder="New password"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="pb-2">
              <label
                htmlFor="confirmPass"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Confirm Password
              </label>
              <input
                id="confirmPass"
                name="confirmPass"
                type="text"
                placeholder="Confirm password"
                className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary rounded-lg p-4 w-full text-base text-white"
            >
              Confirm
            </button>
          </form>
        </section>
        <button
          type="submit"
          className="bg-white border p-4 w-full text-base text-[#F24822] font-semibold"
          onClick={() => handleRateProduct()}
        >
          Delete Account
        </button>
      </div>
    );
  };

  const DeleteAccount = () => {
    return (
      <section className="px-4 ">
        <h1 className="text-customBrown font-bold text-xl">Delete Account</h1>
        <h2 className="text-customBrown text-base font-semibold py-6">
          Warning: Account Deletion
        </h2>
        <p className="text-sm font-normal text-customBrown">
          Are you sure you want to delete your Solid Spare Parts account?
        </p>
        <p className="text-sm font-normal text-customBrown">
          This action is permanent and cannot be undone. Once deleted:
        </p>
        <ul className="list-disc pl-5 py-4 text-sm font-normal text-customBrown space-y-1">
          <li>
            All your order history, saved items, and account details will be
            permanently removed.
          </li>
          <li>
            You will lose access to any active purchases or warranties tied to
            your account.
          </li>
          <li>
            Any ongoing communication with sellers or distributors will be
            terminated.
          </li>
        </ul>
        <p className="text-sm font-normal text-customBrown">
          If you’re sure, please confirm below by entering your password so we
          know it is you. Otherwise, you can cancel to keep your account.
        </p>
        <form action="" className="space-y-5 pt-5">
          <input
            id="currentPass"
            name="currentPass"
            type="text"
            value="declanrice@gmail.com"
            className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            id="password"
            name="password"
            type="text"
            placeholder="Password"
            className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <div className="w-full flex gap-5">
            <button
              type="submit"
              className="bg-primary rounded-lg p-4 w-full text-base text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => handleBackToList()}
              type="submit"
              className="bg-white border border-primary rounded-lg p-4 w-full text-base text-primary hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    );
  };

  return (
    <>
      {showPage && (
   <div className="hidden md:flex fixed inset-0 z-50 bg-[#E5E5E5]/90 items-center justify-center">
   <div className="bg-white max-w-xl lg:max-w-[900px] w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
     {DeleteAccount()}
   </div>
 </div>
 
    
      )}

      <div className={`${showPage ? "hidden md:block" : ""}`}>
        {SecurityAccount()}
      </div>

      {/* Mobile-only version of Delete Account */}
      {showPage && (
        <div className="block md:hidden pt-6">{DeleteAccount()}</div>
      )}
    </>
  );
};

export default Security;
