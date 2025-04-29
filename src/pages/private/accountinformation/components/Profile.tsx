import React, { useState } from 'react'

type UserProfile = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
};

const Profile = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        firstName: 'Marvellous',
        lastName: 'Afolabi',
        phoneNumber: '07039123456',
        emailAddress: 'marvellous@yahoo.com'
    });

    const handleEdit = (field: keyof UserProfile, value: string) => {
        setUserProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-[#2D2828] mb-4">Profile Details</h2>
            <div className="bg-primary text-white p-8 rounded-t-lg flex items-center space-x-4">
                <div className="bg-[#E3E6EA] text-primary rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold">
                    M
                </div>
                <span className="text-lg">Marvellous</span>
            </div>
            <div className="bg-white p-6 rounded-b-lg border border-gray-200 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[#827E7E] text-sm pb-2">First Name</p>
                        <p className="font-medium">{userProfile.firstName}</p>
                    </div>
                    <button
                        className="bg-[#D9D9D9] px-4 py-2 rounded-md text-gray-600"
                        onClick={() => {
                            const newName = prompt('Enter new first name:', userProfile.firstName);
                            if (newName) handleEdit('firstName', newName);
                        }}
                    >
                        Edit
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[#827E7E] text-sm pb-2">Last Name</p>
                        <p className="font-medium">{userProfile.lastName}</p>
                    </div>
                    <button
                        className="bg-[#D9D9D9] px-4 py-2 rounded-md text-gray-600"
                        onClick={() => {
                            const newName = prompt('Enter new last name:', userProfile.lastName);
                            if (newName) handleEdit('lastName', newName);
                        }}
                    >
                        Edit
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[#827E7E] text-sm pb-2">Phone Number</p>
                        <p className="font-medium">{userProfile.phoneNumber}</p>
                    </div>
                    <button
                        className="bg-[#D9D9D9] px-4 py-2 rounded-md text-gray-600"
                        onClick={() => {
                            const newPhone = prompt('Enter new phone number:', userProfile.phoneNumber);
                            if (newPhone) handleEdit('phoneNumber', newPhone);
                        }}
                    >
                        Edit
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[#827E7E] text-sm pb-2">Email Address</p>
                        <p className="font-medium">{userProfile.emailAddress}</p>
                    </div>
                    <button
                        className="bg-[#D9D9D9] px-4 py-2 rounded-md text-gray-600"
                        onClick={() => {
                            const newEmail = prompt('Enter new email address:', userProfile.emailAddress);
                            if (newEmail) handleEdit('emailAddress', newEmail);
                        }}
                    >
                        Edit
                    </button>
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-lg text-base font-medium mt-4">
                    Save
                </button>
            </div>
        </div>
    )
}

export default Profile