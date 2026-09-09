#!/bin/bash
# This script sets up and runs the Student Registration Platform

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Student Registration Platform Setup ===${NC}"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Node.js is installed: $(node --version)${NC}"
else
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓ npm is installed: $(npm --version)${NC}"
else
    echo -e "${RED}✗ npm is not installed.${NC}"
    exit 1
fi

echo ""

# Backend Setup
echo -e "${YELLOW}=== Setting up Backend ===${NC}"
cd backend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

echo ""

# Frontend Setup
echo -e "${YELLOW}=== Setting up Frontend ===${NC}"
cd ../frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

echo ""
echo -e "${GREEN}=== Setup Complete ===${NC}"
echo ""
echo "To run the application:"
echo "  1. Start backend: cd backend && npm start"
echo "  2. Start frontend: cd frontend && npm run dev"
echo ""
echo "Backend runs on: http://localhost:5000"
echo "Frontend runs on: http://localhost:5173"
echo ""