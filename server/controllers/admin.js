const express = require('express');
const Admin = require('../models/admin');

const loginadmin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const student = await Admin.findOne({ username, password });
  
      if (student) {
        res.status(200).json({ message: 'Login successful', redirectUrl: '/admin/home' });
      } else {
        res.status(401).json({ message: 'Login unsuccessful' });
      }
    } catch (error) {
      console.error('Error during student login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
  loginadmin
};
