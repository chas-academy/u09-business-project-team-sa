import './LoginPage.css';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  const goToSignup = () => {
    navigate('/signup');
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">
            To start creating MealPlans please create an account or login
            </h1>

        <LoginForm /> 

        <p className="login-subtitle">
            Or sign in with google
        </p>

        <button onClick={handleLogin} className="login-button">
          Sign in with Google
        </button>

        <p className="login-subtitle">
            New to ChefMate? Sign up here to start planning your meals for the week!
        </p>

        <button onClick={goToSignup} className="signup-switch-button">
          Create an Account
        </button>

      </div>
    </div>
  );
};

export default LoginPage;

