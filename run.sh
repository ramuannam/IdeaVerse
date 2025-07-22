#!/bin/bash

# Start the Spring Boot backend in the background
echo "Starting Spring Boot backend..."
cd backend && mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
sleep 15

# Start the Vite frontend
echo "Starting Vite frontend..."
cd ..
npm run dev:frontend &
FRONTEND_PID=$!

# Function to cleanup processes on exit
cleanup() {
    echo "Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID