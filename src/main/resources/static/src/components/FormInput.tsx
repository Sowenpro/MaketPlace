import React from "react";

interface InputProps {
  id?: string;
  label?: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder = "",
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-lg font-medium text-orange-300">
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="placeholder-orange-800 w-full mb-5 p-2 border border-4 border-black bg-orange-200 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
        placeholder={placeholder} />
    </div>
  );
};

export default Input;
