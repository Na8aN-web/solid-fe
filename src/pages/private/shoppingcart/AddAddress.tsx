import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createAddress } from "../../../store/slices/addressSlice";

// Nigerian states
const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

const AddAddress = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.address);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    direction: "",
    city: "",
    state: "",
    isDefault: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(createAddress(formData)).unwrap();
      alert("Address saved successfully!");
      navigate("/checkout");
    } catch (err: any) {
      console.error("Failed to save address:", err);
      alert(err || "Failed to save address");
    }
  };

  return (
    <div className="p-5">
      <section className="sm:flex sm:justify-center sm:items-center sm:min-h-screen">
        <div className="sm:w-[606px] sm:flex sm:flex-col sm:justify-center sm:rounded-2xl">
          <h2>Add Delivery Address</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              {error}
            </div>
          )}

          <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
            <div className="sm:flex sm:gap-6 justify-between w-full">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="leading-8 text-sm text-customBrown font-normal"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="leading-8 text-sm text-customBrown font-normal"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="street"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Street Address
              </label>
              <input
                name="street"
                type="text"
                placeholder="Enter Your Street Address"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="direction"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                Directions (optional)
              </label>
              <input
                name="direction"
                type="text"
                placeholder="Enter a descriptive additional address information"
                value={formData.direction}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Please Select state</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                City
              </label>
              <input
                name="city"
                type="text"
                placeholder="Enter Your City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
              />
              <p className="text-customGray3 text-sm">Set as default address</p>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary rounded-lg p-4 w-full text-base text-white font-semibold mb-5 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <Link to="/checkout">
                <button
                  type="button"
                  className="bg-white rounded-lg p-4 w-full text-base text-primary border border-primary font-semibold"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddAddress;