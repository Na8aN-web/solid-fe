import React from "react";
import { Search } from "lucide-react";
import { SearchInputProps } from "../types/order";

const SearchInput: React.FC<SearchInputProps> = ({ 
    value, 
    onChange, 
    placeholder = "Search" 
}) => {
    return (
        <div className="relative">
            <Search size={18} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#2D2828]" />
            <input
                type="text"
                placeholder={placeholder}
                className="w-[300px] pl-8 py-2 border text-[12px] text-[#2D2828] shadow-lg border-[#D9D9D9] rounded-lg"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;