#!/bin/bash

# ModernAgile Integration Test Setup
# This script sets up the modern integration testing environment

set -e  # Exit on any error

echo "🚀 Setting up ModernAgile Integration Tests"
echo "========================================="

# Check if we're in the right directory
if [[ ! -f "../index.html" ]]; then
    echo "❌ Error: This script must be run from the integration-tests directory"
    exit 1
fi

# Install Node.js dependencies
echo "📦 Installing test dependencies..."
npm install

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install

# Verify the main application server script exists
if [[ ! -f "../run" ]]; then
    echo "❌ Error: ../run script not found. Integration tests need the development server."
    exit 1
fi

# Make sure the run script is executable
chmod +x ../run

echo ""
echo "✅ Integration test environment setup complete!"
echo ""
echo "Available commands:"
echo "  npm test                 - Run all integration tests"
echo "  npm run test:headed      - Run tests with visible browser"
echo "  npm run test:debug       - Run tests in debug mode"
echo "  npm run test:ui          - Open Playwright test UI"
echo "  npm run test:report      - View test report"
echo ""
echo "💡 The tests will automatically start your development server"
echo "   Make sure no other server is running on port 8080"
echo ""