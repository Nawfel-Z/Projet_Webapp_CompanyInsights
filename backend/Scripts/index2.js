const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    const inputData = req.body.input;
    
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

    // Log the input string for debugging
    console.log(`Input string sent to Python: ${inputStr}`);

    const pythonProcess = spawn('python3', ['predict.py', inputStr]);

    let dataBuffer = '';

    pythonProcess.stdout.on('data', (data) => {
        dataBuffer += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Erreur Python : ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Processus Python terminé avec le code ${code}`);
            return res.status(500).send(`Processus Python terminé avec le code ${code}`);
        }

        try {
            const prediction = JSON.parse(dataBuffer);
            res.json({ prediction });
        } catch (err) {
            console.error('Erreur de parsing JSON :', err);
            res.status(500).send('Erreur de parsing JSON');
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});