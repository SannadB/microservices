const express = require('express');
const dotenv = require('dotenv');
const { initDb } = require('./config/database');
const { connectRabbitMQ } = require('./config/rabbitmq');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

const startApp = async () => {
  await initDb();
  await connectRabbitMQ();
};

startApp();

module.exports = app;
