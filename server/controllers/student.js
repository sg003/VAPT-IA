const jwt = require('jsonwebtoken');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const Students = require('../models/student');
const Admin  = require('../models/admin');

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_JWT_KEY, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const registerstudent = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingStudent = await Students.findOne({ username });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const newStudent = new Students({ username, password });
    await newStudent.save();
    res.status(200).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error during student registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const loginstudent = async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   try {
//     const student = await Students.findOne({ username, password });
//     if (student) {
//       res.status(200).json({ message: 'Login successful', redirectUrl: 'student/home' });
//     } else {
//       const admin = await Admin.findOne({ username, password });
//       if (admin) {
//         res.status(200).json({ message: 'Login successful', redirectUrl: 'admin/home' });
//       } else {
//         res.status(401).json({ message: 'Login unsuccessful' });
//       }
//     }
//   } catch (error) {
//     console.error('Error during student login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const loginstudent = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    let user;
    let userType;
    let redirectUrl;

    const student = await Students.findOne({ username, password });
    if (student) {
      user = student;
      userType = 'student';
      redirectUrl = 'student/home';
    } else {
      const admin = await Admin.findOne({ username, password });
      if (admin) {
        user = admin;
        userType = 'admin';
        redirectUrl = 'admin/home';
      }
    }

    if (user) {
      const { _id, username } = user;
      const payload = { _id, username, userType };
      const { accessToken, refreshToken } = generateTokens(payload);
      res.status(200).json({ message: 'Login successful', accessToken, refreshToken,  redirectUrl: redirectUrl});
    } else {
      res.status(401).json({ message: 'Login unsuccessful' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateAccessTokens = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  try {
    const decoded = jwt.decode(refreshToken, process.env.SECRET_REFRESH_JWT_KEY);
    const { _id, username, userType } = decoded;
    const isExpired = decoded.exp < Date.now() / 1000;
    if (isExpired) {
      return res.status(401).json({ message: 'Refresh token has expired' });
    } else {
      const payload = { _id, username, userType };
      const accessToken = jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '15m' });
      return res.status(200).json({ accessToken: accessToken });
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

const tokenizedLogin = async (req, res) => {
  const { accessToken } = req.body;
  if(!accessToken){
    return res.status(401).json({ message: 'Access token not provided' });
  }
  console.log(accessToken);

  try {
    const decoded = jwt.decode(accessToken, process.env.SECRET_JWT_KEY);
    console.log(decoded);
    const { _id, username, userType } = decoded;
    const isExpired = decoded.exp < Date.now() / 1000;
    if (isExpired) {
      return res.status(401).json({ message: 'Access token has expired' });
    } else {
      redirectUrl = userType + '/home';
      return res.status(200).json({ message: 'Login successful', redirectUrl: redirectUrl});
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  loginstudent,
  registerstudent,
  tokenizedLogin,
  generateAccessTokens,
};
