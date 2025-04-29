import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Input from "../components/FormInput";
import PageTitle from "../components/PageTitle";
import PartTitle from "../components/PartTitle";
import FormInput from "../components/FormInput";
import Modal from "../components/Modal";

interface ObjectForSale {
  id: number;
  description: string;
  price: number;
  sold: boolean;
}

const HomePage: React.FC = () => {
  const { login, setLogin } = useUser();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const [objects, setObjects] = useState<ObjectForSale[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const login = localStorage.getItem("login");
      if (!login) return;
      try {
        const response = await axios.get(
          "https://localhost:8443/api/users/admin",
          {
            headers: { login: login },
          }
        );
        setIsAdmin(response.data);
      } catch (err) {
        console.error(
          "Erreur : vérification de l'administrateur",
          err
        );
      }
    };

    fetchAdminStatus();
    fetchObjects();
  }, []);

  const handleLogout = () => {
    setLogin(null);
    localStorage.removeItem("login");
    navigate("/login");
  };

  const handleCreateObject = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalMessage(null);

    if (!description || !price) {
      setModalType("error");
      setModalMessage("Veuillez remplir tous les champs.");
      return;
    }

    const login = localStorage.getItem("login");

    if (!login) {
      setModalType("error");
      setModalMessage("Utilisateur non connecté.");
      return;
    }

    try {
      await axios.post(
        "https://localhost:8443/api/items/create",
        { description, price },
        {
          headers: {
            login: login,
          },
        }
      );
      setModalType("success");
      setModalMessage("Objet ajouté avec succès !");
      setDescription("");
      setPrice("");
      fetchObjects();
    } catch (err) {
      setModalType("error");
      setModalMessage(
        "Erreur : création de l'objet: " + err
      );
    }
  };

  const fetchObjects = async () => {
    try {
      const response = await axios.get("https://localhost:8443/api/items");
      setObjects(response.data);
    } catch (err) {
      console.error("Erreur : récupération d'objets", err);
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  const filteredObjects = objects.filter((obj) =>
    obj.description.toLowerCase().includes(searchTerm.toLowerCase()) && !obj.sold
  );

  return (
    <div className="flex-col min-h-screen justify-center bg-gray-400 py-8">
      <PageTitle>Bienvenue à l'accueil</PageTitle>
      <div className="w-full bg-gray-500 shadow-lg p-8">
        <div>
          {login && (
            <p className="text-xl text-orange-400 mb-4">
              Bienvenue,{" "}
              <span
                className={`font-semibold ${isAdmin ? "text-green-400" : "text-orange-400"
                  }`}>
                {login + " "}
              </span>
              !
            </p>
          )}
          <div className="flex-col">
            <div className="flex-grow bg-gray-600 p-4 shadow-md w-full mb-10">
              <PartTitle title="Objets en vente" />
              <FormInput
                placeholder="Rechercher un objet..."
                type={"text"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
              <div className="overflow-y-auto w-full">
                <ul className="flex flex-wrap justify-center">
                  {filteredObjects.map((obj) => (
                    <li
                      key={obj.id}
                      className="m-2 p-2 bg-green-100 shadow ">
                      <p>
                        <strong>Description:</strong> {obj.description}
                      </p>
                      <p>
                        <strong>Prix:</strong> {obj.price} €
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {!login ? (
                <div>
                  <h2 className="text-red-500 font-bold text-xl text-center m-6">
                    Vous devez être connecté pour ajouter un objet à vendre.
                  </h2>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-red-600 text-white font-semibold py-2 hover:bg-red-800 transition mt-6">
                    Se connecter
                  </button>
                </div>
              ) : (
                <div>
                  <PartTitle title="Ajouter un objet à vendre" />
                  <form onSubmit={handleCreateObject} className="space-y-4">
                    <Input
                      id="description"
                      label="Description de l'objet"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Entrez une description de l'objet" />
                    <Input
                      id="price"
                      label="Prix de l'objet"
                      type="number"
                      value={price}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setPrice(value >= 0 ? value : "");
                      }}
                      required
                      placeholder="Entrez le prix de l'objet" />
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white font-semibold py-2 px-6 hover:bg-green-800 transition">
                      Ajouter l'objet
                    </button>
                  </form>
                  {modalMessage && modalType && (
                    <Modal
                      message={modalMessage}
                      type={modalType}
                      onClose={() => setModalMessage(null)} />
                  )}
                  <div className="mt-4 space-y-4">
                    <button
                      onClick={() => navigate("/mes-objets")}
                      className="w-full bg-blue-600 text-white font-semibold py-2 px-6 hover:bg-blue-800 transition">
                      Voir mes objets
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => navigate("/admin")}
                        className="w-full bg-yellow-600 text-white font-semibold py-2 px-6 hover:bg-yellow-800 transition">
                        Page Admin
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {login && (
          <button
            onClick={handleLogout}
            className="absolute top-8 right-8 bg-red-600 text-white font-semibold py-2 px-6 hover:bg-red-800 transition">
            Se déconnecter
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
