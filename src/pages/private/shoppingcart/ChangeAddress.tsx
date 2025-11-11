import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllAddresses,
  deleteAddress,
  updateAddress,
} from "../../../store/slices/addressSlice";

const ChangeAddress = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addresses, loading } = useAppSelector((state) => state.address);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await dispatch(deleteAddress(id)).unwrap();
        alert("Address deleted successfully");
      } catch (err) {
        console.error("Failed to delete address:", err);
        alert("Failed to delete address");
      }
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await dispatch(updateAddress({ id, addressData: { isDefault: true } })).unwrap();
      // Refresh addresses to update other defaults
      dispatch(fetchAllAddresses());
      alert("Default address updated");
    } catch (err) {
      console.error("Failed to update default address:", err);
      alert("Failed to update default address");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-customGray3">Loading addresses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 flex justify-center items-center">
      <section className="space-y-5 max-w-[525px] w-full min-h-screen">
        <div className="flex justify-between items-center">
          <h2>Addresses</h2>
          <Link to="/add-address">
            <button className="bg-primary text-white w-[140px] h-[40px] rounded hover:bg-primary/90 transition-colors">
              Add Address
            </button>
          </Link>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-customGray3 mb-4">No addresses saved yet</p>
            <Link to="/add-address">
              <button className="bg-primary text-white px-6 py-3 rounded-lg">
                Add Your First Address
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <section
                key={address._id}
                className="border border-primary rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <img src="/home-outline.svg" alt="" />
                    <p className="text-[10px] text-customGray3">
                      Delivery Address
                    </p>
                    {address.isDefault && (
                      <span className="bg-[#BFCCD8] text-xs text-primary p-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <Link to={`/edit-address/${address._id}`}>
                    <img
                      src="/edit.svg"
                      alt="Edit"
                      className="cursor-pointer hover:opacity-70"
                    />
                  </Link>
                </div>
                <p className="text-base text-customBrown font-semibold">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-xs text-customGray3">{address.street}</p>
                {address.direction && (
                  <p className="text-xs text-customGray3">{address.direction}</p>
                )}
                <p className="text-xs text-customGray3">
                  {address.city}, {address.state}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-customGray3">
                    {address.phone} | {address.email}
                  </p>
                  <img
                    src="/delete.svg"
                    alt="Delete"
                    onClick={() => handleDelete(address._id)}
                    className="cursor-pointer hover:opacity-70"
                  />
                </div>
                {!address.isDefault && (
                  <div className="flex gap-2 items-center pt-2">
                    <input
                      type="checkbox"
                      id={`default-${address._id}`}
                      onChange={() => handleSetDefault(address._id)}
                      disabled={loading}
                    />
                    <label
                      htmlFor={`default-${address._id}`}
                      className="text-customGray3 text-sm cursor-pointer"
                    >
                      Set as default address
                    </label>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        <Link to="/checkout">
          <button
            type="button"
            className="bg-primary rounded-lg p-4 w-full text-base text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Continue to Checkout
          </button>
        </Link>
        <Link to="/checkout">
          <button
            type="button"
            className="bg-white rounded-lg p-4 w-full text-base text-primary border border-primary font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </Link>
      </section>
    </div>
  );
};

export default ChangeAddress;