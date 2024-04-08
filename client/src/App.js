import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/homepage';
import Admin from './pages/adminhome';
import Register from './pages/register';
import FakePage from '../src/exploit/xss';

function App() {
  const PrivateRoute = ({ element }) => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? element : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/student/home" element={<PrivateRoute element={<Home/>} />}></Route>
        <Route path="/admin/home" element={<PrivateRoute element={<Admin/>} />}></Route>
        <Route path="fakepage" element={<FakePage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
