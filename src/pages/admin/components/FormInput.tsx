// components/FormInput.tsx
import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="leading-8 text-sm text-customBrown font-normal"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-4 border rounded-lg text-base shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required={required}
      />
    </div>
  );
};

export default FormInput;