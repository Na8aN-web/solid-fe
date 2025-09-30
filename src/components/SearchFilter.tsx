// components/SearchFilter.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../services/api/axios";
import { Category } from "../services/categories/types";

type Props = {
  categoriesProp?: Category[];
  loadingProp?: boolean;
  onSearchDone?: () => void;
};

const SearchFilter: React.FC<Props> = ({ categoriesProp, loadingProp, onSearchDone }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<Category[]>(categoriesProp ?? []);
  const [loading, setLoading] = useState<boolean>(!!loadingProp);
  const [selectedCatId, setSelectedCatId] = useState<string>("");

  // Clear search when leaving /products
  useEffect(() => {
    if (!location.pathname.startsWith("/products")) {
      setSearchValue("");
      // setSelectedCatId("");
    }
  }, [location.pathname]);

  // Fetch categories only if not provided by props
  useEffect(() => {
    let mounted = true;
    if (categoriesProp && categoriesProp.length) return;

    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/categories");
        const list: Category[] = Array.isArray(data) ? data : data.categories;
        if (mounted) setCategories(list ?? []);
      } catch (err) {
        console.warn("Failed to fetch categories", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [categoriesProp]);

  const handleCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = e.target.value;
    setSelectedCatId(id);
  };

  // const goSearch = () => {
  //   const q = searchValue.trim();
  //   const qs = new URLSearchParams();

  //   if (q) qs.set("name", q);
  //   if (selectedCatId) qs.set("categoryId", selectedCatId);
  //   qs.set("page", "1");
  //   console.log("Search Query:", qs.toString());
  //   navigate(`/products?${qs.toString()}`);
  //   onSearchDone?.();
  // };

  const goSearch = () => {
    const q = searchValue.trim();
    const qs = new URLSearchParams();
  
    if (q) qs.set("name", q);
    qs.set("page", "1");
  
    console.log("Search Query:", qs.toString());
    navigate(`/products?${qs.toString()}`);
    onSearchDone?.();
  };


  return (
    <form
      onSubmit={(e) => { e.preventDefault(); goSearch(); }}
      className="flex gap-4 w-full"
    >
      <div className="flex w-full">
        {/* Category Select */}
        <div className="relative w-full md:w-[250px]">
          <select
            className="appearance-none pl-[16px] h-12 border rounded-l-lg pr-[40px] outline-none focus:ring-0 focus:border-gray-300 w-full bg-white"
            value={selectedCatId}
            onChange={handleCategoryChange}
            disabled={loading}
          >
            <option value="">{loading ? "Loading..." : "All Categories"}</option>
            {categories.map((c) => (
              <option key={(c as any).id ?? (c as any)._id} value={(c as any).id ?? (c as any)._id}>
                {c.name}
              </option>
            ))}
          </select>
          <img
            src="/arrow-down.svg"
            alt="arrow-down"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3"
          />
        </div>

        {/* Search input */}
        <div className="relative w-full">
          <img
            src="/search.svg"
            alt="search"
            className="absolute top-4 left-5 w-5"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goSearch()}
            className="border h-12 w-full p-2 rounded-r-lg text-sm pl-12"
            placeholder="Search by part name"
          />
        </div>
      </div>

      <button
        type="submit"
        className="border h-12 rounded-lg bg-primary text-white px-4 text-base font-semibold"
        disabled={loading}
      >
        Search
      </button>
    </form>
  );
};

export default SearchFilter;
