# Intelligent Grid Management System

An AI-powered system for predictive maintenance and monitoring of power grid components.

## Project Overview

This system uses machine learning to predict potential grid failures and maintenance needs based on real-time sensor data. It provides:

- Real-time monitoring of grid components
- Predictive maintenance alerts
- Failure scenario simulation
- Visualization of grid performance metrics
- Recommended countermeasures for potential issues

## Tech Stack

### Backend
- Python 3.8+
- FastAPI
- Scikit-learn
- XGBoost
- Pandas
- NumPy
- MongoDB

### Frontend
- React.js
- Chart.js
- Tailwind CSS
- Socket.IO (for real-time updates)

## Project Structure

```
intelligent-grid-management/
├── backend/
│   ├── api/
│   ├── ml/
│   ├── models/
│   └── utils/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## Setup Instructions

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## Features

- Real-time grid monitoring
- Predictive maintenance alerts
- Failure scenario simulation
- Performance visualization
- Countermeasure recommendations
- Historical data analysis

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 