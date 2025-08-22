import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { setUser } from "../../../../store/slices/authSlice";
import ionwarning from "../../../../assets/ion_warning.svg";
import annoucement from "../../../../assets/announcement.svg";
import { Link } from "react-router-dom";
import { fetchUserKYC } from "../../../../store/slices/kycSlice";

type UserProfile = {
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber: string;
  emailAddress: string;
  userType?: 'Indivdual' | 'Wholesaler';
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { userKYC, loading } = useAppSelector((state) => state.kyc);

  // State to track which field is being edited
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(
    null
  );
  const isWholesaler = !user?.firstName && !user?.lastName && user?.name;


  // Initialize state with Redux user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || user?.phone || "",
    emailAddress: user?.email || user?.emailAddress || "",
    userType: isWholesaler ? 'Wholesaler' : 'Indivdual'
  });

  // Update local state when Redux user data changes
  useEffect(() => {
    if (user) {
      const isWholesaler = !user.firstName && !user.lastName && user.name;
      setUserProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        name: user.name || "",
        phoneNumber: user.phoneNumber || user.phone || "",
        emailAddress: user.email || user.emailAddress || "",
        userType: isWholesaler ? 'Wholesaler' : 'Indivdual'
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserKYC());
  }, [dispatch]);

  const latestKYC = Array.isArray(userKYC) ? userKYC[0] : userKYC;
  console.log(userKYC)

  const isKYCCompleted = latestKYC?.status === 'Approved';
  const isKYCPending = latestKYC?.status === 'Pending' || latestKYC?.status === 'Flagged';
  const isKYCRejected = latestKYC?.status === 'Rejected';
  const hasNoKYC = !latestKYC;

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
        showVerifyButton: false
      };
    }
    if (isKYCPending) {
      return {
        color: "bg-blue-100 border-blue-300 text-blue-800",
        icon: "⏳",
        showVerifyButton: false
      };
    }
    if (isKYCRejected) {
      return {
        color: "bg-red-100 border-red-300 text-red-800",
        icon: "❌",
        showVerifyButton: true,
        buttonText: "Resubmit Documents",
        buttonLink: "/kyc-resubmit"
      };
    }
    return {
      color: "bg-[#F6EED7] border-[#FFC300] text-customBrown",
      icon: annoucement,
      showVerifyButton: true,
      buttonText: "Verify Documents",
      buttonLink: "/kyc-form"
    };
  };

  const statusInfo = getKYCStatusInfo();


  const handleEdit = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFieldClick = (field: keyof UserProfile) => {
    setEditingField(field);
  };

  const handleFieldBlur = () => {
    setEditingField(null);
  };

  const handleDoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: keyof UserProfile) => {
    if (e.key === "Enter") {
      setEditingField(null);
    }
    if (e.key === "Escape") {
      // Reset to original value and stop editing
      setUserProfile((prev) => ({
        ...prev,
        [field]: user?.[field as keyof typeof user] || "",
      }));
      setEditingField(null);
    }
  };

  const handleSave = async () => {
    try {
      // Update Redux state
      const updatedUser = {
        ...user,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        name: userProfile.name,
        phoneNumber: userProfile.phoneNumber,
        phone: userProfile.phoneNumber,
        email: userProfile.emailAddress,
        emailAddress: userProfile.emailAddress,
      };

      dispatch(setUser(updatedUser));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (userProfile.userType === 'Wholesaler') {
      return userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "W";
    }

    const firstName = userProfile.firstName || user?.firstName || "";
    return `${firstName.charAt(0)}`.toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (userProfile.userType === 'Wholesaler') {
      return userProfile.name || user?.name || "Wholesaler";
    }
    return userProfile.firstName || user?.firstName || "User";
  };


  // Render editable field
  const renderEditableField = (
    field: keyof UserProfile,
    label: string,
    type: string = "text"
  ) => {
    // Skip firstName and lastName fields for wholesalers
    if (userProfile.userType === 'Wholesaler' && (field === 'firstName' || field === 'lastName')) {
      return null;
    }

    // Skip name field for normal users
    if (userProfile.userType === 'Indivdual' && field === 'name') {
      return null;
    }

    const isEditing = editingField === field;
    const value = userProfile[field] || "";

    return (
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <p className="text-[#827E7E] text-sm pb-2">{label}</p>
          {isEditing ? (
            <input
              type={type}
              value={value}
              onChange={(e) => handleEdit(field, e.target.value)}
              onBlur={handleFieldBlur}
              onKeyDown={(e) => handleKeyDown(e, field)}
              className="font-medium bg-transparent border-b-2 border-primary focus:outline-none focus:border-primary w-full pb-1"
              autoFocus
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          ) : (
            <p
              className="font-medium cursor-pointer hover:text-primary transition-colors py-1 border-b border-transparent hover:border-gray-200"
            //   onClick={() => handleFieldClick(field)}
            >
              {value || "Not set - Click to add"}
            </p>
          )}
        </div>
        <button
          className="bg-[#D9D9D9] px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300 transition-colors ml-4"
          onClick={() => {
            if (isEditing) {
              //   handleDoneClick(e);
              setEditingField(null);
            } else {
              handleFieldClick(field);
            }
          }}
        >
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-[#2D2828] mb-4">
        Profile Details
      </h2>

      {/* KYC Status Banner */}
      {!isKYCCompleted && (
        <div className={`w-full border ${statusInfo.color} rounded-[8px] flex items-center p-4 gap-3 mb-6`}>
          <span className="text-xs">
            {getKYCStatusMessage()}
          </span>
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
              <p className="text-sm">
                {latestKYC?.status || "Unverified"}
              </p>
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
        {userProfile.userType === 'Wholesaler'
          ? renderEditableField("name", "Business Name")
          : (
            <>
              {renderEditableField("firstName", "First Name")}
              {renderEditableField("lastName", "Last Name")}
            </>
          )
        }
        {renderEditableField("phoneNumber", "Phone Number", "tel")}
        {renderEditableField("emailAddress", "Email Address", "email")}

        <button
          className="w-full bg-primary text-white py-4 rounded-lg text-base font-medium mt-4"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;