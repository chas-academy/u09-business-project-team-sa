import React, { useState } from 'react';
import './ProfilePage.css';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/Buttons.css';
import FavoritesCard from '../../components/cards/FavoritesCard';
import WeeklyPlanner from '../../components/cards/WeeklyPlanner';
import { useMealPlan } from '../../../../context/MealPlanContext';



type Meal = {
  id: string;
  title: string;
  image?: string;
  description?: string;
};

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mealPlan } = useMealPlan();

  
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);

  const handleRemoveFavorite = (id: string) => {
    setFavoriteMeals((prev) => prev.filter((meal) => meal.id !== id));
  };
 
  const handleViewHome = () => {
    navigate('/home');
  }
 
  return (
    <div className="profile-page">
      <h2>Welcome, {user?.username ?? 'Guest'} 👋</h2>
      <button onClick={handleViewHome} className="home-button">Home</button>
    
      <h2>Weekly Meal Planner</h2>
      <WeeklyPlanner mealPlan={mealPlan} />
     
        <FavoritesCard
        favorites={favoriteMeals}
        onRemoveFavorite={handleRemoveFavorite}
      />

    </div>
  );
};

export default ProfilePage;
