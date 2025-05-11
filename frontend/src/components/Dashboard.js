import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [metrics, setMetrics] = useState({
    voltage: 230,
    current: 50,
    temperature: 45,
    load: 75,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Voltage',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        voltage: prev.voltage + (Math.random() - 0.5) * 2,
        current: prev.current + (Math.random() - 0.5) * 1,
        temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
        load: prev.load + (Math.random() - 0.5) * 1,
      }));

      // Update chart data
      setChartData(prev => {
        const newLabels = [...prev.labels, new Date().toLocaleTimeString()];
        const newData = [...prev.datasets[0].data, metrics.voltage];
        
        if (newLabels.length > 20) {
          newLabels.shift();
          newData.shift();
        }

        return {
          labels: newLabels,
          datasets: [{
            ...prev.datasets[0],
            data: newData,
          }],
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Voltage" value={metrics.voltage.toFixed(1)} unit="V" />
        <MetricCard title="Current" value={metrics.current.toFixed(1)} unit="A" />
        <MetricCard title="Temperature" value={metrics.temperature.toFixed(1)} unit="°C" />
        <MetricCard title="Load" value={metrics.load.toFixed(1)} unit="%" />
      </div>

      {/* Voltage Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Voltage Trend</h2>
        <Line data={chartData} options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        }} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, unit }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-indigo-600">
        {value}
        <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );
}

export default Dashboard; 