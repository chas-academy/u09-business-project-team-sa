import './LoginPage.css';
import LoginForm from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import ChefMateLogo from '../../../../assets/Chefmate_LOGO.png'

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

   const handleLogin = () => {
    // window.location.href = 'http://localhost:4000/auth/google';
  };

  const goToSignup = () => {
    navigate('/signup');
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <img src={ChefMateLogo} alt="ChefMate Logo" />
        <h1 className="login-title">
            To start creating MealPlans please create an account or login
            </h1>

        <LoginForm /> 

        {/* <p className="login-subtitle">
            Or sign in with google
        </p> */}

        <button onClick={handleLogin} className="login-button">
          Log in
        </button>

        <button onClick={handleGoogleLogin} className="login-Google-button">
          Or Sign in with Google
        </button>

        <p className="login-subtitle">
            New to ChefMate? <br></br>
            Sign up here to start planning your meals for the week!
        </p>

        <button onClick={goToSignup} className="signup-switch-button">
          Create an Account
        </button>

      </div>
    </div>
  );
};

export default LoginPage;

