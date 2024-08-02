import sys
import pickle
import json
import numpy as np
import os

# Chemin vers le modèle Pickle
model_path = os.path.join(os.getcwd(), 'random_forest_model.pkl')

# Charger le modèle Pickle
try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
except Exception as e:
    print(f"Erreur lors du chargement du modèle : {e}")
    sys.exit(1)

# Debug: Print received arguments
print(f"Arguments reçus : {sys.argv}")

# Recevoir les données d'entrée depuis la ligne de commande
try:
    input_str = sys.argv[1]
    print(f"Chaîne d'entrée : {input_str}")  # Print the raw input string
    input_data = json.loads(input_str)
    print(f"Données d'entrée : {input_data}")
except json.JSONDecodeError as e:
    print(f"Erreur JSON : {e}")
    sys.exit(1)
except Exception as e:
    print(f"Erreur lors du traitement des arguments : {e}")
    sys.exit(1)

# Convertir les données d'entrée en tableau NumPy
try:
    input_array = np.array(input_data).reshape(1, -1)
    print(f"Entrées pour la prédiction : {input_array}")

    # Effectuer la prédiction
    prediction = model.predict(input_array)
    print(f"Prédiction : {prediction}")

    # Retourner la prédiction
    print(json.dumps(prediction.tolist()))
except Exception as e:
    print(f"Erreur lors de la prédiction : {e}")
    sys.exit(1)
