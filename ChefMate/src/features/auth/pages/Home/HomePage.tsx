import './HomePage.css'
import SearchRecipeForm from '../../components/SearchRecipeForm';'../../components/SearchRecipeForm';
import RecipeCard from '../../../recipes/components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';

type Meal = {
  id: string;
  title: string;
};

const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();         // Clear the user
    navigate('/login'); // Redirect to login
  };

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

useEffect(() => {
  const fetchRandomMeals = async () => {
    try {
      const res = await api.get('spoonacular/recipes/random');
      if (res.data.recipes) {
      setMeals(res.data.recipes);
      } else {
        console.warn('No random recipes foud in response', res.data);
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

      <button onClick={handleLogout} className="logout-button">Log Out</button>

      <img src={ChefMateLogo} alt="ChefMate Logo" />

      <h1>Start searching for recipes</h1>
    
    {/* search form for recipes */}
    <div>
      <SearchRecipeForm onSearch={handleSearch} />
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

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       const res = await api.get('spoonacular/recipes?q=chicken'); // 
  //       setMeals(res.data.results); //
  //     } catch (err) {
  //       console.error('Failed to fetch meals', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMeals();
  // }, []);