import { FormEvent, useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addProductCategory,
  CreateProductCategory,
  fetchAllCategories,
  ProductCategory,
  updateProductCategory,
} from "../../../../store/slices/adminDashboardSlice";

type ModalProps = { onClose: () => void; category?: ProductCategory };

const AddNewProductCategory = ({ onClose, category }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.adminDashboard);

  const isEdit = !!category;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (isEdit && category) {
      setFormData({ name: category.name });
    }
  }, [isEdit, category]);


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
    const name = formData.name.trim();
    if (!name) {
      alert("Please enter a category name");
      return;
    }

    try {
      if (isEdit && category) {
        await dispatch(
          updateProductCategory({ id: category._id, data: { name } })
        ).unwrap();
        await dispatch(fetchAllCategories());
      } else {
        const payload: CreateProductCategory = { name };
        await dispatch(addProductCategory(payload)).unwrap();
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
    ? loading.updateProductCategory
    : loading.addProductCategory;

  const currentError = isEdit
    ? error.updateProductCategory
    : error.addProductCategory;

  return (
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
      <h2 className="text-[24px] font-semibold text-customBrown pb-4">
        {isEdit ? "Edit Product Category" : "Add New Product Category"}
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
          placeholder="Product Category Name"
          required
        />

        <div className="flex justify-between gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="h-[58px] px-4 rounded-[16px] border"
          >
            Cancel
          </button>
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
        </div>
      </form>
    </section>
  );
};

export default AddNewProductCategory;
