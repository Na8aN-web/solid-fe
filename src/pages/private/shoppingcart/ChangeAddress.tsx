import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchAllAddresses,
  deleteAddress,
  updateAddress,
} from "../../../store/slices/addressSlice";

const ChangeAddress = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { addresses, loading } = useAppSelector((state) => state.address);
  // const [editingId, setEditingId] = useState<string | null>(null);
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  const handleDeleteClick = (id: string) => {
    setSelectedAddressId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedAddressId) {
      try {
        await dispatch(deleteAddress(selectedAddressId)).unwrap();
        setShowDeleteModal(false);
        setModalMessage("Address deleted successfully");
        setShowSuccessModal(true);
      } catch (err) {
        console.error("Failed to delete address:", err);
        setShowDeleteModal(false);
        setModalMessage("Failed to delete address");
        setShowErrorModal(true);
      }
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await dispatch(updateAddress({ id, addressData: { isDefault: true } })).unwrap();
      // Refresh addresses to update other defaults
      dispatch(fetchAllAddresses());
      setModalMessage("Default address updated");
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Failed to update default address:", err);
      setModalMessage("Failed to update default address");
      setShowErrorModal(true);
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
                    onClick={() => handleDeleteClick(address._id)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-customGray3 mb-6">
              Are you sure you want to delete this address?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Success</h3>
              <p className="text-customGray3 mb-6">{modalMessage}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Error</h3>
              <p className="text-customGray3 mb-6">{modalMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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

export default ChangeAddress;