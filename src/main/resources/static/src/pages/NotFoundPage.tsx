import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen items-center justify-center bg-gray-400 text-center shadow-lg p-14">
      <h1 className="text-4xl font-bold text-red-700 mb-4">Erreur 404</h1>
      <p className="text-xl text-black mb-12">Page non trouvée</p>
      <button
        onClick={handleGoHome}
        className="bg-red-600 text-white font-semibold py-2 px-12 hover:bg-red-800 transition">
        Retour à l'accueil
      </button>
    </div>
  );
};

export default NotFoundPage;
