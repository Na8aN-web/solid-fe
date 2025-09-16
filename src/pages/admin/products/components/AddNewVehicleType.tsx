import { FormEvent, useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  addProductVehicleType,
  CreateProductVehicleType,
  fetchAllVehiclesType,
  ProductVehicleType,
  updateProductVehicleType,
} from "../../../../store/slices/adminDashboardSlice";

type ModalProps = { onClose: () => void; vehicle?: ProductVehicleType };

const AddNewVehicleType = ({ onClose, vehicle }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.adminDashboard);

  const isEdit = !!vehicle;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (isEdit && vehicle) {
      setFormData({ name: vehicle.name });
    }
  }, [isEdit, vehicle]);

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
      if (isEdit && vehicle) {
        await dispatch(
          updateProductVehicleType({ id: vehicle._id, data: { name } })
        ).unwrap();
        await dispatch(fetchAllVehiclesType());
      } else {
        const payload: CreateProductVehicleType = { name };
        await dispatch(addProductVehicleType(payload)).unwrap();
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
  ? loading.updateProductVehicleType
  : loading.addProductVehicleType;

const currentError = isEdit
  ? error.updateProductVehicleType
  : error.addProductVehicleType;  

  return (
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
      <h2 className="text-[24px] font-semibold text-customBrown pb-4">
        {isEdit ? "Edit Product Vehicle" : "Add New Product Vehicle"}
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
          placeholder="Product Vehicle Name"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full h-[58px] rounded-[16px] font-semibold text-base text-customLight transition-colors ${
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

export default AddNewVehicleType;
