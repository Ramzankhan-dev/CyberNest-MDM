import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    getProfile()
      .then((res) => setAdmin(res.data))
      .catch(() => logout())
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = (newToken, adminData) => {
    localStorage.setItem("token", newToken);
    if (adminData) {
      localStorage.setItem("adminName",  adminData.owner_name        || "Admin");
      localStorage.setItem("adminEmail", adminData.email             || "");
      localStorage.setItem("adminOrg",   adminData.organization_name || "");
    }
    setToken(newToken);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminOrg");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);