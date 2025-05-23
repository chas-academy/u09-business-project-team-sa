import '../pages/Login/LoginPage.css'

const LoginForm = () => {
  return (
<form className="login-form">
    <label htmlFor="user-name">Username</label>
    <input id="user-name" placeholder="Enter username" />

    {/* <label htmlFor="email">Email</label>
    <input id="email" placeholder="Enter email" /> */}

    <label htmlFor="password">Password</label>
    <input id="password" placeholder="Enter password" type="password" />
</form>
  );
};

export default LoginForm;