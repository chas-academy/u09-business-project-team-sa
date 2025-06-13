import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'
import MealPrep from '../../../../assets/mealprep.jpg'

const WelcomePage = () => {
  const navigate = useNavigate();

  const goBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <h1 className="welcome-title">Welcome to</h1>
        
        <img src={ChefMateLogo} alt="ChefMate Logo" />

        <ul className="welcome-list">
            <li>CREATE WEEKLY MEALPLANS.</li>
            <li>CREATE YOUR OWN MEALS.</li>
            <li>ADD / SAVE OR EDIT RECIPES.</li>
        </ul>

        <h2>And many more features!</h2>

        <img src={MealPrep} alt="Meal prep" className="welcome-banner" />

        <button onClick={goBackToLogin} className="signup-switch-button">
           Get started here!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;