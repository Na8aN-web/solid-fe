// import { FormEvent, useState, useEffect } from "react";
// import FormInput from "../../components/FormInput"; // Update path as needed
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import {
//   createDepartment,
//   updateDepartment,
//   fetchDepartments,
// } from "../../../../store/slices/departmentSlice";
// import { Department } from "../../../../services/departments/types";

// type ModalProps = { onClose: () => void; department?: Department };

// const AddNewDepartment = ({ onClose, department }: ModalProps) => {
//   const dispatch = useAppDispatch();
//   const { loading, error } = useAppSelector((state) => state.departments);

//   const isEdit = !!department;

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//   });

//   useEffect(() => {
//     if (isEdit && department) {
//       setFormData({ name: department.name });
//     }
//   }, [isEdit, department]);

//   // Handle form input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Validation
//     const name = formData.name.trim();
//     if (!name) {
//       alert("Please enter a department name");
//       return;
//     }

//     try {
//       if (isEdit && department) {
//         await dispatch(
//           updateDepartment({ id: department._id, departmentData: { name } })
//         ).unwrap();
//         await dispatch(fetchDepartments());
//       } else {
//         await dispatch(createDepartment({ name })).unwrap();
//       }
//       onClose();
//     } catch (err) {
//       console.error(
//         isEdit ? "Failed to update department:" : "Failed to add department:",
//         err
//       );
//     }
//   };

//   return (
//     <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
//       <h2 className="text-[24px] font-semibold text-customBrown pb-4">
//         {isEdit ? "Edit Department" : "Add New Department"}
//       </h2>

//       {error && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <FormInput
//           id="name"
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           placeholder="Department Name"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`flex-1 h-[58px] rounded-[16px] font-semibold text-base text-customLight transition-colors w-full ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-primary hover:bg-primary/90"
//           }`}
//         >
//           {isEdit
//             ? loading
//               ? "Saving…"
//               : "Save Changes"
//             : loading
//               ? "Adding…"
//               : "Continue"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AddNewDepartment;

import { FormEvent, useState, useEffect } from "react";
import FormInput from "../../components/FormInput"; // Update path as needed
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  createDepartment,
  updateDepartment,
  fetchDepartments,
} from "../../../../store/slices/departmentSlice";
import {Department } from "../../../../services/departments/types";  

type ModalProps = { onClose: () => void; department?: Department };

const AddNewDepartment = ({ onClose, department }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.departments);

  const isEdit = !!department;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (isEdit && department) {
      setFormData({ name: department.name });
    }
  }, [isEdit, department]);

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
      alert("Please enter a department name");
      return;
    }

    try {
      if (isEdit && department) {
        await dispatch(
          updateDepartment({ id: department._id, departmentData: { name } })
        ).unwrap();
        await dispatch(fetchDepartments());
      } else {
        await dispatch(createDepartment({ name })).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(
        isEdit ? "Failed to update department:" : "Failed to add department:",
        err
      );
    }
  };

  return (
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
      <h2 className="text-[24px] font-semibold text-customBrown pb-4">
        {isEdit ? "Edit Department" : "Add New Department"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="name"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Department Name"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`flex-1 h-[58px] rounded-[16px] font-semibold text-base text-customLight transition-colors w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isEdit
            ? loading
              ? "Saving…"
              : "Save Changes"
            : loading
              ? "Adding…"
              : "Continue"}
        </button>
      </form>
    </section>
  );
};

export default AddNewDepartment;