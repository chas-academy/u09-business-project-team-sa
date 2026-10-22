<<<<<<< HEAD
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import { GoogleOAuthProvider } from "@react-oauth/google";
import { MealPlanProvider } from '../context/MealPlanContext'
import { HomeProvider } from '../context/HomeContext'

import './App.css'
import LoginPage from '../features/auth/pages/Login/LoginPage'
import SignupPage from '../features/auth/pages/Signup/SignupPage'
import HomePage from '../features/auth/pages/Home/HomePage'
import WelcomePage from '../features/auth/pages/Welcome/WelcomePage'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import MealCard from '../features/auth/components/cards/MealCard'
import ProfilePage from '../features/auth/pages/Profile/ProfilePage'
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { MealPlanProvider } from "../context/MealPlanContext";
import { HomeProvider } from "../context/HomeContext";
import "./App.css";
import LoginPage from "../features/auth/pages/Login/LoginPage";
import SignupPage from "../features/auth/pages/Signup/SignupPage";
import HomePage from "../features/auth/pages/Home/HomePage";
import WelcomePage from "../features/auth/pages/Welcome/WelcomePage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import MealCard from "../features/auth/components/cards/MealCard";
import ProfilePage from "../features/auth/pages/Profile/ProfilePage";
import OauthCallback from "../features/auth/pages/Callbacks/OauthCallback";
>>>>>>> oAuth-model-db

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
<<<<<<< HEAD
    <GoogleOAuthProvider clientId={clientId}>
=======
>>>>>>> oAuth-model-db
    <HomeProvider>
      <MealPlanProvider>
        <Router>
          <Routes>
<<<<<<< HEAD
            {/* auth routes */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" 
                element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* api routes */}
            <Route path="spoonacular/recipes/:id" element={<MealCard />} />
            <Route path="/meal/:id" element={<MealCard />} />
            
            {/* Redirect any unknown route to WelcomePage */}
            <Route path="*" element={<Navigate to="/" />} />
            
=======
            {/* Auth Routes */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/oauth/callback" element={<OauthCallback />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />

            {/* API routes */}
            <Route path="spoonacular/recipes/:id" element={<MealCard />} />
            <Route path="/meal/:id" element={<MealCard />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
>>>>>>> oAuth-model-db
          </Routes>
        </Router>
      </MealPlanProvider>
    </HomeProvider>
<<<<<<< HEAD
  </GoogleOAuthProvider>
  );
}

export default App;
=======
  );
}

export default App;
>>>>>>> oAuth-model-db
