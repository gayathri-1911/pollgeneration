#!/bin/bash

# Development script for PollGen AI Monorepo

echo "🚀 Starting PollGen AI Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build shared package
echo "🔨 Building shared package..."
npm run build --workspace=packages/shared

# Check if .env file exists in server
if [ ! -f "packages/server/.env" ]; then
    echo "⚠️  Creating .env file from template..."
    cp packages/server/.env.example packages/server/.env
    echo "📝 Please update packages/server/.env with your OpenAI API key"
fi

# Start development servers
echo "🎯 Starting development servers..."
echo "📊 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Start both servers concurrently
npm run dev
