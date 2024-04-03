import React, { useState, useEffect } from 'react';
import './Common.css'; 
import axios from 'axios'; 
import { redirect } from 'react-router-dom'; 
import {url, c_url} from '../Global/URL';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!username.endsWith('@somaiya.edu')) {
      alert('Please enter a valid somaiya.edu email address.');
      return;
    }
    try {
      const response = await axios.post(url + '/student-register', { username, password });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setRegistrationSuccess(true);
        alert('Registration successful!');
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An unexpected error occurred during registration.');
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        window.location.href = c_url + ''; 
      }, 500);
    }
  }, [registrationSuccess]);

  return (
    <div className="login-container">
      <div className="login-box"> 
        <h1>Register</h1>
        {registrationSuccess ? (
          <redirect to="/" /> 
        ) : (
          <form onSubmit={handleRegister}>
            <label>
              Email:
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <br /><br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br /><br />
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;