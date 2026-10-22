import React, { createContext, useState, useContext, useEffect } from "react";

type User = {
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null; // 🆕 Token finns tillgänglig här
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.username && parsedUser?.email) {
          setUser(parsedUser);
          setToken(storedToken);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
