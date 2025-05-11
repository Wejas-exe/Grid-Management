import pandas as pd
import numpy as np

def simulate_grid_data(num_samples=1000, failure_rate=0.1):
    np.random.seed(42)

    voltage = np.random.normal(loc=230, scale=10, size=num_samples)
    current = np.random.normal(loc=50, scale=15, size=num_samples)
    temperature = np.random.normal(loc=50, scale=20, size=num_samples)
    load = np.random.uniform(low=10, high=110, size=num_samples)

    # Basic logic for failure label
    failure_status = []
    for i in range(num_samples):
        if (temperature[i] > 80 and load[i] > 90) or (voltage[i] < 215 or voltage[i] > 245):
            failure_status.append(1 if np.random.rand() < failure_rate else 0)
        else:
            failure_status.append(0)

    df = pd.DataFrame({
        "voltage": voltage,
        "current": current,
        "temperature": temperature,
        "load": load,
        "failure_status": failure_status
    })

    df.to_csv("simulated_grid_data.csv", index=False)
    print(f"[INFO] Simulated dataset created with {num_samples} samples.")

if __name__ == "__main__":
    simulate_grid_data()
