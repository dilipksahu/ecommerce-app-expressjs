const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const rateLimit = require('express-rate-limit');
dotenv.config();
const db = require('./db');

const app = express();

app.use(bodyParser.json());

// Implement SSL/TLS for secure communication
const privateKey = fs.readFileSync('./certificates/private.key', 'utf8');
const certificate = fs.readFileSync('./certificates/certificate.crt', 'utf8');
const ca = fs.readFileSync('./certificates/ca_bundle.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply to all requests
app.use(limiter);



const PORT = process.env.PORT || 3000;

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});