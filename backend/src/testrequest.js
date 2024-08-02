const axios = require('axios');

// Fonction pour obtenir une prédiction
async function getPrediction() {
    try {
        // Envoyer une requête POST à l'API
        const response = await axios.post('http://localhost:3000/predict', {
            input: {
                ActivityGroup: 1,         
                NaceVersion: 1,           
                NaceCode: 1,           
                JuridicalSituation: 1,    
                TypeOfEnterprise: 1       
            }
        });
        // Afficher la réponse de l'API
        console.log('Réponse du serveur:', response.data);
    } catch (error) {
        // Gérer les erreurs potentielles
        console.error('Erreur lors de la requête:', error.response ? error.response.data : error.message);
    }
}

// Exécuter la fonction pour envoyer la requête
getPrediction();
