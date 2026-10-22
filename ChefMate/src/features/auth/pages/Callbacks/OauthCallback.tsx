import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../../context/AuthContext";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  exp: number;
}

const OauthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: decoded.name,
            email: decoded.email,
          })
        );

        login({ username: decoded.name, email: decoded.email }, token);

        navigate("/home");
      } catch (e) {
        console.error("❌ Invalid token", e);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [location.search, login, navigate]);

  return <p>Logging in with Google...</p>;
};

export default OauthCallback;
