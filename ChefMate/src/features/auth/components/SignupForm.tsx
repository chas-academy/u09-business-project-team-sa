import '../pages/Signup/SignupPage.css'
import React, { useState } from 'react';
// import api from '../../../api/axios';
// import { useNavigate } from 'react-router-dom';

type Props = {
  onSignup: (username: string, email: string, password: string) => void;
};

const SignupForm = ({ onSignup }: Props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(username, email, password);
  };

  return (
<form onSubmit={handleSubmit} className="signup-form">
    <label htmlFor="user-name">Username</label>
    <input 
      id="user-name" 
      type="text"
      value={username}
      onChange={e => setUsername(e.target.value)}
      placeholder="Enter username" 
      required
      />

    <label htmlFor="email">Email</label>
    <input 
      id="email" 
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="Enter email" 
      required
      />

    <label htmlFor="password">Password</label>
    <input 
      id="password" 
      type="password" 
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="Enter password" 
      required
      />

    {/* <label htmlFor="confirm-password">Retype Password</label>
    <input id="confirm-password" placeholder="Enter password again" type="password" /> */}

    <button type="submit" className="signup-button">Sign Up</button>
</form>
  );
};

export default SignupForm;