import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import PageTitle from "../components/PageTitle";
import SignInFooter from "../components/StartPageFooter";
import SignAnonymeFooter from "../components/StartPageAnonymeFooter";

const SignupPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "https://localhost:8443/api/users/register",
        {
          login,
          password,
          city,
        }
      );
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || "Erreur inconnue");
      } else {
        setError("Erreur. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-400 p-16">
      <div className="w-full bg-gray-500 shadow-md px-10 py-6">
        <PageTitle className="text-center">Inscription</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Login"
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            required />
          <FormInput
            label="Mot de passe"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required />
          <FormInput
            label="Ville"
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value.trim())}
            required />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-2 hover:bg-orange-800 transition">
            S'inscrire
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        <SignInFooter
          link="/login"
          text="Déjà un compte ?"
          linkText="Se connecter" />
      </div>
      <SignAnonymeFooter />
    </div>
  );
};

export default SignupPage;
