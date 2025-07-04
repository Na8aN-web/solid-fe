import React from "react";
import FileUploader from "./components/FileUploader";

const AddProduct = () => {
  return (
    <div>
      <div>
        <h1>Add Product</h1>
      </div>
      <section>
        <div>
          <section className="flex items-center gap-4 border border-[#D9D9D9] rounded-[12px] w-fit p-4">
            <div className="w-[173px] h-[198px] border border-primary flex items-center justify-center rounded-[12px]">
              <FileUploader />
            </div>
            <div className="w-[173px] h-[198px] border border-primary flex items-center justify-center rounded-[12px]">
              <FileUploader />
            </div>
            <div className="flex justify-between items-center flex-col gap-4">
              <div className="w-[161px] h-[87px] border border-primary flex items-center justify-center rounded-[12px]">
                <FileUploader />
              </div>
              <div className="w-[161px] h-[87px] border border-primary flex items-center justify-center rounded-[12px]">
                <FileUploader />
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
