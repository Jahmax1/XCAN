const mongoose = require('mongoose');
const Bottle = require('../models/Bottle');
require('dotenv').config();
const connectDB = require('../config/db');

// Generate a 10-digit numeric ID
const generateNumericID = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Sample bottle data
const sampleBottles = [
  {
    id: generateNumericID(),
    brand: 'Whiskey Co',
    bottlingDate: '2025-01-01',
    authentic: true,
  },
  {
    id: generateNumericID(),
    brand: 'Gin Ltd',
    bottlingDate: '2025-02-01',
    authentic: true,
  },
  {
    id: generateNumericID(),
    brand: 'Vodka Inc',
    bottlingDate: '2025-03-01',
    authentic: true,
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Bottle.deleteMany({});
    await Bottle.insertMany(sampleBottles);
    console.log('Database seeded with sample bottles:', sampleBottles);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();