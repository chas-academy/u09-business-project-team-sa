import './HomePage.css'
import SearchRecipeForm from '../../components/SearchRecipeForm';'../../components/SearchRecipeForm';
import RecipeCard from '../../../recipes/components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'

const dummyMeals = [
  { id: '1', name: 'Chicken Curry' },
  { id: '2', name: 'Beef Stew' },
  { id: '3', name: 'Vegan Bowl' },
];

const handleSaveMeal = (mealId: string) => {
  console.log(`Meal ${mealId} saved!`);
};

const HomePage = () => {
  return (
    <div className="homepage">

      <img src={ChefMateLogo} alt="ChefMate Logo" />

      <h1>Start searching for recipes</h1>
    
    {/* search form for recipes */}
    <div>
      <SearchRecipeForm />
    </div>

    <div>
      <RecipeCard title="Weekly Meals" meals={dummyMeals} onSave={handleSaveMeal} />
    </div>

    </div>
  );
};


export default HomePage;