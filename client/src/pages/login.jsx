import React, { useState, useEffect } from 'react';
import './Common.css'; 
import axios from 'axios'; 
import {url, c_url} from '../Global/URL';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken || refreshToken) {
      authenticateWithToken(accessToken, refreshToken);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + '/student-login', { username, password });
      const { message, accessToken, refreshToken, redirectUrl } = response.data;
      if (response.status === 200) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        window.location.href = c_url + redirectUrl;
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred during login.');
    }
  };

  const generateToken = async (refreshToken) => {
    try {
      const response = await axios.post(url + '/generate-accesstoken', { refreshToken });
      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        authenticateWithToken(accessToken, refreshToken);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('refreshToken');
        window.location.href = c_url + 'login';
      } else {
        console.error('Error during token authentication:', error);
      }
    }
  }

  const authenticateWithToken = async (accessToken, refreshToken) => {
    try {
      if(accessToken){
        const response = await axios.post(url + '/authenticate', { accessToken });
        if (response.status === 200) {
          const { redirectUrl } = response.data;
          window.location.href = c_url + redirectUrl;
        }
      } else {
        generateToken(refreshToken);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('accessToken');
        generateToken(refreshToken);
      } else {
        console.error('Error during token authentication:', error);
      }
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
              type="text"
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
