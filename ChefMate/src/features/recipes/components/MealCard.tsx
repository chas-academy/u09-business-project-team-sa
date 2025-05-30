import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import './MealCard.css';

type Meal = {
  id: string;
  name: string;
  image?: string;
  dishTypes?: string[];
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  dairyFree?: boolean;
  calories?: number;
  timeToMake?: number;
  servings?: number;
  protein?: number;
  fat?: number;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  steps?: string[];
};

const MealCard = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await api.get(`spoonacular/recipes/${id}`);
        setMeal(res.data);
      } catch (err) {
        console.error('Failed to fetch meal', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div className="meal-card-detailed">
      {meal.image && (
        <img src={meal.image} alt={meal.name} className="meal-image" />
      )}

      <h2>{meal.name}</h2>

      <div className="diet-info">
        {/* <p>Dish Type: {meal.dishType }</p> */}
        <p>Dish Type: {meal.dishTypes && meal.dishTypes.length > 0 
            ? meal.dishTypes.join(', ') 
            : 'N/A'}
        </p>
        <p>Vegetarian: {meal.vegetarian ? '✅' : '❌'}</p>
        <p>Vegan: {meal.vegan ? '✅' : '❌'}</p>
        <p>Gluten-Free: {meal.glutenFree ? '✅' : '❌'}</p>
        <p>Dairy-Free: {meal.dairyFree ? '✅' : '❌'}</p>
        {/* <p>Calories: {Math.round(meal.calories)} kcal</p> */}
        <p>Calories: {meal.calories ? `${Math.round(meal.calories)} kcal` : 'N/A'}</p>
        <p>Time to Make: {meal.timeToMake ? `${meal.timeToMake} min` : 'N/A'}</p>
        <p>Servings: {meal.servings ?? 'N/A'}</p>
        <p>Protein: {meal.protein ? `${Math.round(meal.protein)} g` : 'N/A'}</p>
        <p>Fat: {meal.fat ? `${Math.round(meal.fat)} g` : 'N/A'}</p>
      </div>

      {/* {meal.description && <p>{meal.description.replace(/<\/?[^>]+(>|$)/g, '')}</p>} */}

      <div className='meal.content'>
      {meal.ingredients && (
        <>
          <h4>Ingredients:</h4>
          <ul>
            {meal.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </>
      )}

      {meal.steps && meal.steps.length > 0 ? (
        <>
          <h4>Instructions:</h4>
          <ol>
            {meal.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      ) : (
        meal.instructions && (
          <>
            <h4>Instructions:</h4>
            <p dangerouslySetInnerHTML={{ __html: meal.instructions }} />
          </>
        )
      )}
    </div>

      <h2>Enjoy!</h2>
      {/* {meal.instructions && (
        <>
          <h4>Instructions:</h4>
          <p>{meal.instructions}</p>
        </>
      )} */}
    
    </div>
  );
};

export default MealCard;
