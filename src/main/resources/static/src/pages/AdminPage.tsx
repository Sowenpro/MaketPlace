import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState<number>(0);
  const [totalSold, setTotalSold] = useState<number>(0);

  useEffect(() => {
    const fetchSoldObjects = async () => {
      try {
        const response = await axios.get("https://localhost:8443/api/items");
        const soldItems = response.data.filter(
          (obj: ObjectForSale) => obj.sold
        );
        const totalRevenue = soldItems.reduce(
          (acc: number, obj: ObjectForSale) => acc + obj.price * 0.1,
          0
        );
        setRevenue(totalRevenue);
        setTotalSold(soldItems.length);
      } catch (err) {
        console.error("Erreur : récupération des objets vendus", err);
      }
    };

    fetchSoldObjects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-400 py-8">
      <PageTitle>Page Admin</PageTitle>
      <div className="flex-col justify-between w-full bg-gray-500 shadow-lg p-8">
        <div className="mt-4 text-white">
          <h2 className="text-2xl font-semibold text-center">Statistiques des ventes</h2>
          <p className="mt-4 text-center">Nombre d'objets vendus : {totalSold}</p>
          <p className="mt-2 text-center">
            Chiffre d'affaire généré : {revenue.toFixed(2)} €
          </p>
        </div>
        
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 right-8 bg-orange-600 text-white font-semibold py-2 px-6 hover:bg-orange-800 transition">
        Retour à l'accueil
      </button>
      </div>
    </div>
  );
};

export default AdminPage;
