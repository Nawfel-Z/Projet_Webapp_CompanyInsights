const express = require('express');
const app = express();
const port = 3000;

const connectDB = require('./config');

connectDB();

app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3001' // Adjust this to your frontend's origin
}));


const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
  console.log(`Serveur écoutant sur http://localhost:${port}`);
});