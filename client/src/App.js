import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/homepage';
import Admin from './pages/adminhome';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/student/home" element={<Home/>}></Route>
        <Route path="/admin/home" element={<Admin/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
