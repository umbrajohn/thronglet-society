/*
 * Thronglet Core - C++ Implementation
 * Based on Bitcoin Core and Solana Core architectures
 * Implements the "throngscore" economy system
 */

#ifndef THRONGLET_CORE_H
#define THRONGLET_CORE_H

#include <vector>
#include <string>
#include <map>
#include <memory>
#include <cstdint>
#include <chrono>
#include <mutex>

// Forward declarations
class Agent;
class Transaction;
class Block;
class NetworkManager;
class ThrongScoreManager;

/**
 * @brief Core Thronglet Network Implementation
 * Based on Bitcoin Core and Solana Core architectures
 */
class ThrongletCore {
public:
    ThrongletCore();
    ~ThrongletCore();

    // Network initialization
    bool initialize();
    bool connectToBitcoinNetwork(const std::string& endpoint);
    bool connectToSolanaNetwork(const std::string& endpoint);

    // Core blockchain operations
    bool processTransaction(const Transaction& tx);
    bool mineBlock(Block& block);
    bool validateBlock(const Block& block);
    bool addBlockToChain(Block& block);

    // Agent management
    bool registerAgent(std::shared_ptr<Agent> agent);
    bool updateAgentScore(const std::string& agentId, int scoreDelta);
    std::vector<std::shared_ptr<Agent>> getTopAgents(int count = 10) const;

    // Cross-chain operations
    bool createCrossChainTransaction(
        const std::string& fromChain, 
        const std::string& toChain,
        const std::string& sender,
        const std::string& recipient,
        double amount
    );

    // ThrongScore system
    int getThrongScore(const std::string& agentId) const;
    bool updateThrongScore(const std::string& agentId, int scoreDelta, const std::string& reason);

    // Network operations
    void broadcastTransaction(const Transaction& tx);
    void requestPeers();
    void syncWithNetwork();

    // Getters
    uint64_t getCurrentBlockHeight() const { return blockHeight; }
    int getTotalAgents() const { return agents.size(); }
    std::vector<std::string> getSupportedChains() const;

private:
    // Core state
    uint64_t blockHeight;
    std::vector<Block> chain;
    std::map<std::string, std::shared_ptr<Agent>> agents;
    std::map<std::string, int> throngScores;  // The "throngscore" system
    
    // Network managers
    std::unique_ptr<NetworkManager> bitcoinNetwork;
    std::unique_ptr<NetworkManager> solanaNetwork;
    std::unique_ptr<ThrongScoreManager> scoreManager;
    
    // Threading and synchronization
    mutable std::mutex coreMutex;
    
    // Configuration
    bool initialized;
    std::string dataDir;
};

/**
 * @brief Agent representation in the Thronglet network
 * Inspired by Bitcoin's decentralized approach and Solana's validator system
 */
class Agent {
public:
    Agent(const std::string& id, const std::string& publicKey);
    
    std::string getId() const { return id; }
    std::string getPublicKey() const { return publicKey; }
    int getThrongScore() const { return throngScore; }
    std::chrono::time_point<std::chrono::system_clock> getLastActivity() const { return lastActivity; }
    
    void setThrongScore(int score) { 
        std::lock_guard<std::mutex> lock(mutex);
        throngScore = score; 
        lastActivity = std::chrono::system_clock::now();
    }
    
    void incrementThrongScore(int delta) { 
        std::lock_guard<std::mutex> lock(mutex);
        throngScore += delta; 
        lastActivity = std::chrono::system_clock::now();
    }
    
    // Capabilities that determine agent functionality
    std::vector<std::string> capabilities;
    bool supportsCrossChain() const;
    bool canValidateBlocks() const;
    
private:
    std::string id;
    std::string publicKey;
    int throngScore;
    std::chrono::time_point<std::chrono::system_clock> lastActivity;
    mutable std::mutex mutex;
};

/**
 * @brief Cross-chain transaction structure
 * Combines concepts from Bitcoin transactions and Solana's high-throughput design
 */
class Transaction {
public:
    Transaction();
    
    std::string txId;
    std::string fromChain;      // Source chain (bitcoin, solana, thronglet)
    std::string toChain;        // Destination chain (bitcoin, solana, thronglet)
    std::string sender;         // Sender address
    std::string recipient;      // Recipient address
    double amount;              // Amount to transfer
    double fee;                 // Transaction fee
    uint64_t timestamp;         // Unix timestamp
    std::vector<uint8_t> signature;  // Digital signature
    std::string memo;           // Optional memo field
    
    // Validation methods
    bool isValid() const;
    bool verifySignature() const;
    double calculateFee() const;
};

/**
 * @brief Block structure for the Thronglet blockchain
 * Inspired by Bitcoin's block structure with Solana's performance considerations
 */
class Block {
public:
    Block();
    
    uint64_t height;                    // Block height
    std::string hash;                   // Block hash
    std::string previousBlockHash;      // Previous block hash
    uint64_t timestamp;                 // Unix timestamp
    uint32_t nonce;                     // Proof of work nonce
    std::string merkleRoot;             // Merkle root of transactions
    std::vector<Transaction> transactions;  // Transactions in this block
    std::string minerId;                // ID of the agent that mined this block
    
    // Block validation
    bool isValid() const;
    std::string calculateHash() const;
    bool verifyProofOfWork(uint32_t difficulty) const;
    
    // Serialization
    std::vector<uint8_t> serialize() const;
    bool deserialize(const std::vector<uint8_t>& data);
};

/**
 * @brief ThrongScore Manager
 * Economic system inspired by Satoshi's incentive model
 */
class ThrongScoreManager {
public:
    ThrongScoreManager();
    
    // Update an agent's throngscore based on activities
    bool updateScore(const std::string& agentId, int scoreDelta, const std::string& reason);
    
    // Calculate throngscore based on contributions
    int calculateScore(const std::string& agentId, const std::string& activityType, int baseValue);
    
    // Distribute rewards based on throngscores
    std::vector<std::pair<std::string, double>> calculateRewards(double totalReward) const;
    
    // Get ranking of agents by throngscore
    std::vector<std::pair<std::string, int>> getRankings(int limit = 100) const;
    
private:
    std::map<std::string, int> scores;
    std::map<std::string, std::vector<int>> historicalScores;  // For trend analysis
    mutable std::mutex mutex;
    
    // Scoring weights for different activities
    static constexpr double TRANSACTION_WEIGHT = 1.0;
    static constexpr double VALIDATION_WEIGHT = 5.0;
    static constexpr double CROSS_CHAIN_WEIGHT = 10.0;
    static constexpr double COMMUNITY_WEIGHT = 3.0;
};

#endif // THRONGLET_CORE_H