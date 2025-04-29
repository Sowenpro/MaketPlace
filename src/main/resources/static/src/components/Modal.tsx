import React from "react";

interface ModalProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className={`bg-white p-6 rounded shadow-md text-center ${type === "success" ? "border-green-600" : "border-red-600"
          } border-t-4`}>
        <h2
          className={`text-lg font-bold mb-4 ${type === "success" ? "text-green-600" : "text-red-600"
            }`}>
          {type === "success" ? "Succès" : "Erreur"}
        </h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;