import './HomePage.css'
import SearchRecipeForm from '../../components/forms/SearchRecipeForm';'../../components/SearchRecipeForm';
import RecipeCard from '../../components/cards/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';
import '../../../../styles/Buttons.css';
import mockMeals from '../../../../mocks/mockMeals';
// import { handleSearch, handleBack, handleClear, handleMore } from '../../../../context/HomeContext';
import { useHome } from '../../../../context/HomeContext';

type Meal = {
  id: string;
  title?: string;
  name?: string;
  image?: string;
};

const HomePage = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
  meals, loading, searchTerm, offset,
  handleSearch, handleClear, handleMore, handleBack
} = useHome();

  const handleLogout = () => {
    logout();         // Clear the user
    navigate('/login'); // Redirect to login
  };

  const handleViewProfile = () => {
    navigate('/profile');
  }

  const handleSaveMeal = (mealId: string) => {
  console.log(`Meal ${mealId} saved!`);
  };

  return (
    <div className="homepage">

      <img src={ChefMateLogo} alt="ChefMate Logo" />

      <h2>Welcome, {user?.username ?? 'Guest'} 👋</h2>
      <button onClick={handleLogout} className="logout-button">Log Out</button>
      <button onClick={handleViewProfile} className="profile-button">Profile</button>
    
      <h2>Start searching for recipes</h2>
    
    {/* search form for recipes */}
    <div>
      <SearchRecipeForm onSearch={handleSearch} onClear={handleClear}/>
    </div>

    {loading ? (
        <p>Loading meals...</p>
      ) : (
        <div>
          <RecipeCard
            title={searchTerm ? `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} 
              Meals` : 'Popular Meals'}

            meals={meals.map((m) => ({ 
              id: m.id.toString(), 
              name: m.title ?? m.name ?? 'Untitled Meal',
              image: m.image,
            }))}

            onSave={handleSaveMeal}
            onMore={handleMore}
            onBack={handleBack}
            searchTerm={searchTerm}
            offset={offset}
          />
        </div>
      )}

    </div>
  );
};

export default HomePage;