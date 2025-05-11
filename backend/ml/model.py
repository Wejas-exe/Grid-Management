import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

class GridFailurePredictor:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        self.scaler = StandardScaler()
        self.is_trained = False

    def preprocess_data(self, data):
        """
        Preprocess the input data for prediction
        """
        features = np.array([
            data.voltage,
            data.current,
            data.temperature,
            data.load
        ]).reshape(1, -1)
        
        if self.is_trained:
            features = self.scaler.transform(features)
        
        return features

    def train(self, X, y):
        """
        Train the model on historical data
        """
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
        self.is_trained = True

    def predict(self, data):
        """
        Predict failure probability for new data
        """
        if not self.is_trained:
            # Return default prediction if model is not trained
            return {
                'failure_probability': 0.1,
                'confidence_score': 0.5
            }

        features = self.preprocess_data(data)
        proba = self.model.predict_proba(features)[0]
        failure_prob = proba[1] if len(proba) > 1 else 0.0
        
        # Calculate confidence score based on prediction probability
        confidence = abs(failure_prob - 0.5) * 2  # Scale to 0-1 range
        
        return {
            'failure_probability': float(failure_prob),
            'confidence_score': float(confidence)
        }

    def save_model(self, path='models/grid_predictor.joblib'):
        """
        Save the trained model to disk
        """
        if not self.is_trained:
            raise ValueError("Model must be trained before saving")
        
        os.makedirs(os.path.dirname(path), exist_ok=True)
        joblib.dump({
            'model': self.model,
            'scaler': self.scaler,
            'is_trained': self.is_trained
        }, path)

    def load_model(self, path='models/grid_predictor.joblib'):
        """
        Load a trained model from disk
        """
        if not os.path.exists(path):
            raise FileNotFoundError(f"No model found at {path}")
        
        saved_data = joblib.load(path)
        self.model = saved_data['model']
        self.scaler = saved_data['scaler']
        self.is_trained = saved_data['is_trained'] 