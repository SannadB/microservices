const express = require('express');
const dotenv = require('dotenv');
const { initDb } = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors'); // Import cors

dotenv.config();

const app = express();
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

const startApp = async () => {
  await initDb();
  await connectRabbitMQ();
};

startApp();

module.exports = app;
