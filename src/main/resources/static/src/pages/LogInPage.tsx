import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Input from "../components/FormInput";
import PageTitle from "../components/PageTitle";
import SignInFooter from "../components/StartPageFooter";
import SignAnonymeFooter from "../components/StartPageAnonymeFooter";

const LoginPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setLogin: setUserLogin } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://localhost:8443/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
      } else {
        setUserLogin(login);
        localStorage.setItem("login", login);
        navigate("/home");
      }
    } catch (error) {
      setError("Erreur. Veuillez réessayer: " + error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-400 p-16">
      <div className="w-full bg-gray-500 shadow-md px-10 py-6">
        <PageTitle className="text-center">Connexion</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="login"
            label="Login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value.trim())}
            required />
          <Input
            id="password"
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            required />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-2 hover:bg-orange-800 transition">
            Se connecter
          </button>
        </form>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        <SignInFooter
          link="/signup"
          text="Pas encore inscrit ?"
          linkText="Créer un compte" />
      </div>
      <SignAnonymeFooter />
    </div>
  );
};

export default LoginPage;
