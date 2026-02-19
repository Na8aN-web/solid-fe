import React, { useState, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { setUser } from "../../../../store/slices/authSlice";
import ionwarning from "../../../../assets/ion_warning.svg";
import annoucement from "../../../../assets/announcement.svg";
import { Link } from "react-router-dom";
import { fetchUserKYC } from "../../../../store/slices/kycSlice";
import LoaderSpinner from "../../../../components/LoaderSpinner";
import {
  clearUser,
  getUserById,
  updateUser,
} from "../../../../store/slices/userSlice";

type UserProfile = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber: string;
  emailAddress: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();

  const { user: authUser } = useAppSelector((state) => state.auth);
  const { user: profileUser, userLoading } = useAppSelector(
    (state) => state.user,
  );

  const { userKYC } = useAppSelector((state) => state.kyc);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    emailAddress: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isWholesaler = authUser?.role === "Wholesaler";

  useEffect(() => {
    if (authUser?._id) {
      dispatch(clearUser());
      dispatch(getUserById(authUser._id));
    }
  }, [authUser?._id, dispatch]);

  // Sync form with backend user
  useEffect(() => {
    if (profileUser) {
      setUserProfile({
        firstName: profileUser.firstName || "",
        lastName: profileUser.lastName || "",
        companyName: profileUser.companyName || "",
        phoneNumber: profileUser.phoneNumber || "",
        emailAddress: profileUser.email || "",
      });
    }
  }, [profileUser]);

  useEffect(() => {
    dispatch(fetchUserKYC());
  }, [dispatch]);

  const latestKYC = useMemo(() => {
    if (!Array.isArray(userKYC)) return userKYC;

    return [...userKYC].sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )[0];
  }, [userKYC]);

  const isKYCCompleted = latestKYC?.status === "Approved";
  const isKYCPending =
    latestKYC?.status === "Pending" || latestKYC?.status === "Flagged";
  const isKYCRejected = latestKYC?.status === "Rejected";

  const getKYCStatusMessage = () => {
    if (isKYCCompleted) {
      return "Your business verification has been approved! You can now start selling.";
    }
    if (isKYCPending) {
      return "Your business verification documents are under review. Please check back later.";
    }
    if (isKYCRejected) {
      return "Your business verification was rejected. Please resubmit your documents.";
    }
    return "To complete your profile and begin selling, please upload and verify your business verification documents";
  };

  const getKYCStatusInfo = () => {
    if (isKYCCompleted) {
      return {
        color: "bg-green-100 border-green-300 text-green-800",
        icon: "✅",
        showVerifyButton: false,
      };
    }
    if (isKYCPending) {
      return {
        color: "bg-blue-100 border-blue-300 text-blue-800",
        icon: "⏳",
        showVerifyButton: false,
      };
    }
    if (isKYCRejected) {
      return {
        color: "bg-red-100 border-red-300 text-red-800",
        icon: "❌",
        showVerifyButton: true,
        buttonText: "Resubmit Documents",
        buttonLink: "/kyc-resubmit",
      };
    }
    return {
      color: "bg-[#F6EED7] border-[#FFC300] text-customBrown",
      icon: annoucement,
      showVerifyButton: true,
      buttonText: "Verify Documents",
      buttonLink: "/kyc-form",
    };
  };

  const statusInfo = getKYCStatusInfo();

  const handleEdit = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!authUser?._id || isSaving) return;

    try {
      setIsSaving(true);

      const payload = {
        firstName: isWholesaler ? undefined : userProfile.firstName,
        lastName: isWholesaler ? undefined : userProfile.lastName,
        phoneNumber: userProfile.phoneNumber,
        email: userProfile.emailAddress,
        companyName: isWholesaler ? userProfile.companyName : undefined,
        role: authUser.role,
      };

      const updatedUser = await dispatch(
        updateUser({ id: authUser._id, data: payload }),
      ).unwrap();

      // Sync auth slice so navbar etc update
      dispatch(setUser(updatedUser));

      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage("Failed to update profile.");
      setShowErrorModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (isWholesaler) {
      const name = userProfile.companyName || profileUser?.companyName || "";
      return name ? name.charAt(0).toUpperCase() : "W";
    }
    const first = userProfile.firstName || "";
    return first ? first.charAt(0).toUpperCase() : "U";
  };

  const getDisplayName = () => {
    if (isWholesaler) return userProfile.companyName || "Wholesaler";
    return userProfile.firstName || "User";
  };

  const renderEditableField = (
    field: keyof UserProfile,
    label: string,
    type = "text",
  ) => {
    if (isWholesaler && (field === "firstName" || field === "lastName"))
      return null;
    if (!isWholesaler && field === "companyName") return null;

    return (
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <label className="text-[#827E7E] text-sm pb-2">{label}</label>
          <input
            type={type}
            value={userProfile[field] || ""}
            onChange={(e) => handleEdit(field, e.target.value)}
            className="font-medium bg-transparent border-b border-transparent focus:border-primary focus:outline-none w-full pb-1 transition-colors"
          />
        </div>
      </div>
    );
  };

  if (!authUser || userLoading || !profileUser) {
    return <LoaderSpinner txt="profile" />;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#2D2828] mb-4">
        Profile Details
      </h2>

      {/* KYC Status Banner */}
      {!isKYCCompleted && (
        <div
          className={`w-full border ${statusInfo.color} rounded-[8px] flex items-center p-4 gap-3 mb-6`}
        >
          <span className="text-xs">{getKYCStatusMessage()}</span>
        </div>
      )}

      <div className="bg-primary text-white p-8 rounded-t-lg flex items-center space-x-4 justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-[#E3E6EA] text-primary rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold">
            {getInitials()}
          </div>
          <div>
            <span className="text-lg">{getDisplayName()}</span>
            <div className="flex gap-1 items-center">
              <img src={ionwarning} alt="Warning" className="w-4 h-4" />
              <p className="text-sm">{latestKYC?.status || "Unverified"}</p>
            </div>
          </div>
        </div>

        {/* Show Verify/Resubmit button only when needed */}
        {statusInfo.showVerifyButton && (
          <div>
            <Link
              to={statusInfo.buttonLink || "/kyc-form"}
              className="bg-[#FFC300] px-4 py-2 rounded-[4px] text-customBrown text-base font-semibold hover:bg-[#FFD54F] transition-colors"
            >
              {statusInfo.buttonText}
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-b-lg border border-gray-200 space-y-6">
        {isWholesaler ? (
          renderEditableField("companyName", "Business Name")
        ) : (
          <>
            {renderEditableField("firstName", "First Name")}
            {renderEditableField("lastName", "Last Name")}
          </>
        )}

        {renderEditableField("phoneNumber", "Phone Number", "tel")}
        {renderEditableField("emailAddress", "Email Address", "email")}

        <button
          disabled={isSaving}
          className={`w-full py-4 rounded-lg text-base font-medium mt-4 transition-opacity
    ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-primary text-white"}`}
          onClick={handleSave}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseSuccessModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Profile Updated Successfully
              </h3>
              <p className="text-gray-600 mb-6">
                Your profile information has been updated successfully.
              </p>
              <button
                onClick={handleCloseSuccessModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseErrorModal}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Error</h3>
              <p className="text-gray-600 mb-6">
                {errorMessage || "An error occurred. Please try again."}
              </p>
              <button
                onClick={handleCloseErrorModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;