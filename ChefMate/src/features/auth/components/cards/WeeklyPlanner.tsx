import React from 'react';
import { useMealPlan, MealPlan, MealSlot } from '../../../../context/MealPlanContext';
import { Link } from 'react-router-dom';
import styles from './WeeklyPlanner.module.css';
import './WeeklyPlanner.css';
import '../../../../styles/Buttons.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

type WeeklyPlannerProps = {
  mealPlan: MealPlan;
};

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ mealPlan }) => {
  const { removeMealFromPlan } = useMealPlan();

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
                    <li key={i} className="meal-list-item">
                      <div className="meal-content">
                        <Link
                          to={`/meal/${mealSlot.id}`}
                          className="meal-link"
                        >
                          {mealSlot.image && (
                            <img src={mealSlot.image} alt={mealSlot.name} className={styles.image} />
                          )}
                          <span className="meal-name">{mealSlot.name}</span>
                        </Link>
                        <button
                          onClick={() => removeMealFromPlan(day, meal, mealSlot.id)}
                          className="remove-button"
                        >
                          ✕
                        </button>
                      </div>
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
