import { useState } from "react";
import FormInput from "../../components/FormInput";
import FileUploader from "./FileUploader";

const AddNewProductCategory = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  function handleImageUpload(files: File[]): void {
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
    setFileUploaded(true);
  }

  function handleRemoveImage(url: string): void {
    setImages((prev) => prev.filter((img) => img !== url));
    if (images.length <= 1) {
      setFileUploaded(false);
    }
  }

  return (
    <section className="absolute right-5 w-[500px] bg-customLight border pt-14 px-7 pb-10 rounded-[16px]">
      <h2 className="text-[24px] font-semibold text-customBrown pb-4">
        Add New Product Category
      </h2>
      <form action="" className="space-y-4">
        <FormInput
          id="name"
          label="Name"
          name="name"
          placeholder="Product Category Name"
          required
        />

        <div className="w-full border py-4 flex justify-center rounded-[12px]">
          <div
            className={`w-[190px] h-[140px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
              fileUploaded
                ? "border border-primary"
                : "border border-primary border-dashed"
            }`}
          >
            <FileUploader
              onUpload={() => setFileUploaded(true)}
              onRemove={() => setFileUploaded(false)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary w-full h-[58px] rounded-[16px] font-semibold text-base text-customLight"
        >
          Continue
        </button>
      </form>
    </section>
  );
};

export default AddNewProductCategory;
