import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { setUser } from "../../../../store/slices/authSlice";
import ionwarning from "../../../../assets/ion_warning.svg";
import annoucement from "../../../../assets/announcement.svg";
import { Link } from "react-router-dom";

type UserProfile = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // State to track which field is being edited
  const [editingField, setEditingField] = useState<keyof UserProfile | null>(
    null
  );

  // Initialize state with Redux user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || user?.phone || "",
    emailAddress: user?.email || user?.emailAddress || "",
  });

  // Update local state when Redux user data changes
  useEffect(() => {
    if (user) {
      setUserProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || user.phone || "",
        emailAddress: user.email || user.emailAddress || "",
      });
    }
  }, [user]);

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
    const firstName = userProfile.firstName || user?.firstName || "";
    // const lastName = userProfile.lastName || user?.lastName || "";
    return `${firstName.charAt(0)}`.toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    return userProfile.firstName || user?.firstName || "User";
  };

  // Render editable field
  const renderEditableField = (
    field: keyof UserProfile,
    label: string,
    type: string = "text"
  ) => {
    const isEditing = editingField === field;
    const value = userProfile[field];

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
      <div className="w-full border border-[#FFC300] bg-[#F6EED7] rounded-[8px] flex items-center p-4 gap-3 mb-6">
        <img src={annoucement} alt="" />
        <span className="text-xs text-customBrown">
          To complete your profile and begin selling, please upload and verify
          your business verification documents
        </span>
      </div>
      <div className="bg-primary text-white p-8 rounded-t-lg flex items-center space-x-4 justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-[#E3E6EA] text-primary rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold">
            {getInitials()}
          </div>
          <div>
            <span className="text-lg">{getDisplayName()}</span>
            <div className="flex gap-1">
              <img src={ionwarning} alt="" />
              <p>Unverified</p>
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/kyc-form"
            className="bg-[#FFC300] p-2 rounded-[4px] text-customBrown text-base font-semibold"
          >
            Verify Documents
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded-b-lg border border-gray-200 space-y-6">
        {renderEditableField("firstName", "First Name")}
        {renderEditableField("lastName", "Last Name")}
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
