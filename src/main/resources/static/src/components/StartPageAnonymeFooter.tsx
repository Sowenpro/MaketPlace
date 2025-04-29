import React from "react";

const Input: React.FC = () => {
  return (
    <div className="w-full text-center mt-6">
      <p className="text-black-300">
        faire un{" "}
        <a href="/home" className="text-orange-300 hover:text-blue-400 underline">
          quick look
        </a>
      </p>
    </div>
  );
};

export default Input;
