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
import mockMeals from '../../../../mocks/mockMeals';

type Meal = {
  id: string;
  title?: string;
  name?: string; //to use mockmeals
  image?: string;
};

const HomePage = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  const [offset, setOffset] = useState(0); // for search pagination
  const [randomFetchCount, setRandomFetchCount] = useState(0); 

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
    setOffset(0);
    setLoading(true);
    try {
      const res = await api.get(`spoonacular/recipes?q=${query}&offset=0`);
      setMeals(res.data.results);
    } catch (err) {
      console.error('Search failed, using mock data:', err);
      setMeals(mockMeals);
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
    setMeals(mockMeals);
  } finally {
    setLoading(false);
  }
};

const handleMore = async () => {
  setLoading(true);
  try {
    if (searchTerm) {
      const newOffset = offset + 6;
      // setOffset(newOffset);
      const res = await api.get(`spoonacular/recipes?q=${searchTerm}&offset=${newOffset}`);
      setOffset(newOffset);
      // setMeals(res.data.results);
      setMeals((prev) => [...prev, ...res.data.results]);
    } else {
      const res = await api.get('spoonacular/recipes/random');
      setMeals(res.data.recipes);
    }
  } catch (err) {
    console.error('Failed to load more meals', err);
    setMeals(mockMeals);
  } finally {
    setLoading(false);
  }
};

const handleBack = async () => {
  if (searchTerm && offset >= 6) {
    const newOffset = offset - 6;
    setOffset(newOffset);
    setLoading(true);
    try {
      const res = await api.get(`spoonacular/recipes?q=${searchTerm}&offset=${newOffset}`);
      setMeals(res.data.results);
    } catch (err) {
      console.error('Failed to go back in results', err);
    } finally {
      setLoading(false);
    }
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
      setMeals(mockMeals);
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