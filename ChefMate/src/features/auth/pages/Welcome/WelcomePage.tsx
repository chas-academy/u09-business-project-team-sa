import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const goBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="weclome-page">
      <div className="wlcome-container">
        <h1 className="welcome-title">Welcome to ChefMate</h1>
        
        <ul className="welcome-list">
            <ol> - CREATE WEEKLY MEALPLANS.</ol>
            <ol> - CREATE YOURE OWN RECEPIES BY ADDING INGRIDIENTS.</ol>
            <ol> - ADD/SAVE OR EDIT RECEPIES.</ol>
        </ul>

        <button onClick={goBackToLogin} className="signup-switch-button">
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;