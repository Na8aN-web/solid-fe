import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { Plus, ArrowLeft, Ban, CalendarCheck, CircleX } from "lucide-react";
import circleX from "../../../../assets/circleX.svg";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <AdminLayout pageTitle="">
      <div className="p-6">
        <div className="flex gap-2 items-center text-xl font-semibold text-customBrown mb-8">
          <button onClick={() => navigate("/admin/products")}>
            <ArrowLeft />
          </button>
          <h1>Add Product</h1>
        </div>
        <section className="flex w-ful justify-between gap-4">
          {/* Product Images */}
          <div className="w-[55%]">
            <section className="mb-6">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Product Images
              </h2>
              <div className="flex items-center gap-4 border border-[#D9D9D9] rounded-[12px] w-full p-4">
                <div
                  className={`w-full h-[198px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
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
                <div
                  className={`w-full h-[198px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
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
                <div className="flex justify-between items-center flex-col gap-4">
                  <div
                    className={`w-[161px] h-[87px] flex items-center justify-center rounded-[12px] ${
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
                  <div
                    className={`w-[161px] h-[87px] border border-primary flex items-center justify-center rounded-[12px] ${
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
              </div>
            </section>
            {/* Description */}
            <section className="mb-8">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Description
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="productName"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="briefDescription"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Brief Description
                  </label>
                  <textarea
                    name=""
                    id="briefDescription"
                    className="border w-full p-3 rounded-[8px]"
                    rows={3}
                  ></textarea>
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="fullDescription"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Full Description
                  </label>
                  <textarea
                    name=""
                    id="fullDescription"
                    className="border w-full p-3 rounded-[8px]"
                    rows={6}
                  ></textarea>
                </div>
              </div>
            </section>
            {/* Specifications */}
            <section className="mb-8">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Specifications
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="productWeight"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Product Weight
                  </label>
                  <input
                    type="text"
                    id="productWeight"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
                </div>
                {/* package size */}
                <div>
                  <h3 className="text-sm font-semibold text-customBrown pb-4">
                    Package size
                  </h3>
                  <div className="flex gap-6 items-center mb-6">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="length"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Length
                      </label>
                      <input
                        type="text"
                        id="length"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="breadth"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Breadth
                      </label>
                      <input
                        type="text"
                        id="breadth"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="width"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Width
                      </label>
                      <input
                        type="text"
                        id="width"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>
                {/* product material */}
                <div className="flex flex-col">
                  <label
                    htmlFor="productMaterial"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Product Weight
                  </label>
                  <input
                    type="text"
                    id="productMaterial"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
                </div>
              </div>
            </section>
            {/* Category */}
            <section>
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Category
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div>
                  <div className="flex gap-6 items-center mb-6">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="productCategory"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Product Category
                      </label>
                      <input
                        type="text"
                        id="productCategory"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="brandName"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Brand Name
                      </label>
                      <input
                        type="text"
                        id="brandName"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="productType"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Product Type
                  </label>
                  <input
                    type="text"
                    id="productType"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
                </div>
              </div>
            </section>
          </div>
          {/* second */}
          <div className="w-[45%]">
            {/* Inventory */}
            <section className="mb-8">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Inventory
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex gap-6 items-center mb-6">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="stockStatus"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Stock Status
                    </label>
                    <input
                      type="text"
                      id="stockStatus"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="quantityInStock"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Quantity in Stock
                    </label>
                    <input
                      type="text"
                      id="quantityInStock"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex gap-6 items-center mb-6">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="units"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Units
                    </label>
                    <input
                      type="text"
                      id="units"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="sku"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      SKU(Optional)
                    </label>
                    <input
                      type="text"
                      id="sku"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="minStock"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Minimum Stock
                  </label>
                  <input
                    type="text"
                    id="minStock"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
                </div>
              </div>
            </section>
            {/* Pricing */}
            <section className="mb-8">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Pricing
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex gap-6 items-center mb-6">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="regularPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Regular Price (₦)
                    </label>
                    <input
                      type="text"
                      id="regularPrice"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="salesPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Sales Price (₦)
                    </label>
                    <input
                      type="text"
                      id="salesPrice"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="discount"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Discount(Optional)
                    </label>
                    <input
                      type="text"
                      id="discount"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="discountPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Discount Price (₦)
                    </label>
                    <input
                      type="text"
                      id="discountPrice"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* Wholesale Pricing */}
            <section className="mb-8">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Wholesale Pricing
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex gap-6 items-center mb-6">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="regularPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Regular Price (₦)
                    </label>
                    <input
                      type="text"
                      id="regularPrice"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="salesPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Sales Price (₦)
                    </label>
                    <input
                      type="text"
                      id="salesPrice"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex gap-6 items-center mb-6">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="minOrderQuantity"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Minimum Order Qunantity
                    </label>
                    <input
                      type="text"
                      id="minOrderQuantity"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="pricingType"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Tiered Pricing Type
                    </label>
                    <input
                      type="text"
                      id="pricingType"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-customBrown mb-[8px] pb-4">
                    Tiered Price
                  </h3>
                  <div className="flex gap-6 items-center mb-6">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor=""
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="price"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Price (₦)
                      </label>
                      <input
                        type="text"
                        id="price"
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                    </div>
                    <img src={circleX} alt="cancel" />
                  </div>
                  {/* <div className="flex gap-6 items-center mb-6">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="quantity"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="price"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Price (₦)
                    </label>
                    <input
                      type="text"
                      id="price"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div> */}
                  {/* <div className="flex gap-4 items-center mb-8">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="quantity"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="price"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Price (₦)
                    </label>
                    <input
                      type="text"
                      id="price"
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div> */}
                </div>
                <button className="w-[107px] border border-primary flex gap-1 items-center py-3 px-2 rounded-[6px] hover:bg-primary text-sm font-semibold text-primary hover:text-white">
                  <Plus className="w-4" />
                  <span>New tier</span>
                </button>
              </div>
            </section>
            <div className="flex items-center justify-between">
              <button className="w-[100px] border border-[#D9D9D9] flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-primary text-sm font-semibold text-primary hover:text-white">
                <Ban className="w-4" />
                <span>Discard</span>
              </button>
              <div className="flex items-center gap-5">
                <button className="w-[115px] border border-primary flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-primary text-sm font-semibold text-primary hover:text-white">
                  <CalendarCheck className="w-6" />
                  <span>Schedule</span>
                </button>
                <button className="w-[130px] border border-primary bg-primary flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-white text-sm font-semibold text-white hover:text-primary">
                  <Plus className="w-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
