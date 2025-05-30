import './HomePage.css'
import SearchRecipeForm from '../../components/forms/SearchRecipeForm';'../../components/SearchRecipeForm';
import RecipeCard from '../../components/cards/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';
import '../../components/Buttons.css';

type Meal = {
  id: string;
  title: string;
};

const HomePage = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    setLoading(true);
    try {
      const res = await api.get(`spoonacular/recipes?q=${query}`);
      setMeals(res.data.results);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
  setSearchTerm('');
  setLoading(true);
  try {
    const res = await api.get('/meals/popular');
    setMeals(res.data);
  } catch (err) {
    console.error('Failed to fetch popular meals', err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchRandomMeals = async () => {
    try {
      const res = await api.get('spoonacular/recipes/random');
      if (res.data.recipes) {
      setMeals(res.data.recipes);
      } else {
        console.warn('No random recipes fonud in response', res.data);
        setMeals([]);
      }
    } catch (err) {
      console.error('Failed to fetch random meals', err);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRandomMeals();
}, []);

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
            title={searchTerm ? `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} Meals` : 'Popular Meals'}
            meals={meals.map((m) => ({ id: m.id.toString(), name: m.title }))}
            onSave={handleSaveMeal}
          />
        </div>
      )}

    </div>
  );
};

export default HomePage;