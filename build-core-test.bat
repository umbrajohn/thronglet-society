@echo off
REM Build script for Thronglet Core Test Application on Windows

echo Building Thronglet Core Test Application...

REM Create build directory if it doesn't exist
if not exist build mkdir build

REM Navigate to build directory
cd build

REM Run cmake to generate build files
cmake ..

REM Build the project
cmake --build .

echo Build completed. Check the build directory for executables.
pause