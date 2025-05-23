import './SignupPage.css';
import SignupForm from '../../components/SignupForm';
import { useNavigate } from 'react-router-dom';
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'

const SignupPage = () => {
  const navigate = useNavigate();

  const goBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <img src={ChefMateLogo} alt="ChefMate Logo" />
        <h1 className="signup-title">Create an Account</h1>
        <SignupForm />

        <button onClick={goBackToLogin} className="signup-switch-button">
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
};

export default SignupPage;