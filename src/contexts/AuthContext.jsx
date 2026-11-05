import { createContext, useContext, useEffect, useState } from "react";
import { getCsrfToken } from "../helpers/getCsrfToken";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const API_URL = import.meta.env.VITE_APP_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/status`, {
      credentials: "include",
      headers: { "csrf-token": csrfToken },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setCurrentUser(data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
