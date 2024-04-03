import React, { useState } from 'react';
import './Common.css'; 
import axios from 'axios'; 
import {url, c_url} from '../Global/URL';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + '/student-login', { username, password });
      const { message, redirectUrl } = response.data;
      if (response.status === 200) {
        window.location.href = c_url + redirectUrl;
      } 
      else {
          alert('Invalid username or password');
        }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box"> 
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <ul style={{ listStyleType: 'none', padding: 0, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <li style={{ display: 'inline', marginRight: '10px', textAlign: 'center' }}>
            <a href="/register" style={{ textDecoration: 'none', color: '#11195c' }}>Don't have an account? Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;
