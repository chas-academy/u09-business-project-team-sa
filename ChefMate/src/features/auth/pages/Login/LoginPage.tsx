import "./LoginPage.css";
import LoginForm from "../../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import ChefMateLogo from "../../../../assets/Chefmate_LOGO.png";
import React from "react";
import api from "../../../../api/axios";
import { useAuth } from "../../../../context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import '../../components/Buttons.css'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await api.post("/users/login", { email, password });
      login(res.data.user); // Save user in context
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (credentialResponse.credential) {
      try {
        // Send Google token to backend for verification and login/signup
        const res = await api.post("/auth/google-login", {
          token: credentialResponse.credential,
        });
        login(res.data.user); // Save user info in context (adjust to your backend response)
        navigate("/home");
      } catch (error) {
        console.error("Google login failed", error);
        alert("Google login failed");
      }
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={ChefMateLogo} alt="ChefMate Logo" />
        <h1 className="login-title">
          To start creating MealPlans please create an account or login
        </h1>

        <LoginForm onLogin={handleLogin} />

        <p className="login-subtitle">Or sign in with Google</p>

        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </GoogleOAuthProvider>

        <p className="login-subtitle">
          New to ChefMate? <br />
          Sign up here to start planning your meals for the week!
        </p>

        <button onClick={goToSignup} className="signup-switch-button">
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
