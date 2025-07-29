import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSessionUser, setIsSessionUser] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/user", {
          credentials: "include",
        });

        const data = await res.json();
        if (data && data.displayName) {
          login({
            username: data.displayName,
            email: data.emails?.[0]?.value || "",
          });
          setIsSessionUser(true); 
        }
      } catch (err) {
        console.error("Failed to fetch session user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      checkSession();
    } else {
      setLoading(false);
    }
  }, [user, login]);

  if (loading) return <p>Loading...</p>;

  if (!user && !isSessionUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
