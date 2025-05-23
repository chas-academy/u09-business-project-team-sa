// import './RecipeCard.css';

// type RecipeCardProps = {
//   title: string;
//   description?: string;
//   image?: string;
// };

// const RecipeCard = ({ title, description, image }: RecipeCardProps) => {
//   return (
//     <div className="recipe-card">
//       {image && <img src={image} alt={title} className="recipe-image" />}
//       <h2>{title}</h2>
//       {description && <p>{description}</p>}
//     </div>
//   );
// };

// export default RecipeCard;

import './RecipeCard.css';

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
  return (
    <div className="recipe-card">
      <h2>{title}</h2>

      <div className="meal-grid">
        {meals.map((meal) => (
          <div key={meal.id} className="meal-card">
            <h3>{meal.name}</h3>
            <button onClick={() => onSave(meal.id)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
