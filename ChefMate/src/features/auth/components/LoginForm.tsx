import '../pages/Login/LoginPage.css'
import React, { useState } from 'react';

type Props = {
  onLogin: (email: string, password: string) => void;
};

const LoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
<form onSubmit={handleSubmit} className="login-form">
    <label htmlFor="user-name">Username</label>
    {/* <input 
      id="username"  
      type="username"
      value={username}
      onChange={e=> setUsername(e.target.value)}
      placeholder="Enter username" 
      required
      /> */}

    <label htmlFor="email">Email</label>
    <input 
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter email"
        required
        autoComplete="email"
      />

    <label htmlFor="password">Password</label>
    <input 
      id="password" 
      type="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="Enter password"  
      required
      autoComplete="current-password"
      />

      <button type="submit" className="login-button">Log In</button>
</form>
  );
};

export default LoginForm;