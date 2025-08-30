import { FormEvent, useState } from "react";
import FormInput from "../../components/FormInput";
import FileUploader from "./FileUploader";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addProductCategory, CreateProductCategory } from "../../../../store/slices/adminDashboardSlice";

const AddNewProductCategory = () => {

  const [images, setImages] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.adminDashboard);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
  });
  const [image, setImage] = useState<string>(""); // Single image
  const [fileUploaded, setFileUploaded] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle single image upload
  function handleImageUpload(files: File[]): void {
    if (files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFileUploaded(true);
    }
  }

  // Handle image removal
  function handleRemoveImage(): void {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage("");
    setFileUploaded(false);
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert("Please enter a category name");
      return;
    }
    
    if (!image) {
      alert("Please upload an image");
      return;
    }

    // In a real app, you'd upload the image to your server/cloud storage first
    // and get back a URL. For now, we'll use the blob URL as placeholder
    // You might need to implement actual image upload logic here
    
    const categoryData: CreateProductCategory = {
      name: formData.name.trim(),
      images: image, // Single image URL
      isActive: true,
    };

    try {
      await dispatch(addProductCategory(categoryData)).unwrap();
      
      // Reset form on success
      setFormData({ name: "" });
      setImage("");
      setFileUploaded(false);
      
      alert("Category added successfully!");
    } catch (error) {
      console.error("Failed to add category:", error);
      // Error is already handled by Redux, but you can add additional handling here
    }
  };

  return (
    // <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
    //   <h2 className="text-[24px] font-semibold text-customBrown pb-4">
    //     Add New Product Category
    //   </h2>
    //   <form action="" className="space-y-4">
    //     <FormInput
    //       id="name"
    //       label="Name"
    //       name="name"
    //       placeholder="Product Category Name"
    //       required
    //     />

    //     <div className="w-full border py-4 flex justify-center rounded-[12px]">
    //       <div
    //         className={`w-[190px] h-[140px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
    //           fileUploaded
    //             ? "border border-primary"
    //             : "border border-primary border-dashed"
    //         }`}
    //       >
    //         <FileUploader
    //           onUpload={() => setFileUploaded(true)}
    //           onRemove={() => setFileUploaded(false)}
    //         />
    //       </div>
    //     </div>

    //     <button
    //       type="submit"
    //       className="bg-primary w-full h-[58px] rounded-[16px] font-semibold text-base text-customLight"
    //     >
    //       Continue
    //     </button>
    //   </form>
    // </section>
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
    <h2 className="text-[24px] font-semibold text-customBrown pb-4">
      Add New Product Category
    </h2>
    
    {error.addProductCategory && (
      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {error.addProductCategory}
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


      {/* <div className="w-full border py-4 flex justify-center rounded-[12px]">
        <div
          className={`w-[190px] h-[140px] flex items-center justify-center rounded-[12px] transition-all duration-300 relative ${
            fileUploaded
              ? "border border-primary"
              : "border border-primary border-dashed"
          }`}
        >
          {fileUploaded && image ? (
            <div className="relative w-full h-full">
              <img 
                src={image} 
                alt="Category preview" 
                className="w-full h-full object-cover rounded-[12px]"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <FileUploader
            onUpload={handleImageUpload}
              onRemove={handleRemoveImage}
            />
          )}
        </div>
      </div> */}

      <button
        type="submit"
        disabled={loading.addProductCategory}
        className={`w-full h-[58px] rounded-[16px] font-semibold text-base text-customLight transition-colors ${
          loading.addProductCategory 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {loading.addProductCategory ? "Adding Category..." : "Continue"}
      </button>
    </form>
  </section>
  );
};

export default AddNewProductCategory;
