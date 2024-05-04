import datetime
from collections import defaultdict
from tinydb import TinyDB
import matplotlib.pyplot as plt

# Load data from TinyDB database
db = TinyDB('./database/telemetry.json')
visitors = db.all()

# Dictionary to store visitors per day
visitors_per_day = defaultdict(int)

# Convert string to datetime object and count visitors per day
for visitor in visitors:
    time_str = visitor['time']

    # Truncate milliseconds
    time_str = time_str.split('.')[0]

    time_dt = datetime.datetime.strptime(time_str, '%Y-%m-%d %H:%M:%S')
    date_str = time_dt.strftime('%Y-%m-%d')
    visitors_per_day[date_str] += 1

# Extract dates and visitor counts for plotting
dates = list(visitors_per_day.keys())
visitor_counts = list(visitors_per_day.values())

# Convert dates to datetime objects for sorting
dates = [datetime.datetime.strptime(date, '%Y-%m-%d') for date in dates]

# Sort dates and visitor counts
sorted_indices = sorted(range(len(dates)), key=lambda i: dates[i])
dates = [dates[i] for i in sorted_indices]
visitor_counts = [visitor_counts[i] for i in sorted_indices]

# Plot the graph
plt.figure(figsize=(10, 6))
plt.plot(dates, visitor_counts, marker='o', linestyle='-')
plt.title('Visitors per Day')
plt.xlabel('Date')
plt.ylabel('Number of Visitors')
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()
plt.show()
