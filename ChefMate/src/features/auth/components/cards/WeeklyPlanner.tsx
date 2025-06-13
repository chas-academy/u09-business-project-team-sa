import React from 'react';
import { MealPlan, MealSlot } from '../../../../context/MealPlanContext';
import { Link } from 'react-router-dom';
import styles from './WeeklyPlanner.module.css';
import './WeeklyPlanner.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

type WeeklyPlannerProps = {
  mealPlan: MealPlan;
};

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ mealPlan }) => {
  return (
    <div className="calendar">
      {daysOfWeek.map((day) => (
        <div className="day-column" key={day}>
          <h3>{day}</h3>
          {meals.map((meal) => (
            <div className="meal-slot" key={meal}>
              <strong>{meal}</strong>
              <ul>
                {mealPlan[day] && mealPlan[day][meal]?.length > 0 ? (
                  mealPlan[day][meal].map((mealSlot: MealSlot, i: number) => (
                    <li key={i}>
                      <Link to={`/meal/${mealSlot.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                      {mealSlot.image && (
                        <img
                          src={mealSlot.image}
                          alt={mealSlot.name}
                          className={styles.image}
                        />
                      )}
                      <span className="meal-name">{mealSlot.name}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="empty">No meal added</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeeklyPlanner;
