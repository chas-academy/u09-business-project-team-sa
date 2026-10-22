import React from "react";
import "./LoginPage.css";
import LoginForm from "../../components/forms/LoginForm";
import { useNavigate } from "react-router-dom";
import ChefMateLogo from "../../../../assets/Chefmate_LOGO.png";
import api from "../../../../api/axios";
import { useAuth } from "../../../../context/AuthContext";
import "../../../../styles/Buttons.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await api.post("/users/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      login(user);
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials");
    }
  };
<<<<<<< HEAD
  
  const handleGoogleSuccess = async (credentialResponse: { credential?: string; }) => {
    if (credentialResponse.credential) {
      try {
        // Send Google token to backend for verification and login/signup
        const res = await api.post("/auth/google-login", {
          token: credentialResponse.credential,
        });
        localStorage.setItem("token", res.data.token); // save token!

        login(res.data.user); // Save user info 

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
=======
>>>>>>> oAuth-model-db

  const goToSignup = () => {
    navigate("/signup");
  };

  const loginWithGoogle = () => {
    console.log("Login with Google clicked");
    window.open("http://localhost:5000/auth/google", "_self");
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
        <button onClick={loginWithGoogle} className="google-login-button">
          Login with Google
        </button>

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
