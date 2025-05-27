import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // or use ENV
  withCredentials: false // true if you use sessions/cookies
});

export default api;