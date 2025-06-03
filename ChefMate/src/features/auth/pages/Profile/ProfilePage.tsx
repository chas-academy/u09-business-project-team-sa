import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../components/Buttons.css';
import FavoritesCard from '../../components/cards/FavoritesCard';
import WeeklyPlanner from '../../components/cards/WeeklyPlanner';
import { useMealPlan } from '../../../../context/MealPlanContext';
import { MealPlan, MealSlot } from '../../../../context/MealPlanContext';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

// type MealPlan = {
//   [day: string]: {
//     [meal: string]: string[]; // array of recipe names or IDs
//   };
// };

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

  const [username] = useState(() => localStorage.getItem('username') || 'Guest');
  
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);

  const handleRemoveFavorite = (id: string) => {
    setFavoriteMeals((prev) => prev.filter((meal) => meal.id !== id));
  };
 
  const handleViewHome = () => {
    navigate('/home');
  }
 
  // const [mealPlan, setMealPlan] = useState<MealPlan>(() =>
  //   daysOfWeek.reduce((acc, day) => {
  //     acc[day] = meals.reduce((mealAcc, meal) => {
  //       mealAcc[meal] = [];
  //       return mealAcc;
  //     }, {} as { [meal: string]: string[] });
  //     return acc;
  //   }, {} as MealPlan)
  // );

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
