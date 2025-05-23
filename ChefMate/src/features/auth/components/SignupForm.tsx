import '../pages/Signup/SignupPage.css'

const SignupForm = () => {
  return (
<form className="signup-form">
    <label htmlFor="user-name">Username</label>
    <input id="user-name" placeholder="Enter username" />

    <label htmlFor="email">Email</label>
    <input id="email" placeholder="Enter email" />

    <label htmlFor="password">Password</label>
    <input id="password" placeholder="Enter password" type="password" />

    <label htmlFor="confirm-password">Retype Password</label>
    <input id="confirm-password" placeholder="Enter password again" type="password" />

</form>
  );
};

export default SignupForm;