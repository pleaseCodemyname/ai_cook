// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./ai_cook_backend/config/db');
const ingredientRoutes = require('./ai_cook_backend/routes/ingredient_routes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api', ingredientRoutes);

module.exports = app;
