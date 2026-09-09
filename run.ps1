# Student Registration Platform - Run Script for Windows
# This PowerShell script starts both backend and frontend servers

param(
    [switch]$Detach  # Run servers in background
)

$ErrorActionPreference = "Stop"

$projectRoot = "C:\Users\Tempo\student-registration-platform"
$backendDir = Join-Path $projectRoot "backend"
$frontendDir = Join-Path $projectRoot "frontend"

Write-Host "=== Student Registration Platform ===" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Node.js not installed." -ForegroundColor Red
    exit 1
}
Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green

# Install dependencies if needed
if (-not (Test-Path (Join-Path $backendDir "node_modules"))) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location $backendDir
    npm install | Out-Null
}
Write-Host "  Backend dependencies: OK" -ForegroundColor Green

if (-not (Test-Path (Join-Path $frontendDir "node_modules"))) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location $frontendDir
    npm install | Out-Null
}
Write-Host "  Frontend dependencies: OK" -ForegroundColor Green

Write-Host ""

# Start backend server
Write-Host "=== Starting Backend Server ===" -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Tempo\student-registration-platform\backend"
    node server.js
}
Start-Sleep -Seconds 2
Write-Host "  Backend: http://localhost:5000" -ForegroundColor Green

# Start frontend dev server
Write-Host "=== Starting Frontend Dev Server ===" -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Tempo\student-registration-platform\frontend"
    npm run dev
}
Start-Sleep -Seconds 3
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Green

Write-Host ""
Write-Host "=== Application Running ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "To stop servers: Stop-Job -Name $backendJob.Name, $frontendJob.Name" -ForegroundColor Gray

if ($Detach) {
    Write-Host ""
    Write-Host "Servers running in background." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Press Ctrl+C to exit..." -ForegroundColor Gray
    try {
        while ($true) { Start-Sleep -Seconds 1 }
    } finally {
        Write-Host "`nStopping servers..." -ForegroundColor Yellow
        $backendJob | Stop-Job
        $frontendJob | Stop-Job
    }
}