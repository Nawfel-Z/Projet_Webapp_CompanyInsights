const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    // Récupérer les données d'entrée de la requête
    const inputData = req.body.input;
    
    // S'assurer que toutes les caractéristiques sont fournies
    const requiredFields = ['ActivityGroup', 'NaceVersion', 'NaceCode', 'JuridicalSituation', 'TypeOfEnterprise'];
    const missingFields = requiredFields.filter(field => !(field in inputData));

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Champs manquants : ${missingFields.join(', ')}` });
    }

    const inputArray = [
        inputData.ActivityGroup,
        inputData.NaceVersion,
        inputData.NaceCode,
        inputData.JuridicalSituation,
        inputData.TypeOfEnterprise
    ];

    const inputStr = JSON.stringify(inputArray);

    exec(`python3 predict.py '${inputStr}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur : ${error.message}`);
            return res.status(500).send(error.message);
        }
        if (stderr) {
            console.error(`Erreur standard : ${stderr}`);
            return res.status(500).send(stderr);
        }
        console.log(`Prédiction : ${stdout}`);
        const prediction = JSON.parse(stdout);
        res.json({ prediction });
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
