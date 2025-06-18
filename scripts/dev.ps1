# PowerShell development script for PollGen AI Monorepo

Write-Host "🚀 Starting PollGen AI Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Build shared package
Write-Host "🔨 Building shared package..." -ForegroundColor Yellow
npm run build --workspace=packages/shared

# Check if .env file exists in server
if (-not (Test-Path "packages/server/.env")) {
    Write-Host "⚠️  Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item "packages/server/.env.example" "packages/server/.env"
    Write-Host "📝 Please update packages/server/.env with your OpenAI API key" -ForegroundColor Cyan
}

# Start development servers
Write-Host "🎯 Starting development servers..." -ForegroundColor Green
Write-Host "📊 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow

# Start both servers concurrently
npm run dev
