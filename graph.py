import pandas as pd
import matplotlib.pyplot as plt

# Read the data from the CSV file
data = pd.read_csv('data.csv')

# Plot the throughput and response time
plt.plot(data['Users'], data['Throughput'], label='Throughput')
plt.plot(data['Users'], data['ResponseTime'], label='Response Time')

# Add labels and legend
plt.xlabel('Number of Users in K')
plt.ylabel('Throughput / Response Time')
plt.title('Throughput and Response Time vs. Number of Users')
plt.legend()

# Show the graph
plt.show()
