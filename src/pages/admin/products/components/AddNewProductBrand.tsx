import { FormEvent, useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addProductBrand,
  CreateProductBrand,
  fetchAllBrands,
  ProductBrand,
  updateProductBrand,
} from "../../../../store/slices/adminDashboardSlice";

type ModalProps = { onClose: () => void; brand?: ProductBrand };

const AddNewProductBrand = ({ onClose, brand }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.adminDashboard);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isEdit = !!brand;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (isEdit && brand) {
      setFormData({ name: brand.name });
    }
  }, [isEdit, brand]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const name = formData.name.trim();
    if (!name) {
      setModalMessage("Please enter a category name");
      setShowAlertModal(true);
      return;
    }

    try {
      if (isEdit && brand) {
        await dispatch(
          updateProductBrand({ id: brand._id, data: { name } })
        ).unwrap();
        await dispatch(fetchAllBrands());
      } else {
        const payload: CreateProductBrand = { name };
        await dispatch(addProductBrand(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(
        isEdit ? "Failed to update category:" : "Failed to add category:",
        err
      );
    }
  };

  const isLoading = isEdit
    ? loading.updateProductBrand
    : loading.addProductBrand;

  const currentError = isEdit
    ? error.updateProductBrand
    : error.addProductBrand;

  return (
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
      <h2 className="text-[24px] font-semibold text-customBrown pb-4">
        {isEdit ? "Edit Product Brand" : "Add New Product Brand"}
      </h2>

      {currentError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {currentError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Product Brand Name"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 h-[58px] rounded-[16px] font-semibold text-base text-customLight transition-colors w-full ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isEdit
            ? isLoading
              ? "Saving…"
              : "Save Changes"
            : isLoading
            ? "Adding…"
            : "Continue"}
        </button>
      </form>

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAlertModal(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <svg 
                  className="h-6 w-6 text-yellow-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {modalMessage}
              </h3>
              <button
                onClick={() => setShowAlertModal(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddNewProductBrand;