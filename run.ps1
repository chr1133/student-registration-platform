# Student Registration Platform - Run Script for Windows
# This PowerShell script sets up and runs the application

Write-Host "=== Student Registration Platform Setup ===" -ForegroundColor Yellow
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Node.js is installed: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "Node.js is not installed. Please install Node.js first." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Backend Setup
Write-Host "=== Setting up Backend ===" -ForegroundColor Yellow
Set-Location backend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "Backend dependencies already installed" -ForegroundColor Green
}

Write-Host ""

# Frontend Setup
Write-Host "=== Setting up Frontend ===" -ForegroundColor Yellow
Set-Location "../frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    npm install
} else {
    Write-Host "Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "To run the application:" -ForegroundColor Cyan
Write-Host "  1. Start backend: cd backend; npm start" -ForegroundColor White
Write-Host "  2. Start frontend: cd frontend; npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Backend runs on: http://localhost:5000" -ForegroundColor White
Write-Host "Frontend runs on: http://localhost:5173" -ForegroundColor White
Write-Host ""