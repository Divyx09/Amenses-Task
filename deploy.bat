@echo off
echo Starting Ameneses frontend deployment...

REM Navigate to frontend directory
cd frontend

REM Install dependencies
echo Installing dependencies...
call npm install

REM Build the project
echo Building the project...
call npm run build

echo Build completed successfully!
echo You can now deploy the 'build' folder to your hosting service.

pause
