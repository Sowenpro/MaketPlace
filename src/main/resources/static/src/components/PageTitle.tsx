import React from "react";

interface InputProps {
  children: React.ReactNode;
  className?: string;
}

const Input: React.FC<InputProps> = ({ children, className = "" }) => {
  return (
    <h1 className={`text-4xl font-bold text-orange-500 mx-4 mb-4 ${className}`}>
      {children}
    </h1>
  );
};

export default Input;
