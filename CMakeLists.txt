cmake_minimum_required(VERSION 3.14)
project(thronglet_core VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add compiler flags for security and performance
if(MSVC)
    add_compile_options(/W4 /permissive-)
else()
    add_compile_options(-Wall -Wextra -Wpedantic -O2)
endif()

# Find required packages
find_package(Threads REQUIRED)

# Define the main library
add_library(thronglet_core
    thronglet_core.cpp
)

# Link required libraries
target_link_libraries(thronglet_core
    Threads::Threads
)

# Define the main executable
add_executable(thronglet_node
    main.cpp
    thronglet_core.cpp
)

# Define the core test executable
add_executable(core_test
    core_test.cpp
    thronglet_core.cpp
)

# Link libraries to the executables
target_link_libraries(thronglet_node
    thronglet_core
    Threads::Threads
)

target_link_libraries(core_test
    thronglet_core
    Threads::Threads
)

# Installation rules
install(TARGETS thronglet_node
    RUNTIME DESTINATION bin
)

install(FILES thronglet_core.h
    DESTINATION include
)

# Export package configuration
set_target_properties(thronglet_core PROPERTIES
    PUBLIC_HEADER thronglet_core.h
)

# Create a pkg-config file
configure_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/thronglet_core.pc.in"
    "${CMAKE_CURRENT_BINARY_DIR}/thronglet_core.pc"
    @ONLY
)

install(FILES "${CMAKE_CURRENT_BINARY_DIR}/thronglet_core.pc"
    DESTINATION lib/pkgconfig
)

# Enable testing if needed
include(CTest)
enable_testing()

# Add a simple test
add_test(NAME thronglet_core_test
    COMMAND thronglet_node --test
)