import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      window.location.reload();
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p className="auth-link" onClick={() => navigate('/register')}>
        Don't have account? Register
      </p>
    </div>
  </div>
);
}

export default Login;