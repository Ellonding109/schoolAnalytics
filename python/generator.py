import pandas as pd
import numpy as np
import os 

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples
n_samples = 100_000

# Generate feature (x): random values between 0 and 100
feature_x = np.random.uniform(0, 100, n_samples)

# Generate target (y) with linear relationship + noise
# y = 2.5 * x + 10 + noise
noise = np.random.normal(0, 5, n_samples)  # Gaussian noise (std=5)
target_y = 2.5 * feature_x + 10 + noise

# Create DataFrame
df = pd.DataFrame({
    'feature_x': feature_x,
    'target_y': target_y
})

# Save to afile ii a folder 
fileName = "pyGenerated.csv"
folderPath = "~/projects/python/generatedFiles"
fullPath = os.path.join(folderPath, fileName)

# expand the user to confirm the full path exist
fullPath = os.path.expanduser(fullPath)
if (fullPath):
    df.to_csv(fullPath)
else:exit()

print("✅ successfully saved as 'pygenerated.csv'\n{}". format(fileName))
print(f"🔢 Shape: {df.shape}")
print("\nFirst 5 rows:")
print(df.head(5))