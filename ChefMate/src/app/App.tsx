// import TestFetch from '../shared/components/TestFetch'
// import reactLogo from '/src/assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

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
  <HomeProvider>
  <MealPlanProvider>
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

        {/* api routes */}
        <Route path="spoonacular/recipes/:id" element={<MealCard />} />
        <Route path="/meal/:id" element={<MealCard />} />
        
        {/* Redirect any unknown route to WelcomePage */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
  </MealPlanProvider>
  </HomeProvider>
  );
}

export default App;
