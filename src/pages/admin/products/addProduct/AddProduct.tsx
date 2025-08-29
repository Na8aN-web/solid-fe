import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import { Plus, ArrowLeft, Ban, CalendarCheck, CircleX } from "lucide-react";
import circleX from "../../../../assets/circleX.svg";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  CreateProductData,
} from "../../../../store/slices/adminDashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

interface ProductFormData {
  name: string;
  displayPrice: number;
  regularPrice: number;
  images: string[];
  categoryName: string;
  brandName: string;
  // Additional fields for your comprehensive form
  briefDescription?: string;
  fullDescription?: string;
  weight?: string;
  length?: string;
  breadth?: string;
  width?: string;
  material?: string;
  productType?: string;
  stockStatus?: string;
  stock?: number;
  units?: string;
  sku?: string;
  minStock?: number;
  salesPrice?: number;
  discount?: number;
  discountPrice?: number;
  // Wholesale fields
  wholesaleRegularPrice?: number;
  wholesaleSalesPrice?: number;
  minOrderQuantity?: number;
  tieredPricingType?: string;
}

interface TieredPrice {
  id: string;
  quantity: number;
  price: number;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [fileUploaded, setFileUploaded] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.adminDashboard);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    displayPrice: 0,
    regularPrice: 0,
    images: [],
    categoryName: "",
    brandName: "",
    briefDescription: "",
    fullDescription: "",
    weight: "",
    length: "",
    breadth: "",
    width: "",
    material: "",
    productType: "",
    stockStatus: "",
    stock: 0,
    units: "",
    sku: "",
    minStock: 10,
    salesPrice: 0,
    discount: 0,
    discountPrice: 0,
    wholesaleRegularPrice: 0,
    wholesaleSalesPrice: 0,
    minOrderQuantity: 1,
    tieredPricingType: "",
  });

  const [tieredPrices, setTieredPrices] = useState<TieredPrice[]>([
    { id: "1", quantity: 0, price: 0 },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Convert numeric fields
    const numericFields = [
      "displayPrice",
      "regularPrice",
      "stock",
      "minStock",
      "salesPrice",
      "discount",
      "discountPrice",
      "wholesaleRegularPrice",
      "wholesaleSalesPrice",
      "minOrderQuantity",
    ];
    const finalValue = numericFields.includes(name)
      ? parseFloat(value) || 0
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Image compression utility
  const compressImage = (
    file: File,
    maxWidth: number = 800,
    quality: number = 0.8
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Convert base64 to smaller format
  const optimizeBase64Image = (
    base64: string,
    maxSizeKB: number = 500
  ): string => {
    // If image is too large, reduce quality
    let quality = 0.8;
    let result = base64;

    while (result.length > maxSizeKB * 1024 && quality > 0.1) {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.src = base64;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      result = canvas.toDataURL("image/jpeg", quality);
      quality -= 0.1;
    }

    return result;
  };

  // Updated handleImageUpload with compression
  // Simple image handler
  const handleImageUpload = (imageData: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageData],
    }));
    setFileUploaded(true);
  };

  const handleRemoveImage = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imageUrl),
    }));

    if (formData.images.length <= 1) {
      setFileUploaded(false);
    }
  };

  // const handleRemoveImage = (url: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     images: prev.images.filter((img) => img !== url),
  //   }));
  // };

  // const handleImageUpload = (imageData: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     image: imageData,
  //   }));
  //   setFileUploaded(true);
  // };

  const addTieredPrice = () => {
    const newId = (tieredPrices.length + 1).toString();
    setTieredPrices([...tieredPrices, { id: newId, quantity: 0, price: 0 }]);
  };

  const removeTieredPrice = (id: string) => {
    setTieredPrices(tieredPrices.filter((tier) => tier.id !== id));
  };

  const updateTieredPrice = (
    id: string,
    field: "quantity" | "price",
    value: number
  ) => {
    setTieredPrices(
      tieredPrices.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    // Fix validation field names
    if (formData.displayPrice <= 0) {
      newErrors.displayPrice = "Display price must be greater than 0";
    }

    if (formData.regularPrice <= 0) {
      newErrors.regularPrice = "Regular price must be greater than 0";
    }

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = "Category is required";
    }

    if (!formData.brandName.trim()) {
      newErrors.brandName = "Brand name is required";
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "At least one product image is required"; // Fixed field name
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fix the form errors before submitting");
      return;
    }

    try {
      // Debug: Log the current form data
      console.log("Current form data:", formData);

      const productData: CreateProductData = {
        name: formData.name,
        briefDescription: formData.briefDescription || "",
        fullDescription: formData.fullDescription || "",
        images: formData.images,
        regularPrice: formData.regularPrice,
        salesPrice: formData.displayPrice, // ✅ map displayPrice -> salesPrice
        category: formData.categoryName, // ✅ map categoryName -> category
        brand: formData.brandName, // ✅ map brandName -> brand
        stockStatus: formData.stockStatus || "In Stock",
        quantityInStock: formData.stock ?? 0, // ✅ map stock -> quantityInStock
        units: formData.units,
        sku: formData.sku,
        minStock: formData.minStock ?? 0,
        weight: parseFloat(formData.weight || "0"),
        packageSize: {
          length: parseFloat(formData.length || "0"),
          breadth: parseFloat(formData.breadth || "0"),
          width: parseFloat(formData.width || "0"),
        },
        material: formData.material,
        discount: formData.discount,
        discountPrice: formData.discountPrice,
        minOrderQuantity: formData.minOrderQuantity ?? 0,
        tieredPricingType: formData.tieredPricingType || "Fixed",
        tieredPricing: tieredPrices.map((tier) => ({
          quantity: tier.quantity,
          price: tier.price,
        })),
        rating: 0,
        numReviews: 0,
        isFeatured: false,
        isNewArrival: false,
        isDealOfTheDay: false,
        createdBy: "admin-user-id", // ✅ required
        store: "your-store-id", // ✅ optional, but schema allows it
      };

      // Debug: Log what we're sending
      console.log(
        "Sending product data:",
        JSON.stringify(productData, null, 2)
      );

      // Validate required fields before sending
      const requiredFields = {
        name: productData.name,
        regularPrice: productData.regularPrice,
        salesPrice: productData.salesPrice,
        images: productData.images,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(
          ([key, value]) =>
            !value || (Array.isArray(value) && value.length === 0)
        )
        .map(([key]) => key);

      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields);
        alert(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }

      await dispatch(addProduct(productData)).unwrap();
      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error: any) {
      console.error("Error adding product:", error);

      // Better error handling
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        error?.toString() ||
        "Unknown error";
      alert(`Failed to add product: ${errorMessage}`);
    }
    console.log("Form data before submit:", {
      images: formData.images,
      imageCount: formData.images.length,
    });
  };

  const handleDiscard = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to discard all changes?"
    );
    if (isConfirmed) {
      navigate("/admin/products");
    }
  };

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
                    onUpload={handleImageUpload}
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
                    onUpload={handleImageUpload}
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
                      onUpload={handleImageUpload}
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
                      onUpload={handleImageUpload}
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
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="briefDescription"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Brief Description
                  </label>
                  <textarea
                    name="briefDescription"
                    id="briefDescription"
                    value={formData.briefDescription}
                    onChange={handleInputChange}
                    className="border w-full p-3 rounded-[8px] border-[#D9D9D9] focus:border-gray-600 focus:outline-none"
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
                    name="fullDescription"
                    id="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    className="border w-full p-3 rounded-[8px] border-[#D9D9D9] focus:border-gray-600 focus:outline-none"
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
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
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
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
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
                        name="breadth"
                        value={formData.breadth}
                        onChange={handleInputChange}
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
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
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
                    Product Material
                  </label>
                  <input
                    type="text"
                    id="productMaterial"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
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
                        Product Category *
                      </label>
                      <input
                        type="text"
                        id="productCategory"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleInputChange}
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                      {errors.categoryName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.categoryName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="brandName"
                        className="text-sm font-normal text-customBrown pb-2"
                      >
                        Brand Name *
                      </label>
                      <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleInputChange}
                        className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                      />
                      {errors.brandName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.brandName}
                        </p>
                      )}
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
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
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
                      name="stockStatus"
                      value={formData.stockStatus}
                      onChange={handleInputChange}
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
                      type="number"
                      id="quantityInStock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
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
                      name="units"
                      value={formData.units}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="sku"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      SKU (Optional)
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
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
                    type="number"
                    id="minStock"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
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
                      Regular Price (₦) *
                    </label>
                    <input
                      type="number"
                      id="regularPrice"
                      name="regularPrice"
                      value={formData.regularPrice}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                    {errors.regularPrice && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.regularPrice}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="salesPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Display Price (₦) *
                    </label>
                    <input
                      type="number"
                      id="salesPrice"
                      name="displayPrice"
                      value={formData.displayPrice}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                    {errors.displayPrice && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.displayPrice}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="discount"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Discount % (Optional)
                    </label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
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
                      type="number"
                      id="discountPrice"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
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
                      htmlFor="wholesaleRegularPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Regular Price (₦)
                    </label>
                    <input
                      type="number"
                      id="wholesaleRegularPrice"
                      name="wholesaleRegularPrice"
                      value={formData.wholesaleRegularPrice}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="wholesaleSalesPrice"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Sales Price (₦)
                    </label>
                    <input
                      type="number"
                      id="wholesaleSalesPrice"
                      name="wholesaleSalesPrice"
                      value={formData.wholesaleSalesPrice}
                      onChange={handleInputChange}
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
                      Minimum Order Quantity
                    </label>
                    <input
                      type="number"
                      id="minOrderQuantity"
                      name="minOrderQuantity"
                      value={formData.minOrderQuantity}
                      onChange={handleInputChange}
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
                      name="tieredPricingType"
                      value={formData.tieredPricingType}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-customBrown mb-[8px] pb-4">
                    Tiered Price
                  </h3>
                  {tieredPrices.map((tier) => (
                    <div key={tier.id} className="flex gap-6 items-center mb-6">
                      <div className="flex flex-col w-full">
                        <label className="text-sm font-normal text-customBrown pb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={tier.quantity}
                          onChange={(e) =>
                            updateTieredPrice(
                              tier.id,
                              "quantity",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label className="text-sm font-normal text-customBrown pb-2">
                          Price (₦)
                        </label>
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) =>
                            updateTieredPrice(
                              tier.id,
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                        />
                      </div>
                      {tieredPrices.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTieredPrice(tier.id)}
                          className="mt-6"
                        >
                          <img src={circleX} alt="Remove tier" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addTieredPrice}
                  className="w-[107px] border border-primary flex gap-1 items-center py-3 px-2 rounded-[6px] hover:bg-primary text-sm font-semibold text-primary hover:text-white"
                >
                  <Plus className="w-4" />
                  <span>New tier</span>
                </button>
              </div>
            </section>

            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleDiscard}
                className="w-[100px] border border-[#D9D9D9] flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-red-50 text-sm font-semibold text-gray-600 hover:text-red-600"
              >
                <Ban className="w-4" />
                <span>Discard</span>
              </button>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  className="w-[115px] border border-primary flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-primary text-sm font-semibold text-primary hover:text-white"
                >
                  <CalendarCheck className="w-6" />
                  <span>Schedule</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading.products}
                  className="w-[130px] border border-primary bg-primary flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-blue-700 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4" />
                  <span>{loading.products ? "Adding..." : "Add Product"}</span>
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
