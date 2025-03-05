// const express = require('express');
import express from 'express';
const db = require('./db');
const Joi = require('joi');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Validation schema using Joi
const schoolSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

// Add School API
app.post('/addSchool', async (req, res) => {
  try {
    // Validate input data
    const { error } = schoolSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, address, latitude, longitude } = req.body;

    // Insert data into the database
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [name, address, latitude, longitude]);

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
