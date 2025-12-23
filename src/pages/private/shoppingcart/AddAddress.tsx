import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createAddress } from "../../../store/slices/addressSlice";

// Nigerian states with their popular cities (for suggestions only)
const nigerianStatesWithCities: Record<string, string[]> = {
  "Abia": ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Bende"],
  "Adamawa": ["Yola", "Mubi", "Jimeta", "Numan", "Ganye"],
  "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"],
  "Anambra": ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Ihiala"],
  "Bauchi": ["Bauchi", "Azare", "Misau", "Jama'are", "Katagum"],
  "Bayelsa": ["Yenagoa", "Brass", "Ogbia", "Sagbama", "Ekeremor"],
  "Benue": ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Vandeikya"],
  "Borno": ["Maiduguri", "Biu", "Bama", "Konduga", "Gwoza"],
  "Cross River": ["Calabar", "Ugep", "Ogoja", "Ikom", "Obudu"],
  "Delta": ["Asaba", "Warri", "Sapele", "Ughelli", "Agbor"],
  "Ebonyi": ["Abakaliki", "Afikpo", "Onueke", "Ezza", "Ishielu"],
  "Edo": ["Benin City", "Auchi", "Ekpoma", "Uromi", "Irrua"],
  "Ekiti": ["Ado-Ekiti", "Ikere", "Efon-Alaaye", "Ijero", "Ise"],
  "Enugu": ["Enugu", "Nsukka", "Agbani", "Awgu", "Oji River"],
  "Gombe": ["Gombe", "Kumo", "Deba", "Billiri", "Kaltungo"],
  "Imo": ["Owerri", "Orlu", "Okigwe", "Oguta", "Mbaise"],
  "Jigawa": ["Dutse", "Hadejia", "Gumel", "Birnin Kudu", "Kazaure"],
  "Kaduna": ["Kaduna", "Zaria", "Kafanchan", "Kagoro", "Saminaka"],
  "Kano": ["Kano", "Wudil", "Gwarzo", "Bichi", "Rano"],
  "Katsina": ["Katsina", "Daura", "Funtua", "Malumfashi", "Dutsin-Ma"],
  "Kebbi": ["Birnin Kebbi", "Argungu", "Zuru", "Yauri", "Jega"],
  "Kogi": ["Lokoja", "Okene", "Kabba", "Idah", "Ankpa"],
  "Kwara": ["Ilorin", "Offa", "Omu-Aran", "Lafiagi", "Jebba"],
  "Lagos": ["Ikeja", "Lagos Island", "Surulere", "Yaba", "Ikorodu", "Epe", "Badagry", "Lekki", "Victoria Island", "Apapa"],
  "Nasarawa": ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Doma"],
  "Niger": ["Minna", "Suleja", "Kontagora", "Bida", "Lapai"],
  "Ogun": ["Abeokuta", "Ijebu Ode", "Sagamu", "Ilaro", "Ota"],
  "Ondo": ["Akure", "Ondo", "Owo", "Ikare", "Ore"],
  "Osun": ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Iwo"],
  "Oyo": ["Ibadan", "Ogbomoso", "Oyo", "Iseyin", "Saki"],
  "Plateau": ["Jos", "Bukuru", "Pankshin", "Shendam", "Langtang"],
  "Rivers": ["Port Harcourt", "Bonny", "Eleme", "Okrika", "Ahoada"],
  "Sokoto": ["Sokoto", "Tambuwal", "Gwadabawa", "Wurno", "Bodinga"],
  "Taraba": ["Jalingo", "Wukari", "Bali", "Zing", "Gembu"],
  "Yobe": ["Damaturu", "Potiskum", "Gashua", "Geidam", "Nguru"],
  "Zamfara": ["Gusau", "Kaura Namoda", "Talata Mafara", "Bungudu", "Anka"],
  "FCT": ["Abuja", "Gwagwalada", "Kubwa", "Kuje", "Bwari", "Nyanya", "Lugbe"]
};

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

  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Get suggested cities for selected state
  const suggestedCities = useMemo(() => {
    if (!formData.state) return [];
    return nigerianStatesWithCities[formData.state] || [];
  }, [formData.state]);

  // Filter cities based on what user is typing
  const filteredSuggestions = useMemo(() => {
    if (!formData.city || formData.city.length < 2) return suggestedCities;
    return suggestedCities.filter(city =>
      city.toLowerCase().includes(formData.city.toLowerCase())
    );
  }, [formData.city, suggestedCities]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // If state changes, reset city
    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: "", // Reset city when state changes
      }));
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        city: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleCitySelect = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      city: city,
    }));
    setShowCitySuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation - just ensure state is selected and city is not empty
    if (!formData.state) {
      alert("Please select a state");
      return;
    }
    
    if (!formData.city.trim()) {
      alert("Please enter a city");
      return;
    }
    
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
                <option value="">Please Select State</option>
                {Object.keys(nigerianStatesWithCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label
                htmlFor="city"
                className="leading-8 text-sm text-customBrown font-normal"
              >
                City
              </label>
              <input
                name="city"
                type="text"
                placeholder={formData.state ? "Enter your city (e.g., Ikeja, Surulere)" : "Select state first"}
                value={formData.city}
                onChange={handleInputChange}
                onFocus={() => setShowCitySuggestions(true)}
                onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                disabled={!formData.state}
                className="w-full p-4 border border-[#D9D9D9] rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
                autoComplete="off"
              />
              {showCitySuggestions && formData.state && filteredSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="px-4 py-2 bg-gray-50 text-xs text-gray-600 border-b">
                    Popular cities (you can type any city)
                  </div>
                  {filteredSuggestions.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-base border-b last:border-b-0"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
              {formData.state && (
                <p className="text-xs text-gray-500 mt-1">
                  You can type any city in {formData.state}. Suggestions are provided for popular cities.
                </p>
              )}
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