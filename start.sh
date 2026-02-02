#!/bin/bash

# Startup script for Thronglet Society Application

echo "Starting Thronglet Society Application..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies"
        exit 1
    fi
fi

# Start the application
echo "Starting server..."
node server.js