import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Predictions() {
  const [currentMetrics, setCurrentMetrics] = useState({
    voltage: 230,
    current: 50,
    temperature: 45,
    load: 75,
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setCurrentMetrics(prev => ({
        voltage: prev.voltage + (Math.random() - 0.5) * 2,
        current: prev.current + (Math.random() - 0.5) * 1,
        temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
        load: prev.load + (Math.random() - 0.5) * 1,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real application, this would call your backend API
      // const response = await axios.post('http://localhost:8000/api/predict', currentMetrics);
      // setPrediction(response.data);

      // Simulated prediction for demo
      const failureProb = (currentMetrics.temperature > 80 || currentMetrics.voltage < 215) ? 0.15 : 0.05;
      setPrediction({
        failure_probability: failureProb,
        recommended_action: failureProb > 0.1 ? "Monitor closely" : "No action required",
        confidence_score: 0.85
      });
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Failure Predictions</h1>

      {/* Current Metrics */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Current Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricDisplay label="Voltage" value={currentMetrics.voltage.toFixed(1)} unit="V" />
          <MetricDisplay label="Current" value={currentMetrics.current.toFixed(1)} unit="A" />
          <MetricDisplay label="Temperature" value={currentMetrics.temperature.toFixed(1)} unit="°C" />
          <MetricDisplay label="Load" value={currentMetrics.load.toFixed(1)} unit="%" />
        </div>
        <button
          onClick={getPrediction}
          disabled={loading}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          {loading ? 'Analyzing...' : 'Get Prediction'}
        </button>
      </div>

      {/* Prediction Results */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {prediction && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Prediction Results</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Failure Probability:</span>
              <span className={`font-semibold ${
                prediction.failure_probability > 0.1 ? 'text-red-600' : 'text-green-600'
              }`}>
                {(prediction.failure_probability * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recommended Action:</span>
              <span className="font-semibold">{prediction.recommended_action}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Confidence Score:</span>
              <span className="font-semibold">{(prediction.confidence_score * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricDisplay({ label, value, unit }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value}
        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );
}

export default Predictions; 