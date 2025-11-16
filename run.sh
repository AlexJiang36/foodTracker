#!/bin/bash

# Food Tracker Quick Start Script for macOS/Linux

echo "🍎 Food Tracker - Quick Start"
echo "============================"
echo ""

# Check Java installation
echo "Checking Java installation..."
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    echo "   Visit: https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | grep -oP 'version "\K[^"]*' | head -c 2)
echo "✓ Java version $JAVA_VERSION found"

# Check Maven installation
echo "Checking Maven installation..."
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    echo "   Visit: https://maven.apache.org/download.cgi"
    exit 1
fi

echo "✓ Maven found"
echo ""

# Build the project
echo "Building project..."
echo "(This may take a few minutes on first run)"
echo ""

mvn clean install -q -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "✓ Build successful!"
echo ""
echo "🚀 Starting Food Tracker..."
echo ""
echo "The application will be available at: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

mvn spring-boot:run
