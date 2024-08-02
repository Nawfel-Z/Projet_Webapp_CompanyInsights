const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Connexion à MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  }
  console.log('Connecté à MongoDB');
});

const db = client.db('WEBAPP'); // Remplacez par le nom de votre base de données
const collection = db.collection('entreprise'); // Remplacez par le nom de votre collection

router.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API!');
});

router.post('/data', (req, res) => {
  const data = req.body;
  res.send(`Vous avez envoyé: ${JSON.stringify(data)}`);
});

// Get par code postal
// Route pour obtenir des données par code postal
router.get('/data/zipcode/:Zipcode', async (req, res) => {
  const Zipcode = req.params.Zipcode;
  console.log(`Recherche de données pour les entreprises avec le zipcode: ${Zipcode}`);

  try {
    const result = await collection.find({ Zipcode: Zipcode }, { projection: { Denomination: 1, _id: 0 } }).toArray();
    console.log('Résultat de la recherche:', result);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Aucune donnée trouvée pour ce code postal');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});

// Get par EnterpriseNumber
router.get('/data/siren/:EnterpriseNumber', async (req, res) => {
  const EnterpriseNumber = req.params.EnterpriseNumber;
  console.log(`Recherche de données pour EnterpriseNumber: ${EnterpriseNumber}`);

  try {
    const result = await collection.findOne({ EnterpriseNumber: EnterpriseNumber });
    console.log('Résultat de la recherche:', result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Aucune donnée trouvée pour cette entreprise');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});


// Get par nom

router.get('/data/name/:Denomination', async (req, res) => {
  const Denomination = req.params.Denomination;
  console.log(`Recherche de données pour EnterpriseNumber: ${Denomination}`);

  try {
    const result = await collection.findOne({ Denomination: Denomination });
    console.log('Résultat de la recherche:', result);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Aucune donnée trouvée pour cette entreprise');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});


// get par statsu
router.get('/data/status/:Status', async (req, res) => {
  const Status = req.params.Status;
  console.log(`Recherche de données pour les entreprises avec le statut: ${Status}`);

  try {
    const result = await collection.find({ Status: Status }).toArray();
    console.log('Résultat de la recherche:', result);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Aucune donnée trouvée pour ce statut');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});

// get par Classification
router.get('/data/classification/:Classification', async (req, res) => {
  const Classification = req.params.Classification;
  console.log(`Recherche de données pour les entreprises : ${Classification}`);

  try {
    const result = await collection.find({ Classification: Classification }).toArray();
    console.log('Résultat de la recherche:', result);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Aucune donnée trouvée pour ce statut');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});

// get par Municipality
router.get('/data/municipality/:MunicipalityFR', async (req, res) => {
  const MunicipalityFR = req.params.MunicipalityFR;
  console.log(`Recherche de données pour les entreprises situées : ${MunicipalityFR}`);

  try {
    const result = await collection.find({ MunicipalityFR: MunicipalityFR }).toArray();
    console.log('Résultat de la recherche:', result);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Aucune donnée trouvée dans cette muni');
    }
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});




router.get('/data/all', async (req, res) => {
  try {
    const results = await collection.find({}).toArray();
    console.log('Résultat de la recherche:', results);
    res.status(200).json(results);
  } catch (err) {
    console.error('Erreur lors de la récupération des données:', err);
    res.status(500).send('Erreur serveur');
  }
});



module.exports = router;