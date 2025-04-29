import React from "react";
import { Link } from "react-router-dom";

interface InputProps {
  text: string;
  linkText: string;
  link: string;
}

const Input: React.FC<InputProps> = ({ text, link, linkText }) => {
  return (
    <div className="mt-4 text-center">
      <span className="text-sm text-black">
        {text}{" "}
        <Link to={link} className="text-orange-300 hover:text-blue-400 underline">
          {linkText}
        </Link>
      </span>
    </div>
  );
};

export default Input;
