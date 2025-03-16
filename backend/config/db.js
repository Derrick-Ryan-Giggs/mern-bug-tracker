// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

// config/middleware.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const configureMiddleware = (app) => {
  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  // CORS middleware
  app.use(cors());
  
  // HTTP request logger
  app.use(morgan('dev'));
  
  return app;
};

module.exports = configureMiddleware;

// config/errorHandler.js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };