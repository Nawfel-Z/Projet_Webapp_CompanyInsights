const { MongoClient } = require('mongodb');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');

// URI de connexion à MongoDB locale (IPv4 localhost)
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function importCSV() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('WEBAPP'); // Remplacez par le nom de votre base de données
    const collection = database.collection('entreprise'); // Remplacez par le nom de votre collection

    // Chemin vers votre fichier CSV
    const basePath = path.join(__dirname, '..', 'convertedData');
    const csvFilePath = path.join(basePath, 'data.csv');

    if (!fs.existsSync(csvFilePath)) {
      console.error('CSV file not found:', csvFilePath);
      return;
    }

    // Convertir le CSV en JSON
    const jsonArray = await csvtojson().fromFile(csvFilePath);
    console.log('CSV converted to JSON');

    if (jsonArray.length === 0) {
      console.error('CSV file is empty or improperly formatted.');
      return;
    }

    // Insérer les documents dans la collection MongoDB
    const result = await collection.insertMany(jsonArray);
    console.log(`${result.insertedCount} documents were inserted`);

  } catch (err) {
    console.error('Error importing CSV:', err);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

importCSV();
