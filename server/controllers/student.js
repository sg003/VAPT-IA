const express = require('express');
const Students = require('../models/student');
const Admin  = require('../models/admin');

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

const loginstudent = async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Students.findOne({ username, password });
    if (student) {
      res.status(200).json({ message: 'Login successful', redirectUrl: 'student/home' });
    } else {
      const admin = await Admin.findOne({ username, password });
      if (admin) {
        res.status(200).json({ message: 'Login successful', redirectUrl: 'admin/home' });
      } else {
        res.status(401).json({ message: 'Login unsuccessful' });
      }
    }
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  loginstudent,
  registerstudent
};
