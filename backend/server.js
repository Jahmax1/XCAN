const express = require('express');
const cors = require('cors');
const scanRoutes = require('./routes/scan');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api', scanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));