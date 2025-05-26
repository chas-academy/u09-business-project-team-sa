import './SignupPage.css';
import SignupForm from '../../components/SignupForm';
import { useNavigate } from 'react-router-dom';
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import React, { useState } from 'react';
import api from '../../../../api/axios';
import { useAuth } from '../../../../context/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

   const handleSignup = async (username: string, email: string, password: string) => {
    try {
      const res = await api.post('/users/signup', { username, email, password });
      login(res.data.user); // Log in user immediately after signup
      navigate('/home'); 
    } catch (err) {
      alert('Signup failed');
    }
  };

  const goBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <img src={ChefMateLogo} alt="ChefMate Logo" />
        <h1 className="signup-title">Create an Account</h1>
        <SignupForm onSignup={handleSignup}/>

        <button onClick={goBackToLogin} className="signup-switch-button">
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
};

export default SignupPage;