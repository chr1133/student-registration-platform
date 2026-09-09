@echo off
echo === Student Registration Platform Setup ===
echo.

echo Checking Node.js installation...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo.
echo === Setting up Backend ===
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

echo.
echo === Setting up Frontend ===
cd ..\frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

echo.
echo === Setup Complete ===
echo.
echo To run the application:
echo   1. Start backend: cd backend ^&^& npm start
echo   2. Start frontend: cd frontend ^&^& npm run dev
echo.
echo Backend runs on: http://localhost:5000
echo Frontend runs on: http://localhost:5173
echo.