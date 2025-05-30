import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../components/Buttons.css'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

type MealPlan = {
  [day: string]: {
    [meal: string]: string[]; // array of recipe names or IDs
  };
};

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username] = useState(() => localStorage.getItem('username') || 'Guest');
 
  const handleViewHome = () => {
    navigate('/home');
  }
 
  const [mealPlan, setMealPlan] = useState<MealPlan>(() =>
    daysOfWeek.reduce((acc, day) => {
      acc[day] = meals.reduce((mealAcc, meal) => {
        mealAcc[meal] = [];
        return mealAcc;
      }, {} as { [meal: string]: string[] });
      return acc;
    }, {} as MealPlan)
  );

  return (
    <div className="profile-page">
      <h2>Welcome, {user?.username ?? 'Guest'} 👋</h2>
      <button onClick={handleViewHome} className="home-button">Home</button>
    
      <h2>Weekly Meal Planner</h2>
      <div className="calendar">
        {daysOfWeek.map((day) => (
          <div className="day-column" key={day}>
            <h3>{day}</h3>
            {meals.map((meal) => (
              <div className="meal-slot" key={meal}>
                <strong>{meal}</strong>
                <ul>
                  {mealPlan[day][meal].length > 0 ? (
                    mealPlan[day][meal].map((recipe, i) => <li key={i}>{recipe}</li>)
                  ) : (
                    <li className="empty">No recipe added</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
