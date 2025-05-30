import './RecipeCard.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Link } from 'react-router-dom';

type Meal = {
  id: string;
  name: string;
};

type RecipeCardProps = {
  title: string;
  meals: Meal[];
  onSave: (mealId: string) => void;
};

const RecipeCard = ({ title, meals, onSave }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <h2>{title}</h2>

      <div className="meal-grid">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <h3>{meal.name}</h3>
            <button onClick={() => onSave(meal.id)}>Save</button>

            {/* <Link to={`spoonacular/meals/${meal.id}`}>
            <button>View</button>
            </Link> */}
            <button onClick={() => navigate(`/spoonacular/recipes/${meal.id}`)}>View</button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default RecipeCard;
