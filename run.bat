@echo off
REM Food Tracker Quick Start Script for Windows

echo.
echo 🍎 Food Tracker - Quick Start
echo =============================
echo.

REM Check Java installation
echo Checking Java installation...
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Java is not installed. Please install Java 17 or higher.
    echo    Visit: https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)

for /f tokens^=2 %%j in ('java -version 2^>^&1 ^| grep version') do (
    set JAVA_VERSION=%%j
)
echo ✓ Java found

REM Check Maven installation
echo Checking Maven installation...
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Maven is not installed. Please install Maven 3.6 or higher.
    echo    Visit: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo ✓ Maven found
echo.

REM Build the project
echo Building project...
echo (This may take a few minutes on first run)
echo.

call mvn clean install -q -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed. Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ✓ Build successful!
echo.
echo 🚀 Starting Food Tracker...
echo.
echo The application will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the application
echo.

call mvn spring-boot:run
pause
