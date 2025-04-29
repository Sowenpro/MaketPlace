import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import PageTitle from "../components/PageTitle";
import PartTitle from "../components/PartTitle";

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
}

const MyObjectsPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [objects, setObjects] = useState<ObjectForSale[]>([]);

  useEffect(() => {
    if (!login) {
      navigate("/login");
      return;
    }

    const fetchMyObjects = async () => {
      setObjects([]);
      try {
        const response = await axios.get(
          "https://localhost:8443/api/items/my",
          {
            headers: {
              login: login,
            },
          }
        );
        setObjects(response.data);
      } catch (err) {
        console.error("Erreur : récupération d'objets", err);
      }
    };

    fetchMyObjects();
  }, [login, navigate]);

  const setObjectSold = async (id: number) => {
    try {
      await axios.patch(`https://localhost:8443/api/items/${id}`, {
        sold: true,
      });
      setObjects((prevObjects) =>
        prevObjects.map((obj) =>
          obj.id === id ? { ...obj, sold: true } : obj
        )
      );
    } catch (err) {
      console.error("Erreur : mise à jour de l'objet", err);
    }
  };

  return (
    <div className="flex-col min-h-screen h-full bg-gray-400 py-8">
      <PageTitle>Mes Objets</PageTitle>
      <div className="flex flex-col justify-between w-full overflow-y-auto bg-gray-500 shadow-lg py-8 px-12 scroll-y">

        <div className="flex space-x-8">
          <div className="flex-grow bg-gray-600 p-4">
            <PartTitle title="Liste de mes objets" />

            <div className="overflow-y-auto">
              <ul className="pt-4">
                {objects.length > 0 ? (
                  objects.map((obj) => (
                    <li
                      key={obj.id}
                      className="mb-2 p-2 bg-green-100 shadow flex justify-between items-center">
                      <div>
                        <p>
                          <strong>Description:</strong> {obj.description}
                        </p>
                        <p>
                          <strong>Prix:</strong> {obj.price} €
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p>
                          Status :{" "}
                          <strong>{obj.sold ? "Vendu" : "En vente"}</strong>
                        </p>
                        {!obj.sold && (
                          <button
                            onClick={() => setObjectSold(obj.id)}
                            className="bg-green-600 text-white p-2 hover:bg-green-800">
                            Marquer comme vendu
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-orange-300 text-center">Aucun objet trouvé.</p>
                )}
              </ul>
            </div>
          </div>
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

export default MyObjectsPage;
