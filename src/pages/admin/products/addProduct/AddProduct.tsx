// src/pages/admin/products/addProduct/AddProduct.tsx
import React, { useEffect, useMemo, useState } from "react";
import FileUploader from "../components/FileUploader";
import { Plus, ArrowLeft, Ban, CalendarCheck } from "lucide-react";
import circleX from "../../../../assets/circleX.svg";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  fetchAllBrands,
  fetchAllCategories,
  fetchAllVehiclesType,
  updateProduct,
  fetchProductById,
  fetchAllDepartments,
  // fetchAllProducts
} from "../../../../store/slices/adminDashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchProducts } from "../../../../store/slices/productSlice";

// ---- Types ----
interface ProductFormData {
  // Basic product info
  name: string;
  briefDescription?: string;
  fullDescription?: string;
  description?: string;

  // Images (Files)
  imageFiles: (File | null)[]; // 4 fixed slots
  existingImages?: string[]; // URLs of existing images

  // IDs selected in UI
  selectedCategoryId: string;
  selectedBrandId: string;
  selectedVehicleTypeId?: string;
  selectedDepartmentId?: string;

  // Additional product details
  partNumber?: string;

  // Physical properties)
  weight?: string;
  length?: string;
  breadth?: string;
  width?: string;
  material?: string;

  // Inventory
  stockStatus?: "In Stock" | "Out of Stock"; // "In Stock"
  stock?: number | string;
  units?: string;
  sku?: string;
  minStock?: number | string;

  // Pricing
  regularPrice: number | string;
  displayPrice: number | string; // -> salesPrice
  discount?: number | string;
  discountPrice?: number | string;

  // Wholesale / bulk
  minOrderQuantity?: number | string;
  tieredPricingType?: "Fixed" | "Dynamic";

  // Flags in schema
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;

  // Store name
  storeName: string;
}

interface TieredPrice {
  id: string;
  quantity: number | string;
  price: number | string;
}

// ---- Helpers ----
const getId = (x: any) => (typeof x === "string" ? x : (x?._id ?? x?.id ?? ""));
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;
const validateFile = (f: File) => {
  if (!ALLOWED_TYPES.includes(f.type)) return "Only JPG, PNG, WEBP allowed.";
  if (f.size > MAX_SIZE) return "Max 5MB per image.";
  return null;
};
const num = (v: unknown) => {
  const n = typeof v === "string" ? v.trim() : v;
  const x = Number(n);
  return Number.isFinite(x) ? x : undefined;
};

// safer preview hook
function useObjectURL(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url;
}

function debugFormData(fd: FormData) {
  const out: Record<string, any> = {};
  fd.forEach((v, k) => {
    const val =
      v instanceof File
        ? `{File name=${v.name} type=${v.type} size=${v.size}}`
        : String(v);
    if (k in out) {
      if (Array.isArray(out[k])) out[k].push(val);
      else out[k] = [out[k], val];
    } else out[k] = val;
  });
  console.groupCollapsed("%cADD PRODUCT → FormData", "color:#0af");
  Object.entries(out).forEach(([k, v]) => console.log(k, "→", v));
  console.groupEnd();
}

