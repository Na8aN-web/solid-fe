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
      alert("Please enter a category name");
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
    </section>
  );
};

export default AddNewProductBrand;
