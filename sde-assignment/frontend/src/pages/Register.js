import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/auth/register', {
        email,
        password
      });

      alert("Registered successfully!");
      navigate('/');
    } catch (err) {
      alert("User already exists");
    }
  };

 return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Register</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>

      <p className="auth-link" onClick={() => navigate('/')}>
        Already have account? Login
      </p>
    </div>
  </div>
);
}

export default Register;