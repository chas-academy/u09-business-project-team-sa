import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../features/auth/pages/Login/LoginPage";
import SignupPage from "../features/auth/pages/Signup/SignupPage";
import HomePage from "../features/auth/pages/Home/HomePage";
import WelcomePage from "../features/auth/pages/Welcome/WelcomePage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import MealCard from "../features/auth/components/cards/MealCard";
import ProfilePage from "../features/auth/pages/Profile/ProfilePage";

function App() {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/user", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <Router>
      <div className="app-header">
        <h1>Login</h1>
        {user ? (
          <div>
            <p>Welcome, {user.displayName}</p>
            {user.photos?.[0]?.value && (
              <img src={user.photos[0].value} alt="profile" width="80" />
            )}
            <br />
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </div>

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />

        {/* API Route */}
        <Route path="/spoonacular/recipes/:id" element={<MealCard />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
