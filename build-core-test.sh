#!/bin/bash
# Build script for Thronglet Core Test Application

echo "Building Thronglet Core Test Application..."

# Create build directory if it doesn't exist
mkdir -p build

# Navigate to build directory
cd build

# Run cmake to generate build files
cmake ..

# Build the project
make

echo "Build completed. Check the build directory for executables."