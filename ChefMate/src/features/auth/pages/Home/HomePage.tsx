import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome Home!</h1>
      <p>CREATE WEEKLY MEALPLANS.</p>
      <p>CREATE YOUR OWN RECIPES BY ADDING INGREDIENTS.</p>
      <p>ADD / SAVE OR EDIT RECIPES.</p>
    </div>
  );
};


export default HomePage;