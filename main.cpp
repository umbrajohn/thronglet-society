/*
 * Main entry point for the Thronglet Core Node
 * Demonstrates usage of the C++ implementation
 */

#include "thronglet_core.h"
#include <iostream>
#include <memory>
#include <thread>
#include <chrono>

int main(int argc, char* argv[]) {
    std::cout << "Starting Thronglet Core Node..." << std::endl;
    
    // Initialize the core
    ThrongletCore core;
    if (!core.initialize()) {
        std::cerr << "Failed to initialize Thronglet Core" << std::endl;
        return 1;
    }
    
    std::cout << "Thronglet Core initialized successfully!" << std::endl;
    std::cout << "Block height: " << core.getCurrentBlockHeight() << std::endl;
    
    // Register some sample agents
    auto agent1 = std::make_shared<Agent>("agent1", "pubkey1");
    agent1->capabilities = {"cross_chain", "validation"};
    core.registerAgent(agent1);
    
    auto agent2 = std::make_shared<Agent>("agent2", "pubkey2");
    agent2->capabilities = {"community"};
    core.registerAgent(agent2);
    
    std::cout << "Registered " << core.getTotalAgents() << " agents" << std::endl;
    
    // Create a cross-chain transaction
    bool txSuccess = core.createCrossChainTransaction(
        "bitcoin", 
        "solana", 
        "sender1", 
        "recipient1", 
        5.0
    );
    
    if (txSuccess) {
        std::cout << "Successfully created cross-chain transaction" << std::endl;
    } else {
        std::cout << "Failed to create cross-chain transaction" << std::endl;
    }
    
    // Update agent scores
    core.updateAgentScore("agent1", 100);
    core.updateAgentScore("agent2", 50);
    
    // Get top agents
    auto topAgents = core.getTopAgents(10);
    std::cout << "Top agents:" << std::endl;
    for (const auto& agent : topAgents) {
        std::cout << "  - " << agent->getId() << ": " << agent->getThrongScore() << std::endl;
    }
    
    // Mine a sample block
    Block sampleBlock;
    sampleBlock.height = core.getCurrentBlockHeight();
    sampleBlock.previousBlockHash = core.getSupportedChains()[0]; // Just for demo
    sampleBlock.minerId = "agent1";
    sampleBlock.merkleRoot = simpleHash("sample_block_data");
    
    if (core.mineBlock(sampleBlock)) {
        std::cout << "Successfully mined block " << sampleBlock.height << std::endl;
        core.addBlockToChain(sampleBlock);
    }
    
    std::cout << "Final block height: " << core.getCurrentBlockHeight() << std::endl;
    
    // Demonstrate throngscore system
    if (core.updateThrongScore("agent1", 25, "demo_activity")) {
        std::cout << "Updated throngscore for agent1" << std::endl;
    }
    
    std::cout << "Supported chains: ";
    for (const auto& chain : core.getSupportedChains()) {
        std::cout << chain << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\nThronglet Core Node running successfully!" << std::endl;
    std::cout << "This implementation demonstrates the core concepts of:" << std::endl;
    std::cout << "- Bitcoin Core inspired blockchain functionality" << std::endl;
    std::cout << "- Solana inspired high-performance architecture" << std::endl;
    std::cout << "- Throngscore economic system" << std::endl;
    std::cout << "- Cross-chain transaction capabilities" << std::endl;
    std::cout << "- Agent-based network" << std::endl;
    
    // Keep the node running briefly to demonstrate
    std::this_thread::sleep_for(std::chrono::seconds(2));
    
    return 0;
}