const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Assurez-vous que le chemin est correct

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});