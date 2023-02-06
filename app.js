const express = require('express');
const morgan = require('morgan');

// Routes
const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const baseRoute = '/api/v1';

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello Api Planner!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// APP Routes
app.get('/api/v1', (req, res) => {
  res.send(`Olá agora são: ${req.requestTime}`);
});

// Main Routes
app.use(`${baseRoute}`, eventRouter);
app.use(`${baseRoute}/users`, userRouter);

module.exports = app;
