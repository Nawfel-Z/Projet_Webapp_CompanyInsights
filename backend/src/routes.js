// routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API!');
});

router.post('/data', (req, res) => {
  const data = req.body;
  res.send(`Vous avez envoyé: ${JSON.stringify(data)}`);
});

module.exports = router;
