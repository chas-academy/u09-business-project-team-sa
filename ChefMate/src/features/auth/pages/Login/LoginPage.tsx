import './LoginPage.css';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import React, { useState } from 'react';
import api from '../../../../api/axios';
import { useAuth } from '../../../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

   const handleLogin = async (email: string, password: string) => {
    try {
      const res = await api.post('/users/login', { email, password });
      login(res.data.user); // Save user in context
      navigate('/home'); // Or wherever you want to redirect
    } catch (err) {
      console.error('Login failed', err);
      alert('Invalid credentials');
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={ChefMateLogo} alt="ChefMate Logo" />
        <h1 className="login-title">
            To start creating MealPlans please create an account or login
            </h1>

        <LoginForm onLogin={handleLogin} /> 

        {/* <p className="login-subtitle">
            Or sign in with google
        </p> */}

        {/* <button onClick={handleLogin} className="login-button">
          Log in
        </button> */}

        <button onClick={handleGoogleLogin} className="login-Google-button">
          Or Sign in with Google
        </button>

        <p className="login-subtitle">
            New to ChefMate? <br></br>
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

