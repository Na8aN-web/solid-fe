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

// Corrected interface matching your backend API schema
interface ProductFormData {
  // Basic product info
  name: string;
  briefDescription?: string;
  fullDescription?: string;
  description?: string; // Backend expects this field

  // Images
  imageFiles: File[];

  // Category and brand (form uses these names, but backend expects different names)
  categoryName: string; // Maps to 'category' in backend
  brandName: string; // Maps to 'brand' in backend

  // Additional product details
  partNumber?: string; // Backend expects this
  department?: string; // Backend expects this
  vehicleType?: string; // Backend expects this (you can map productType to this)
  productType?: string; // Keep this for your form

  // Physical properties
  weight?: string;
  length?: string;
  breadth?: string;
  width?: string;
  material?: string;

  // Inventory
  stockStatus?: string;
  stock?: number; // Maps to 'quantityInStock' in backend
  units?: string;
  sku?: string;
  minStock?: number;

  // Pricing - CORRECTED NAMES
  regularPrice: number;
  displayPrice: number; // Maps to 'salesPrice' in backend
  discount?: number;
  discountPrice?: number;

  // Remove these fields that don't exist in backend:
  // salesPrice?: number;           // This should be displayPrice
  // wholesaleRegularPrice?: number; // Not in backend schema
  // wholesaleSalesPrice?: number;   // Not in backend schema

  // Wholesale/bulk pricing
  minOrderQuantity?: number;
  tieredPricingType?: string;

  // Additional backend fields you might want to add to your form later
  store?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
}

// Alternative: Create a separate interface that exactly matches the backend
interface BackendProductData {
  _id?: string;
  store?: string;
  name: string;
  briefDescription?: string;
  fullDescription?: string;
  images?: string[];
  description?: string;
  partNumber?: string;
  category: string;
  department?: string;
  brand: string;
  vehicleType?: string;
  weight?: number;
  packageSize?: {
    length: number;
    breadth: number;
    width: number;
  };
  material?: string;
  stockStatus?: string;
  quantityInStock?: number;
  units?: string;
  sku?: string;
  minStock?: number;
  regularPrice: number;
  salesPrice: number;
  discount?: number;
  discountPrice?: number;
  minOrderQuantity?: number;
  tieredPricingType?: string;
  tieredPricing?: Array<{
    quantity: number;
    price: number;
  }>;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Updated form data initialization

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

