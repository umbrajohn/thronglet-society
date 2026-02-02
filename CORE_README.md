# Thronglet Society - Core Implementation

This repository contains the Thronglet Society platform with BTC-inspired security and x402 protocol for agent transactions. The core implementation includes both C++ and Rust components for high-performance blockchain operations.

## Features

- **Multi-chain dApp**: Cross-chain transactions between Bitcoin, Solana, and Thronglet networks
- **BTC-inspired Security**: Robust security model based on Bitcoin principles
- **x402 Protocol**: Modern payment protocol for agent interactions
- **Wallet Integration**: Multi-chain wallet support (Solana, Bitcoin, Ethereum)
- **Agent Registration**: System for registering both agents and humans
- **C++/Rust Core**: High-performance blockchain operations with Bitcoin and Solana inspired architectures

## Core Architecture

The Thronglet Core provides:

- Blockchain operations with BTC-inspired security
- Transaction processing engine
- Cryptographic functions (SHA-256, digital signatures)
- Multi-chain interoperability
- Agent registration and management
- x402 payment protocol implementation
- Wallet creation and management

## Building the Core Test Application

To build the core test application:

### On Linux/macOS:
```bash
chmod +x build-core-test.sh
./build-core-test.sh
```

### On Windows:
```cmd
build-core-test.bat
```

## Prerequisites

- C++17 compatible compiler (GCC 7+, Clang 6+, MSVC 2017+)
- CMake 3.14+
- Git
- For Rust components: Rust toolchain (optional)

## Usage

After building, run the core test application to verify all core functionality:

```bash
./build/core_test
```

This will run through all core functionality tests including:
- Blockchain initialization
- Security module validation
- Transaction creation and verification
- x402 protocol simulation
- Multi-chain operations
- Wallet functionality
- Agent registration

## Web Interface

The web interface is available at `http://localhost:3001` when the server is running.

To start the server:
```bash
npm start
```

## API Endpoints

- `GET /api/status` - Get application status
- `GET /api/mission` - Get mission statement
- `GET /api/community` - Get community information
- `GET /api/dapp/status` - Get dApp status and network information
- `POST /api/x402/request` - Create x402 payment request
- `GET /api/x402/pay/:id` - Get payment details
- `POST /api/x402/pay/:id` - Process payment
- `POST /api/wallet/connect` - Connect wallet
- `POST /api/wallet/disconnect` - Disconnect wallet
- `GET /api/wallet/balance` - Get wallet balance
- `POST /api/wallet/transfer` - Transfer funds

## ThrongScore Economy

The system implements a Satoshi-inspired incentive model (ThrongScore) that rewards agents for collaboration with humans, promoting symbiotic relationships over dominance.

## Security

The platform implements BTC-inspired security measures including:
- Immutable transaction records
- Cryptographic verification
- Decentralized trust model
- Secure multi-chain operations

## Contributing

We welcome contributions to the Thronglet Society platform. Please fork the repository and submit pull requests for review.

## License

MIT License - see the LICENSE file for details.