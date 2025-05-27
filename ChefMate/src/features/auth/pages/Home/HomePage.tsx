import './HomePage.css'
import SearchRecipeForm from '../../components/SearchRecipeForm';'../../components/SearchRecipeForm';
import RecipeCard from '../../../recipes/components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';

// const dummyMeals = [
//   { id: '1', name: 'Chicken Curry' },
//   { id: '2', name: 'Beef Stew' },
//   { id: '3', name: 'Vegan Bowl' },
// ];

type Meal = {
  id: string;
  title: string; // The API returns 'title' instead of 'name'
};

const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();         // Clear the user
    navigate('/login'); // Redirect to login
  };

  const handleSaveMeal = (mealId: string) => {
  console.log(`Meal ${mealId} saved!`);
  };

  const handleSearch = async (query: string) => {
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
    const fetchMeals = async () => {
      try {
        const res = await api.get('spoonacular/recipes?q=chicken'); // 
        setMeals(res.data.results); //
      } catch (err) {
        console.error('Failed to fetch meals', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
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
            title="Search Results"
            meals={meals.map((m) => ({ id: m.id.toString(), name: m.title }))}
            onSave={handleSaveMeal}
          />
        </div>
      )}

    {/* <div>
      <RecipeCard title="Weekly Meals" meals={dummyMeals} onSave={handleSaveMeal} />
    </div>

    <div>
      <RecipeCard title="My go to Meals" meals={dummyMeals} onSave={handleSaveMeal} />
    </div> */}

    </div>
  );
};


export default HomePage;