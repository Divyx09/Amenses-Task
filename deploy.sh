#!/bin/bash

# Deployment script for Ameneses frontend
echo "Starting Ameneses frontend deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"
echo "You can now deploy the 'build' folder to your hosting service."

# Optional: Serve locally to test
# echo "Starting local server to test build..."
# npx serve -s build -l 3000
