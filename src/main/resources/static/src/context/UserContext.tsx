import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface UserContextType {
  login: string | null;
  isAdmin: boolean;
  setLogin: (login: string | null) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedLogin = localStorage.getItem("login");
  const [login, setLogin] = useState<string | null>(storedLogin);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (login) {
      localStorage.setItem("login", login);
    } else {
      localStorage.removeItem("login");
    }
  }, [login]);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (login) {
        try {
          const response = await axios.get(
            "https://localhost:8443/api/users/admin",
            {
              headers: { login },
            }
          );
          setIsAdmin(response.data);
        } catch (err) {
          console.error(
            "Erreur : vérification de l'administrateur",
            err
          );
        }
      } else {
        setIsAdmin(false);
      }
    };
    fetchAdminStatus();
  }, [login]);

  return (
    <UserContext.Provider value={{ login, isAdmin, setLogin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useAdmin = (): boolean => {
  const { isAdmin } = useUser();
  return isAdmin;
};