const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const Razorpay = require('razorpay');

// Load ENV variable
dotenv.config({ path: './config/config.env' });

// Connect to DB
const mongoDB = require('./config/db');
mongoDB();

const app = express();

// Setup CORS
app.use(cors());

// Use incoming requests
app.use(express.json());

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));
app.use('/', express.static('public'));


// const razorPay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
//   });
  
//   app.post('/razorpay', (req, res) => {
//   razorPay.orders.create({
//   amount,
//   currency,
//   receipt,
//   payment_capture,
//   });
// });

// Mount Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Sanitize Data
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution Attack
app.use(hpp());

// Upload
app.use('/api/uploads*', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/uploads' + req.params[0]);
    

  } catch (error) {
    next();
  }
});

app.use('/*', (req, res, next) => {
  try {
      res.sendFile(__dirname + '/public/index.html')
  } catch (error) {
      next();
  }
})

// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = 'Not Found';
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    error,
  });
});

module.exports = app;
