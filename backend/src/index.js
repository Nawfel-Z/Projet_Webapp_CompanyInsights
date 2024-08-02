const express = require('express');
const app = express();
const port = 3000;

const connectDB = require('./config');

connectDB();

app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Serveur écoutant sur http://localhost:${port}`);
});