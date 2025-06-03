import './RecipeCard.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';
import { Link } from 'react-router-dom';

type Meal = {
  id: string;
  name: string;
  image?: string;
};

type RecipeCardProps = {
  title: string;
  meals: Meal[];
  onSave: (mealId: string) => void;
  onMore: () => void;
  onBack: () => void;
  searchTerm: string;
  offset: number;
};

const RecipeCard = ({ title, meals, onSave, onMore, onBack, searchTerm, offset }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <h2>{title}</h2>

      <div className="meal-grid">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <h3>{meal.name}</h3>
          {meal.image && (
            <img
              src={meal.image}
              alt={meal.name}
              className='meal-image'
              // style={{
              //   width: '100%',
              //   height: '140px',
              //   objectFit: 'cover',
              //   borderRadius: '8px',
              //   marginBottom: '10px'
              // }}
            />
          )}

            <button onClick={() => onSave(meal.id)}>Save</button>
            <button onClick={() => navigate(`/spoonacular/recipes/${meal.id}`)}>View</button>
          </div>
        ))}
      </div>

      <div className="card-controls">
        {/* <button onClick={onBack} disabled={searchTerm && offset === 0}>Back</button> */}
        {searchTerm && offset > 0 && (
        <button onClick={onBack} className='back-button'>Back</button>
        )}
        <button onClick={onMore} className='more-button'>More</button>
      </div>

    </div>
  );
};

export default RecipeCard;
