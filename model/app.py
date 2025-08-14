# app.py

from flask import Flask, request, jsonify                # (1)
from flask_cors import CORS                              # (2)
import joblib                                            # (3)
import pandas as pd                                      # (4)
import numpy as np                                       # (5)

# (6) Inisialisasi Flask + aktifkan CORS supaya bisa di‐fetch dari Next.js/React
app = Flask(__name__)
CORS(app)

# (7) Load model yang kamu simpan: perhatikan namanya "rice_model.jolib"
MODEL_PATH = 'rice_model.joblib'
model = joblib.load(MODEL_PATH)
print(f"✅ Model ter‐load dari {MODEL_PATH}")

# (8) Ambil daftar feature yang dipakai di training (hasil one‐hot encoding)
#    Ini memungkinkan kita meng‐reindex DataFrame input agar kolomnya sama
FEATURE_NAMES = model.feature_names_in_
print("▶️ Feature names:", FEATURE_NAMES)

@app.route('/')
def home():
    return "Welcome to the Flask API!"


@app.route('/predict', methods=['POST'])
def predict():
    # Baca JSON body (data yang dikirimkan)
    data = request.get_json()
    
    # Jika data kosong, kembalikan error
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    predictions = []
    
    # Proses setiap item dalam data (misalnya list of dicts)
    for entry in data:
        # Pastikan semua field yang diperlukan ada
        required = ['SOIL TYPE', 'REGION', 'TEMPERATURE', 'WEATHER CONDITION']
        if any(k not in entry for k in required):
            return jsonify({'error': f'Missing one of fields {required}'}), 400

        # Buat DataFrame dari setiap entry dalam data
        df = pd.DataFrame([{
            'SOIL TYPE': entry['SOIL TYPE'],
            'REGION': entry['REGION'],
            'TEMPERATURE': entry['TEMPERATURE'],
            'WEATHER CONDITION': entry['WEATHER CONDITION'],
        }])

        # One-hot encoding dan penyesuaian kolom
        df_encoded = pd.get_dummies(df, columns=['SOIL TYPE', 'REGION', 'WEATHER CONDITION'])
        df_encoded = df_encoded.reindex(columns=FEATURE_NAMES, fill_value=0)

        # Konversi ke numpy array
        x = df_encoded.to_numpy()

        # Lakukan prediksi
        try:
            y_pred = model.predict(x)  # prediksi model
            all_tree_preds = np.stack([t.predict(x) for t in model.estimators_], axis=0)
            confidence = float(all_tree_preds.std())  # standar deviasi dari prediksi model
            predictions.append({
                'prediction': y_pred.tolist(),
                'confidence': confidence,
                'date': entry['DATE TIME'] 
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    # Kembalikan semua prediksi dalam satu response
    return jsonify(predictions)


# (17) Run server di port 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)



 