// ---- Component ----
const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: productId } = useParams<{ id: string }>(); // Get product ID from URL
  const isEditMode = !!productId;
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const { categories, brands, vehicles, departments, loading } = useAppSelector(
    (state) => state.adminDashboard
  );

  // auth (for createdBy)
  const authState: any = useAppSelector((s: any) => s.auth ?? {});
  const createdById: string = authState?.user?._id ?? authState?._id ?? "";

  // load lists if empty
  useEffect(() => {
    if (!categories.length) dispatch(fetchAllCategories());
    if (!brands.length) dispatch(fetchAllBrands());
    if (!vehicles.length) dispatch(fetchAllVehiclesType());
    if (!departments.length) dispatch(fetchAllDepartments());
  }, [
    dispatch,
    categories.length,
    brands.length,
    vehicles.length,
    departments.length,
  ]);

  // form state
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    briefDescription: "",
    fullDescription: "",
    description: "",

    imageFiles: [null, null, null, null],

    selectedCategoryId: "",
    selectedBrandId: "",
    selectedVehicleTypeId: "",
    selectedDepartmentId: "",

    partNumber: "",

    weight: "",
    length: "",
    breadth: "",
    width: "",
    material: "",

    stockStatus: "In Stock",
    stock: "",
    units: "",
    sku: "",
    minStock: "",

    regularPrice: "",
    displayPrice: "",
    discount: "",
    discountPrice: "",

    minOrderQuantity: "",
    tieredPricingType: "Fixed",

    isFeatured: false,
    isNewArrival: false,
    isDealOfTheDay: false,

    // store as plain text name
    storeName: "",
  });

  useEffect(() => {
    if (isEditMode && productId) {
      const loadProduct = async () => {
        setIsLoadingProduct(true);
        try {
          const result = await dispatch(fetchProductById(productId)).unwrap();
          const product = (result && (result.product || result.data)) || result;
          if (!product || !product._id) throw new Error("Product not found");
          // Populate form with existing product data
          setFormData({
            name: product.name || "",
            briefDescription: product.briefDescription || "",
            fullDescription: product.fullDescription || "",
            description: product.description || "",
            imageFiles: [null, null, null, null],
            existingImages: product.images || [],
            selectedCategoryId: getId(product.category) || "",
            selectedBrandId: getId(product.brand) || "",
            selectedVehicleTypeId: getId(product.vehicleType) || "",
            selectedDepartmentId: getId(product.department) || "",
            partNumber: product.partNumber || "",
            weight: product.weight?.toString() || "",
            length: product.packageSize?.length?.toString() || "",
            breadth: product.packageSize?.breadth?.toString() || "",
            width: product.packageSize?.width?.toString() || "",
            material: product.material || "",
            stockStatus: product.stockStatus || "In Stock",
            stock: product.quantityInStock?.toString() || "",
            units: product.units || "",
            sku: product.sku || "",
            minStock: product.minStock?.toString() || "",
            regularPrice: product.regularPrice?.toString() || "",
            displayPrice: product.salesPrice?.toString() || "",
            discount: product.discount?.toString() || "",
            discountPrice: product.discountPrice?.toString() || "",
            minOrderQuantity: product.minOrderQuantity?.toString() || "",
            tieredPricingType: product.tieredPricingType || "Fixed",
            isFeatured: product.isFeatured || false,
            isNewArrival: product.isNewArrival || false,
            isDealOfTheDay: product.isDealOfTheDay || false,
            storeName:
              typeof product.store === "string"
                ? product.store
                : product.store?.name || "",
          });

          // Populate tiered pricing if exists
          if (product.tieredPricing && product.tieredPricing.length > 0) {
            setTieredPrices(
              product.tieredPricing.map((tier: any) => ({
                id: crypto.randomUUID(),
                quantity: tier.quantity?.toString() || "",
                price: tier.price?.toString() || "",
              }))
            );
          }
        } catch (error) {
          console.error("Failed to load product:", error);
          setErrors({ submit: "Failed to load product data" });
        } finally {
          setIsLoadingProduct(false);
        }
      };
      loadProduct();
    }
  }, [isEditMode, productId, dispatch]);

  const [tieredPrices, setTieredPrices] = useState<TieredPrice[]>([
    { id: crypto.randomUUID(), quantity: "", price: "" },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUploading, setImageUploading] = useState<Record<number, boolean>>(
    {}
  );
  const uploadingAny = useMemo(
    () => Object.values(imageUploading).some(Boolean),
    [imageUploading]
  );

  const removeExistingImage = (index: number) =>
    setFormData((prev) => {
      const next = [...(prev.existingImages ?? [])];
      next.splice(index, 1);
      return { ...prev, existingImages: next };
    });

  // generic input handler
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // tiered pricing helpers
  const addTieredPrice = () =>
    setTieredPrices((p) => [
      ...p,
      { id: crypto.randomUUID(), quantity: "", price: "" },
    ]);

  const removeTieredPrice = (id: string) =>
    setTieredPrices((p) => p.filter((t) => t.id !== id));

  const updateTieredPrice = (
    id: string,
    key: "quantity" | "price",
    value: number | string
  ) =>
    setTieredPrices((p) =>
      p.map((t) => (t.id === id ? { ...t, [key]: value } : t))
    );

  // slot-aware file handlers
  const uploadImageAt = async (slot: number, file: File) => {
    const bad = validateFile(file);
    if (bad) {
      setErrors((e) => ({ ...e, imageFiles: bad }));
      return;
    }
    setErrors((e) => ({ ...e, imageFiles: "" }));
    setImageUploading((u) => ({ ...u, [slot]: true }));
    try {
      setFormData((prev) => {
        const next = [...prev.imageFiles];
        next[slot] = file;
        return { ...prev, imageFiles: next };
      });
    } finally {
      setImageUploading((u) => ({ ...u, [slot]: false }));
    }
  };
  const removeImageAt = (slot: number) =>
    setFormData((prev) => {
      const next = [...prev.imageFiles];
      next[slot] = null;
      return { ...prev, imageFiles: next };
    });

  // validation
  const validateForm = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Product name is required";
    if (!formData.selectedCategoryId) next.categoryId = "Select a category";
    if (!formData.selectedBrandId) next.brandId = "Select a brand";
    // if (!formData.selectedDepartmentId) next.departmentId = "Select a department";
    if (formData.regularPrice === "" || Number(formData.regularPrice) <= 0)
      next.regularPrice = "Enter regular price";
    if (formData.displayPrice === "" || Number(formData.displayPrice) <= 0)
      next.displayPrice = "Enter display price";

    // Check for images: either existing images or new files
    const hasImages =
      (formData.existingImages && formData.existingImages.length > 0) ||
      formData.imageFiles.some((f) => f);
    if (!hasImages) next.imageFiles = "At least one image is required";

    if (!formData.storeName?.trim()) next.storeName = "Store name is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (uploadingAny) {
      setErrors((e) => ({
        ...e,
        imageFiles: "Please wait for image slots to finish.",
      }));
      return;
    }
    if (!validateForm()) return;

    if (!createdById && !isEditMode) {
      setErrors((e) => ({
        ...e,
        submit: "Missing createdBy (user id). Are you logged in?",
      }));
      return;
    }

    // Build JSON-ish parts
    const regular = num(formData.regularPrice) ?? 0;
    const sales = num(formData.displayPrice) ?? regular;
    const discPct = num(formData.discount);
    const discPx =
      num(formData.discountPrice) ??
      (discPct != null ? Math.round(regular * (1 - discPct / 100)) : undefined);

    const packageSize = {
      length: num(formData.length) ?? 0,
      breadth: num(formData.breadth) ?? 0,
      width: num(formData.width) ?? 0,
    };

    const tiered = tieredPrices
      .map((t) => ({
        quantity: num(t.quantity) ?? 0,
        price: num(t.price) ?? 0,
      }))
      .filter((t) => t.quantity > 0 && t.price > 0);

    // Check if we have new images to upload
    const hasNewImages = formData.imageFiles.some((f) => f instanceof File);

    // For EDIT mode without new images, use JSON payload
    if (isEditMode && !hasNewImages) {
      const jsonPayload = {
        name: formData.name.trim(),
        category: formData.selectedCategoryId,
        brand: formData.selectedBrandId,
        ...(formData.selectedVehicleTypeId && {
          vehicleType: formData.selectedVehicleTypeId,
        }),
        ...(formData.selectedDepartmentId && {
          department: formData.selectedDepartmentId,
        }),
        briefDescription: formData.briefDescription?.trim() || "",
        fullDescription: formData.fullDescription?.trim() || "",
        description:
          formData.description?.trim() ||
          formData.fullDescription?.trim() ||
          formData.briefDescription?.trim() ||
          formData.name,
        quantityInStock: num(formData.stock) ?? 0,
        stockStatus: formData.stockStatus || "In Stock",
        ...(formData.partNumber && { partNumber: formData.partNumber }),
        ...(formData.units && { units: formData.units }),
        ...(formData.sku && { sku: formData.sku }),
        minStock: num(formData.minStock) ?? 0,
        store: formData.storeName.trim(),
        ...(formData.weight && { weight: num(formData.weight) ?? 0 }),
        ...(formData.material && { material: formData.material }),
        packageSize, // ✅ Send as object (not stringified)
        regularPrice: regular,
        salesPrice: sales,
        ...(discPct != null && { discount: discPct }),
        ...(discPx != null && { discountPrice: discPx }),
        minOrderQuantity: num(formData.minOrderQuantity) ?? 1,
        tieredPricingType: formData.tieredPricingType || "Fixed",
        ...(tiered.length > 0 && { tieredPricing: tiered }), // ✅ Send as array (not stringified)
        averageRating: 0,
        numOfReviews: 0,
        isFeatured: !!formData.isFeatured,
        isNewArrival: !!formData.isNewArrival,
        isDealOfTheDay: !!formData.isDealOfTheDay,
        // Keep existing images if no new ones
        ...(formData.existingImages &&
          formData.existingImages.length > 0 && {
            images: formData.existingImages,
          }),
      };

      try {
        await dispatch(
          updateProduct({ id: productId!, data: jsonPayload as any })
        ).unwrap();
        console.log("✅ Update Response:", Response);
      
        // Refresh products list before navigating
        await dispatch(fetchProducts());  
        navigate("/admin/products");
        return;
      } catch (error: any) {
        const msg =
          error?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to update product.";
        setErrors((e) => ({ ...e, submit: msg }));
        return;
      }
    }

    // For CREATE or EDIT with new images, use FormData
    const fd = new FormData();

    // required & core fields
    fd.append("name", formData.name.trim());
    fd.append("category", formData.selectedCategoryId);
    fd.append("brand", formData.selectedBrandId);
    if (formData.selectedVehicleTypeId)
      fd.append("vehicleType", formData.selectedVehicleTypeId);

    if (formData.selectedDepartmentId)
      fd.append("department", formData.selectedDepartmentId);

    // descriptions
    const briefDesc = formData.briefDescription?.trim() || "";
    const fullDesc = formData.fullDescription?.trim() || "";
    const description =
      formData.description?.trim() || fullDesc || briefDesc || formData.name;
    fd.append("briefDescription", briefDesc);
    fd.append("fullDescription", fullDesc);
    fd.append("description", description);

    // inventory
    fd.append("quantityInStock", String(num(formData.stock) ?? 0));
    fd.append("stockStatus", formData.stockStatus || "In Stock");

    // identifiers / misc
    if (formData.partNumber) fd.append("partNumber", formData.partNumber);
    if (formData.units) fd.append("units", formData.units);
    if (formData.sku) fd.append("sku", formData.sku);
    if (formData.minStock !== "" && formData.minStock != null)
      fd.append("minStock", String(num(formData.minStock) ?? 0));

    // store as STRING + createdBy
    fd.append("store", formData.storeName.trim());
    if (!isEditMode) fd.append("createdBy", createdById);

    // physical props
    if (formData.weight) fd.append("weight", String(num(formData.weight) ?? 0));
    if (formData.material) fd.append("material", formData.material);

    // nested package size using bracket notation
    fd.append("packageSize[length]", String(packageSize.length));
    fd.append("packageSize[breadth]", String(packageSize.breadth));
    fd.append("packageSize[width]", String(packageSize.width));

    // pricing
    fd.append("regularPrice", String(regular));
    fd.append("salesPrice", String(sales));
    if (discPct != null) fd.append("discount", String(discPct));
    if (discPx != null) fd.append("discountPrice", String(discPx));

    if (formData.minOrderQuantity !== "" && formData.minOrderQuantity != null)
      fd.append(
        "minOrderQuantity",
        String(num(formData.minOrderQuantity) ?? 1)
      );
    fd.append("tieredPricingType", formData.tieredPricingType || "Fixed");

    // ✅ FIX: tiered pricing using bracket notation
    tiered.forEach((tier, index) => {
      fd.append(`tieredPricing[${index}][quantity]`, String(tier.quantity));
      fd.append(`tieredPricing[${index}][price]`, String(tier.price));
    });

    fd.append("averageRating", "0");
    fd.append("numOfReviews", "0");

    // flags
    fd.append("isFeatured", String(!!formData.isFeatured));
    fd.append("isNewArrival", String(!!formData.isNewArrival));
    fd.append("isDealOfTheDay", String(!!formData.isDealOfTheDay));

    // images (duplicate selection allowed)
    const IMAGES_KEY = "images";
    formData.imageFiles.forEach((f, i) => {
      if (f) fd.append(IMAGES_KEY, f, f.name || `image_${i}.jpg`);
    });

    // If editing and we have existing images, preserve them
    if (
      isEditMode &&
      formData.existingImages &&
      formData.existingImages.length > 0
    ) {
      formData.existingImages.forEach((url, i) => {
        fd.append(`existingImages[${i}]`, url);
      });
    }

    // DEBUG: inspect payload
    console.log("=== FormData Contents ===");
    for (const [k, v] of (fd as any).entries()) {
      console.log(`${k}:`, v instanceof File ? `File(${v.name})` : v);
    }

    try {
      if (isEditMode) {
        await dispatch(updateProduct({ id: productId!, data: fd })).unwrap();
      } else {
        await dispatch(addProduct(fd)).unwrap();
      }
      await dispatch(fetchProducts());
      navigate("/admin/products");
    } catch (error: any) {
      const msg =
        error?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        `Failed to ${isEditMode ? "update" : "add"} product.`;
      setErrors((e) => ({ ...e, submit: msg }));
    }
  };

  // ---- UI helpers: image slot component ----
  const ImageSlot: React.FC<{
    slot: number;
    file: File | null;
    big?: boolean;
  }> = ({ slot, file, big }) => {
    const existingUrl = formData.existingImages?.[slot] ?? null;
    const preview = useObjectURL(file);
    const displayUrl = preview || existingUrl;
    const base = big ? "w-full h-[198px]" : "w-[161px] h-[87px]";
    const border = file
      ? "border border-primary"
      : "border border-primary border-dashed";
    return (
      <div
        className={`relative ${base} flex items-center justify-center rounded-[12px] ${border}`}
      >
        {displayUrl ? (
          <div className="w-full h-full relative">
            <img
              src={displayUrl}
              alt={`Preview ${slot + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => {
                if (file) {
                  removeImageAt(slot);
                } else if (existingUrl) {
                  const index =
                    formData.existingImages?.indexOf(existingUrl) ?? -1;
                  if (index !== -1) removeExistingImage(index);
                }
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        ) : (
          <FileUploader
            onUpload={(f: File) => uploadImageAt(slot, f)}
            onRemove={() => removeImageAt(slot)}
          />
        )}
        {!!imageUploading[slot] && (
          <span className="absolute bottom-2 right-2 text-xs">Uploading…</span>
        )}
      </div>
    );
  };

  if (isLoadingProduct) {
    return (
      <AdminLayout pageTitle="">
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ---- Render ----
  return (
    <AdminLayout pageTitle="">
      <div className="p-6">
        <div className="flex gap-2 items-center text-xl font-semibold text-customBrown mb-8">
          <button onClick={() => navigate("/admin/products")}>
            <ArrowLeft />
          </button>
          <h1>Add Product</h1>
        </div>

        <section className="flex w-full justify-between gap-4">
          {/* Left: images + descriptions + specs */}
          <div className="w-[55%]">
            {/* Product Images */}
            <section className="mb-6">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Product Images
              </h2>
              <div className="flex items-center gap-4 border border-[#D9D9D9] rounded-[12px] w-full p-4">
                <ImageSlot slot={0} file={formData.imageFiles[0]} big />
                <ImageSlot slot={1} file={formData.imageFiles[1]} big />
                <div className="flex justify-between items-center flex-col gap-4">
                  <ImageSlot slot={2} file={formData.imageFiles[2]} />
                  <ImageSlot slot={3} file={formData.imageFiles[3]} />
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

                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="partNumber"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Part Number
                  </label>
                  <input
                    type="text"
                    id="partNumber"
                    name="partNumber"
                    value={formData.partNumber}
                    onChange={handleInputChange}
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-3 rounded-[8px]"
                  />
                </div>

                {/* Store (Seller) Name */}
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="storeName"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Store (Seller) *
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    placeholder="e.g., Motomart, Acme Parts Ltd"
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-3 rounded-[8px]"
                  />
                  {errors.storeName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.storeName}
                    </p>
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
                  />
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
                  />
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

            {/* Category / Brand / Vehicle Type */}
            <section>
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Category
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex gap-6 items-center mb-6">
                  {/* Category */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="productCategory"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Product Category *
                    </label>
                    <select
                      id="productCategory"
                      name="selectedCategoryId"
                      value={formData.selectedCategoryId}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => {
                        const id = getId(c as any);
                        return (
                          <option key={id} value={id}>
                            {c.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.categoryId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.categoryId}
                      </p>
                    )}
                  </div>

                  {/* Brand */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="brand"
                      className="text-sm font-normal text-customBrown pb-2"
                    >
                      Brand *
                    </label>
                    <select
                      id="brand"
                      name="selectedBrandId"
                      value={formData.selectedBrandId}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    >
                      <option value="">Select brand</option>
                      {brands.map((b) => {
                        const id = getId(b as any);
                        return (
                          <option key={id} value={id}>
                            {b.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.brandId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.brandId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Vehicle Type */}
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicleType"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    name="selectedVehicleTypeId"
                    value={formData.selectedVehicleTypeId}
                    onChange={handleInputChange}
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  >
                    <option value="">Select vehicle type</option>
                    {vehicles.map((v) => {
                      const id = getId(v as any);
                      return (
                        <option key={id} value={id}>
                          {v.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.vehicleTypeId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.vehicleTypeId}
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right: inventory + pricing + tiers + flags + actions */}
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
                    {/* <input
                      type="text"
                      id="stockStatus"
                      name="stockStatus"
                      value={formData.stockStatus}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    /> */}
                    <select
                      id="stockStatus"
                      name="stockStatus"
                      value={formData.stockStatus || "In Stock"}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
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
                      min="0"
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
                    value={formData.minStock as any}
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
                      value={formData.regularPrice as any}
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
                      value={formData.displayPrice as any}
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
                      value={formData.discount as any}
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
                      value={formData.discountPrice as any}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Wholesale Pricing / Department / Tiers */}
            <section className="mb-8">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Wholesale Pricing
              </h2>
              <div className="border border-[#D9D9D9] w-full p-4 rounded-[12px]">
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicleType"
                    className="text-sm font-normal text-customBrown pb-2"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    name="selectedDepartmentId"
                    value={formData.selectedDepartmentId}
                    onChange={handleInputChange}
                    className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => {
                      const id = getId(d as any);
                      return (
                        <option key={id} value={id}>
                          {d.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.departmentId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.departmentId}
                    </p>
                  )}
                </div>
                <div className="flex gap-6 items-center mb-6 mt-6">
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
                      value={formData.minOrderQuantity as any}
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
                    <select
                      id="pricingType"
                      name="tieredPricingType"
                      value={formData.tieredPricingType}
                      onChange={handleInputChange}
                      className="border border-[#D9D9D9] focus:border-gray-600 focus:outline-none w-full p-4 rounded-[8px]"
                    >
                      <option value="Fixed">Fixed</option>
                      <option value="Dynamic">Dynamic</option>
                    </select>
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
                          value={tier.quantity as any}
                          onChange={(e) =>
                            updateTieredPrice(
                              tier.id,
                              "quantity",
                              e.target.value
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
                          value={tier.price as any}
                          onChange={(e) =>
                            updateTieredPrice(tier.id, "price", e.target.value)
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

            {/* Flags */}
            <section className="mb-6">
              <h2 className="text-base font-semibold text-customBrown mb-[8px]">
                Flags
              </h2>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={!!formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    checked={!!formData.isNewArrival}
                    onChange={handleInputChange}
                  />
                  New Arrival
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDealOfTheDay"
                    checked={!!formData.isDealOfTheDay}
                    onChange={handleInputChange}
                  />
                  Deal of the Day
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const ok = window.confirm("Discard all changes?");
                  if (ok) navigate("/admin/products");
                }}
                className="w-[100px] border border-[#D9D9D9] flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-red-50 text-sm font-semibold text-gray-600 hover:text-red-600"
              >
                <Ban className="w-4" />
                <span>Discard</span>
              </button>
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading.addProduct || uploadingAny}
                  className="w-[130px] border border-primary bg-primary flex gap-2 items-center py-3 px-2 rounded-[6px] hover:bg-blue-700 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4" />
                  <span>
                    {loading.addProduct || uploadingAny
                      ? "Saving…"
                      : "Add Product"}
                  </span>
                </button>
              </div>
            </div>

            {errors.submit && (
              <p className="text-red-600 text-sm mt-4">{errors.submit}</p>
            )}
            {errors.storeName && (
              <p className="text-red-600 text-sm">{errors.storeName}</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
