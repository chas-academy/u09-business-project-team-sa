import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../../api/axios';
import styles from './MealCard.module.css';
import './MealCard.css';
import '../../../../styles/Buttons.css';
import mockMeals from '../../../../mocks/mockMeals';
import { useMealPlan } from '../../../../context/MealPlanContext';

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

  const [showPlannerSelector, setShowPlannerSelector] = useState(false);
  const { addMealToPlan } = useMealPlan();

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewHome = () => {
    navigate('/home');
  }

  const handleViewProfile = () => {
    navigate('/profile');
  }

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await api.get(`spoonacular/recipes/${id}`);
        setMeal(res.data);
      } catch (err) {
        console.error('Failed to fetch meal', err);
        const fallbackMeal = mockMeals.find((meal) => meal.id === id) || mockMeals[0];
        setMeal(fallbackMeal);
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
      <button onClick={handleViewHome} className="home-button">Home</button>
      {meal.image && (
        <img src={meal.image} alt={meal.name} className={styles.image} />
      )}

      <h2>{meal.name}</h2>

      <div className="diet-info">
        <p>Dish Type: {meal.dishTypes && meal.dishTypes.length > 0 
            ? meal.dishTypes.join(', ') 
            : 'N/A'}
        </p>
        <p>Vegetarian: {meal.vegetarian ? '✅' : '❌'}</p>
        <p>Vegan: {meal.vegan ? '✅' : '❌'}</p>
        <p>Gluten-Free: {meal.glutenFree ? '✅' : '❌'}</p>
        <p>Dairy-Free: {meal.dairyFree ? '✅' : '❌'}</p>
        <p>Calories: {meal.calories ? `${Math.round(meal.calories)} kcal` : 'N/A'}</p>
        <p>Time to Make: {meal.timeToMake ? `${meal.timeToMake} min` : 'N/A'}</p>
        <p>Servings: {meal.servings ?? 'N/A'}</p>
        <p>Protein: {meal.protein ? `${Math.round(meal.protein)} g` : 'N/A'}</p>
        <p>Fat: {meal.fat ? `${Math.round(meal.fat)} g` : 'N/A'}</p>
      </div>

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
    
      <button onClick={handleViewProfile} className="profile-button">View Profile</button>

      <button onClick={() => setShowPlannerSelector(!showPlannerSelector)} className='save-button'>
  {showPlannerSelector ? 'Cancel' : 'Save to Calendar'}
      </button>

{showPlannerSelector && (
  <div className="planner-selector">
    <label>
      Select Day:
      <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
        <option value="">-- Choose Day --</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
    </label>

    <label>
      Meal Type:
      <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)}>
        <option value="">-- Choose Type --</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snacks">Snacks</option>
      </select>
    </label>

    <button
      className="save-button"
      disabled={!selectedDay || !selectedMealType}
      onClick={() => {
        addMealToPlan(selectedDay, selectedMealType, meal);
        alert('Meal added to your planner!');
        setShowPlannerSelector(false);
      }}
    >
      Confirm Save
    </button>
  </div>
)}

    </div>
  );
};

export default MealCard;
