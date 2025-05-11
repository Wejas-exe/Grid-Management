import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function Monitoring() {
  const [metrics, setMetrics] = useState({
    voltage: [],
    current: [],
    temperature: [],
    load: [],
    timestamps: [],
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const newVoltage = 230 + (Math.random() - 0.5) * 10;
      const newCurrent = 50 + (Math.random() - 0.5) * 5;
      const newTemperature = 45 + (Math.random() - 0.5) * 3;
      const newLoad = 75 + (Math.random() - 0.5) * 5;

      setMetrics(prev => {
        const newMetrics = {
          voltage: [...prev.voltage, newVoltage].slice(-20),
          current: [...prev.current, newCurrent].slice(-20),
          temperature: [...prev.temperature, newTemperature].slice(-20),
          load: [...prev.load, newLoad].slice(-20),
          timestamps: [...prev.timestamps, timestamp].slice(-20),
        };

        // Check for alerts
        if (newVoltage < 215 || newVoltage > 245) {
          addAlert('Voltage out of range', 'warning');
        }
        if (newTemperature > 80) {
          addAlert('High temperature detected', 'danger');
        }
        if (newLoad > 90) {
          addAlert('High load detected', 'warning');
        }

        return newMetrics;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addAlert = (message, type) => {
    setAlerts(prev => [
      {
        id: Date.now(),
        message,
        type,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ].slice(0, 5)); // Keep only last 5 alerts
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const createChartData = (label, data, color) => ({
    labels: metrics.timestamps,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        tension: 0.1,
      },
    ],
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Real-time Monitoring</h1>

      {/* Alerts Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
        <div className="space-y-2">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-md ${
                alert.type === 'danger' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              <div className="flex justify-between">
                <span>{alert.message}</span>
                <span className="text-sm">{alert.timestamp}</span>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-gray-500">No active alerts</p>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Voltage & Current</h2>
          <Line
            data={createChartData('Voltage', metrics.voltage, 'rgb(75, 192, 192)')}
            options={chartOptions}
          />
          <Line
            data={createChartData('Current', metrics.current, 'rgb(255, 99, 132)')}
            options={chartOptions}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Temperature & Load</h2>
          <Line
            data={createChartData('Temperature', metrics.temperature, 'rgb(255, 159, 64)')}
            options={chartOptions}
          />
          <Line
            data={createChartData('Load', metrics.load, 'rgb(153, 102, 255)')}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Monitoring; 