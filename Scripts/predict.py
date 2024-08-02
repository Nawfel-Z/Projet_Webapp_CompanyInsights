import sys
import pickle
import json
import numpy as np
import os

# Chemin vers le modèle Pickle
model_path = os.path.join('scripts', 'random_forest_model.pkl')

# Charger le modèle Pickle
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Recevoir les données d'entrée depuis la ligne de commande
input_data = json.loads(sys.argv[1])

# Convertir les données d'entrée en tableau NumPy
input_array = np.array(input_data).reshape(1, -1)

# Effectuer la prédiction
prediction = model.predict(input_array)

# Retourner la prédiction
print(json.dumps(prediction.tolist()))
