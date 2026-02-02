#include <iostream>
#include "thronglet_core.h"

int main() {
    std::cout << "Thronglet Core Test Application" << std::endl;
    std::cout << "===============================" << std::endl;

    // Initialize the Thronglet Core
    ThrongletCore core;
    
    // Test basic functionality
    std::cout << "\nTesting Thronglet Core functionality:" << std::endl;
    
    // Initialize blockchain
    bool init_result = core.initializeBlockchain();
    std::cout << "Blockchain initialization: " << (init_result ? "SUCCESS" : "FAILED") << std::endl;
    
    // Test security features
    std::cout << "\nTesting BTC-inspired security features:" << std::endl;
    std::cout << "SHA-256 Hashing: " << core.testHashing("Hello, Thronglet Society!") << std::endl;
    
    // Test transaction creation
    std::cout << "\nTesting transaction functionality:" << std::endl;
    Transaction tx = core.createTransaction("sender_pubkey", "recipient_pubkey", 100.50);
    std::cout << "Transaction ID: " << tx.id << std::endl;
    std::cout << "Amount: " << tx.amount << std::endl;
    std::cout << "Timestamp: " << tx.timestamp << std::endl;
    
    // Test signature verification
    std::cout << "\nTesting signature verification:" << std::endl;
    bool sig_valid = core.verifySignature(tx.id, tx.signature, "sender_pubkey");
    std::cout << "Signature verification: " << (sig_valid ? "VALID" : "INVALID") << std::endl;
    
    // Test x402 protocol simulation
    std::cout << "\nTesting x402 protocol simulation:" << std::endl;
    PaymentRequest payment = core.createPaymentRequest(50.25, "SOL", "Test payment for Thronglet services");
    std::cout << "Payment Request ID: " << payment.id << std::endl;
    std::cout << "Amount: " << payment.amount << " " << payment.currency << std::endl;
    std::cout << "Status: " << payment.status << std::endl;
    
    // Test multi-chain operations
    std::cout << "\nTesting multi-chain operations:" << std::endl;
    BlockchainOperation btc_op = core.createBlockchainOperation("bitcoin", "transfer", "{\"from\":\"btc_addr1\",\"to\":\"btc_addr2\",\"amount\":0.1}");
    BlockchainOperation sol_op = core.createBlockchainOperation("solana", "transfer", "{\"from\":\"sol_addr1\",\"to\":\"sol_addr2\",\"amount\":10.5}");
    
    std::cout << "Bitcoin operation: " << btc_op.id << " on " << btc_op.chain << std::endl;
    std::cout << "Solana operation: " << sol_op.id << " on " << sol_op.chain << std::endl;
    
    // Test wallet functionality
    std::cout << "\nTesting wallet functionality:" << std::endl;
    Wallet wallet = core.createWallet();
    std::cout << "Wallet address: " << wallet.address.substr(0, 16) << "..." << std::endl;
    std::cout << "Wallet type: " << wallet.type << std::endl;
    
    // Test agent registration
    std::cout << "\nTesting agent registration:" << std::endl;
    Agent agent = core.registerAgent("TestAgent", "Test agent for core functionality validation");
    std::cout << "Agent ID: " << agent.id << std::endl;
    std::cout << "Agent name: " << agent.name << std::endl;
    std::cout << "Registration status: " << agent.status << std::endl;
    
    // Final status
    std::cout << "\nThronglet Core Test Summary:" << std::endl;
    std::cout << "- Blockchain: " << (core.isBlockchainInitialized() ? "INITIALIZED" : "NOT INITIALIZED") << std::endl;
    std::cout << "- Security Module: " << (core.isSecurityModuleActive() ? "ACTIVE" : "INACTIVE") << std::endl;
    std::cout << "- Transaction Engine: " << (core.isTransactionEngineActive() ? "ACTIVE" : "INACTIVE") << std::endl;
    std::cout << "- x402 Protocol: " << (core.isX402ProtocolActive() ? "ACTIVE" : "INACTIVE") << std::endl;
    
    std::cout << "\nTest completed successfully!" << std::endl;
    
    return 0;
}