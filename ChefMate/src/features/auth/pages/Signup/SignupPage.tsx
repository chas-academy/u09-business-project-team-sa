import './SignupPage.css';
import SignupForm from '../../components/SignupForm';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const goBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
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