  // Fixed form state initialization matching the corrected interface
  const [formData, setFormData] = useState<ProductFormData>({
    // Basic product info
    name: "",
    briefDescription: "",
    fullDescription: "",
    description: "",

    // Images
    imageFiles: [],

    // Category and brand
    categoryName: "",
    brandName: "",

    // Additional product details
    partNumber: "",
    department: "",
    vehicleType: "",
    productType: "",

    // Physical properties
    weight: "",
    length: "",
    breadth: "",
    width: "",
    material: "",

    // Inventory
    stockStatus: "",
    stock: 0,
    units: "",
    sku: "",
    minStock: 10,

    // Pricing - CORRECTED (removed fields not in backend)
    regularPrice: 0,
    displayPrice: 0, // This maps to salesPrice in backend
    discount: 0,
    discountPrice: 0,

    // Wholesale/bulk pricing
    minOrderQuantity: 1,
    tieredPricingType: "",

    // Additional backend fields
    store: "",
    isFeatured: false,
    isNewArrival: false,
    isDealOfTheDay: false,
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
  const handleImageUpload = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, file],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
    }));
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

 // Update your validateForm to be less strict temporarily
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};

  if (!formData.name?.trim()) {
    newErrors.name = "Product name is required";
  }

  if (!formData.regularPrice || formData.regularPrice <= 0) {
    newErrors.regularPrice = "Regular price must be greater than 0";
  }

  if (!formData.displayPrice || formData.displayPrice <= 0) {
    newErrors.displayPrice = "Display price must be greater than 0";
  }

  if (!formData.categoryName?.trim()) {
    newErrors.categoryName = "Category is required";
  }

  if (!formData.brandName?.trim()) {
    newErrors.brandName = "Brand name is required";
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
    // Create FormData object
    const formDataToSend = new FormData();
    
    // ABSOLUTELY REQUIRED FIELDS FIRST
    formDataToSend.append('name', formData.name.trim());
    formDataToSend.append('category', formData.categoryName.trim());
    formDataToSend.append('brand', formData.brandName.trim());
    formDataToSend.append('regularPrice', formData.regularPrice.toString());
    formDataToSend.append('salesPrice', formData.displayPrice.toString());
    
    // DESCRIPTION FIELDS (your backend might require at least one)
    const briefDesc = formData.briefDescription?.trim() || '';
    const fullDesc = formData.fullDescription?.trim() || '';
    const description = briefDesc || fullDesc || `${formData.name} - Product description`;
    
    formDataToSend.append('briefDescription', briefDesc);
    formDataToSend.append('fullDescription', fullDesc);
    formDataToSend.append('description', description); // Fallback description
    
    // INVENTORY FIELDS (might be required)
    formDataToSend.append('quantityInStock', (formData.stock ?? 0).toString());
    formDataToSend.append('stockStatus', formData.stockStatus || 'In Stock');
    
    // CREATOR FIELD (likely required for audit)
    formDataToSend.append('createdBy', 'admin-user-id');
    
    // ADDITIONAL FIELDS YOUR BACKEND EXPECTS
    formDataToSend.append('partNumber', formData.sku || ''); // Use SKU as partNumber
    formDataToSend.append('department', formData.department || 'General');
    formDataToSend.append('vehicleType', formData.productType || 'Universal');
    formDataToSend.append('store', 'default-store-id');
    
    // PHYSICAL PROPERTIES
    formDataToSend.append('weight', formData.weight ? parseFloat(formData.weight).toString() : '0');
    formDataToSend.append('material', formData.material || '');
    
    // PACKAGE SIZE (as JSON object - your backend expects this structure)
    const packageSize = {
      length: parseFloat(formData.length || '0'),
      breadth: parseFloat(formData.breadth || '0'),
      width: parseFloat(formData.width || '0'),
    };
    formDataToSend.append('packageSize', JSON.stringify(packageSize));
    
    // INVENTORY DETAILS
    formDataToSend.append('units', formData.units || 'pcs');
    formDataToSend.append('sku', formData.sku || '');
    formDataToSend.append('minStock', (formData.minStock ?? 0).toString());
    
    // PRICING DETAILS
    formDataToSend.append('discount', (formData.discount ?? 0).toString());
    formDataToSend.append('discountPrice', (formData.discountPrice ?? 0).toString());
    formDataToSend.append('minOrderQuantity', (formData.minOrderQuantity ?? 1).toString());
    formDataToSend.append('tieredPricingType', formData.tieredPricingType || 'Fixed');
    
    // TIERED PRICING
    const tieredPricingData = tieredPrices.map((tier) => ({
      quantity: tier.quantity || 0,
      price: tier.price || 0,
    }));
    formDataToSend.append('tieredPricing', JSON.stringify(tieredPricingData));
    
    // BOOLEAN FLAGS (convert to strings)
    formDataToSend.append('rating', '0');
    formDataToSend.append('numReviews', '0');
    formDataToSend.append('isFeatured', 'false');
    formDataToSend.append('isNewArrival', 'false');
    formDataToSend.append('isDealOfTheDay', 'false');
    
    // IMAGES (must be last)
    if (formData.imageFiles && formData.imageFiles.length > 0) {
      formData.imageFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });
    }

    // ENHANCED DEBUG LOGGING
    console.log('=== ENHANCED FormData Debug ===');
    console.log('Form validation passed:', !validateForm());
    console.log('Image files count:', formData.imageFiles?.length || 0);
    
    // Check for empty required fields
    const requiredFields = ['name', 'category', 'brand', 'regularPrice', 'salesPrice'];
    const emptyFields: string[] = [];
    
    const entries = Array.from(formDataToSend.entries());
    entries.forEach(([key, value]) => {
      if (requiredFields.includes(key)) {
        if (value instanceof File) {
          console.log(`${key}:`, `File(${value.name}, ${value.size} bytes)`);
        } else {
          console.log(`${key}:`, `"${value}" (length: ${value.toString().length})`);
          if (!value || value.toString().trim() === '' || value === '0') {
            emptyFields.push(key);
          }
        }
      } else if (value instanceof File) {
        console.log(`${key}:`, `File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`${key}:`, value);
      }
    });
    
    if (emptyFields.length > 0) {
      console.error('EMPTY REQUIRED FIELDS:', emptyFields);
      alert(`The following required fields are empty: ${emptyFields.join(', ')}`);
      return;
    }
    
    // Check if images are present
    const hasImages = entries.some(([key]) => key === 'images');
    if (!hasImages) {
      console.error('NO IMAGES FOUND IN FORM DATA');
      alert('At least one image is required');
      return;
    }
    
    console.log('Total FormData entries:', entries.length);
    console.log('===============================');

    // Make the API call
    const result = await dispatch(addProduct(formDataToSend)).unwrap();
    console.log('Product created successfully:', result);
    alert("Product added successfully!");
    navigate("/admin/products");
    
  } catch (error: any) {
    console.error("=== API ERROR DEBUG ===");
    console.error("Full error object:", error);
    
    if (error?.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    }
    
    if (error?.request) {
      console.error("Request made but no response:", error.request);
    }
    
    console.error("=====================");
    
    const errorMessage =
      error?.message ||
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.toString() ||
      "Unknown error";
      
    alert(`Failed to add product: ${errorMessage}`);
  }
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
                {/* First large image slot */}
                <div
                  className={`w-full h-[198px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
                    formData.imageFiles && formData.imageFiles.length > 0
                      ? "border border-primary"
                      : "border border-primary border-dashed"
                  }`}
                >
                  {formData.imageFiles && formData.imageFiles[0] ? (
                    <div className="w-full h-full relative">
                      <img
                        src={URL.createObjectURL(formData.imageFiles[0])}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(0)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <FileUploader
                      onUpload={handleImageUpload}
                      onRemove={() => {}}
                    />
                  )}
                </div>

                {/* Second large image slot */}
                <div
                  className={`w-full h-[198px] flex items-center justify-center rounded-[12px] transition-all duration-300 ${
                    formData.imageFiles && formData.imageFiles.length > 1
                      ? "border border-primary"
                      : "border border-primary border-dashed"
                  }`}
                >
                  {formData.imageFiles && formData.imageFiles[1] ? (
                    <div className="w-full h-full relative">
                      <img
                        src={URL.createObjectURL(formData.imageFiles[1])}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(1)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <FileUploader
                      onUpload={handleImageUpload}
                      onRemove={() => {}}
                    />
                  )}
                </div>

                {/* Small image slots */}
                <div className="flex justify-between items-center flex-col gap-4">
                  <div
                    className={`w-[161px] h-[87px] flex items-center justify-center rounded-[12px] ${
                      formData.imageFiles && formData.imageFiles.length > 2
                        ? "border border-primary"
                        : "border border-primary border-dashed"
                    }`}
                  >
                    {formData.imageFiles && formData.imageFiles[2] ? (
                      <div className="w-full h-full relative">
                        <img
                          src={URL.createObjectURL(formData.imageFiles[2])}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(2)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <FileUploader
                        onUpload={handleImageUpload}
                        onRemove={() => {}}
                      />
                    )}
                  </div>

                  <div
                    className={`w-[161px] h-[87px] border border-primary flex items-center justify-center rounded-[12px] ${
                      formData.imageFiles && formData.imageFiles.length > 3
                        ? "border border-primary"
                        : "border border-primary border-dashed"
                    }`}
                  >
                    {formData.imageFiles && formData.imageFiles[3] ? (
                      <div className="w-full h-full relative">
                        <img
                          src={URL.createObjectURL(formData.imageFiles[3])}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(3)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <FileUploader
                        onUpload={handleImageUpload}
                        onRemove={() => {}}
                      />
                    )}
                  </div>
                </div>
              </div>
              {errors.imageFiles && (
                <p className="text-red-500 text-sm mt-2">{errors.imageFiles}</p>
              )}
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
                {/* <div className="flex gap-6 items-center mb-6">
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
                </div> */}
                <div className="flex flex-col">
                  <label
                    htmlFor="department"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g., Auto Parts, Electronics"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  />
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
