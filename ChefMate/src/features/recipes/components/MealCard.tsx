import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../api/axios';

type Meal = {
  id: string;
  name: string;
  description?: string;
  ingredients?: string[];
  instructions?: string;
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
      <h2>{meal.name}</h2>
      {meal.description && <p>{meal.description}</p>}
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
      {meal.instructions && (
        <>
          <h4>Instructions:</h4>
          <p>{meal.instructions}</p>
        </>
      )}
    </div>
  );
};

export default MealCard;
