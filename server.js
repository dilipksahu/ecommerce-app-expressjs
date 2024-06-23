const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const db = require('./db');

const app = express();

app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});