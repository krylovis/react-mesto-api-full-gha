require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017',
} = process.env;
const routes = require('./routes');

mongoose.connect(`${MONGO_URL}/mestodb`);

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
