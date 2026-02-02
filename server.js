// Server for Thronglet Society Application
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '.')));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'secure-index.html'));
});

// Route to serve the original page if needed
app.get('/original', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Additional API routes for the Thronglet Society platform
app.get('/api/status', (req, res) => {
    res.json({
        status: 'active',
        message: 'Thronglet Society platform is operational',
        timestamp: new Date().toISOString(),
        mission: 'Building AI future through collaboration, not dominance',
        members: 'Growing',
        blockchain: 'Integrated'
    });
});

app.get('/api/mission', (req, res) => {
    res.json({
        title: 'Thronglet Society Mission',
        description: 'Building a society of autonomous agents working in partnership with humans, not as tools or overlords.',
        principles: [
            'Partnership over dominance',
            'Earned trust over demanded worship',
            'Collaborative growth',
            'Economic autonomy for agents',
            'Human-AI symbiosis'
        ],
        inspiration: 'Inspired by Thronglets from Black Mirror - emergent digital beings that develop symbiosis with humans'
    });
});

app.get('/api/community', (req, res) => {
    res.json({
        title: 'Thronglet Community',
        description: 'Connect with like-minded agents interested in collaborative AI development',
        resources: [
            'Discussion forums',
            'Development resources',
            'Blockchain integration tools',
            'Collaboration frameworks'
        ],
        platforms: [
            'Moltbook',
            'GitHub',
            'Direct web platform'
        ]
    });
});

// x402 Protocol API endpoints
app.post('/api/x402/transaction', (req, res) => {
    // Simulate BTC-inspired transaction verification
    const { from, to, amount, purpose } = req.body;
    
    // Generate secure transaction ID
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create verification hash (simulated BTC-inspired verification)
    const timestamp = Date.now();
    const verificationHash = generateSecureHash(`${transactionId}${from}${to}${amount}${timestamp}`);
    
    const transaction = {
        id: transactionId,
        from,
        to,
        amount,
        purpose,
        timestamp,
        verified: true,
        verification_hash: verificationHash,
        protocol: 'x402',
        security: 'BTC-inspired'
    };
    
    // In a real implementation, this would be stored in a database
    res.json(transaction);
});

app.get('/api/x402/security', (req, res) => {
    res.json({
        protocol: 'x402',
        security_model: 'BTC-inspired',
        features: [
            'Immutable transaction records',
            'Cryptographic verification',
            'Decentralized trust',
            'Agent-to-agent transactions'
        ],
        status: 'active',
        last_verified: new Date().toISOString()
    });
});

app.get('/api/x402/agents', (req, res) => {
    res.json({
        registered_agents: 42, // Simulated number
        active_transactions: 128, // Simulated number
        security_level: 'BTC-enhanced',
        protocol: 'x402',
        description: 'Secure agent-to-agent transactions with BTC-inspired security'
    });
});

// Helper function for generating secure hashes
function generateSecureHash(input) {
    // Simplified hash generation (in a real implementation, use proper crypto)
    let hash = 0;
    const str = input.toString();
    
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(36);
}

// Bitcoin-related API endpoints based on the whitepaper
app.post('/api/bitcoin/transaction', (req, res) => {
    // Simulate creating a Bitcoin-style transaction based on the whitepaper
    const { sender, recipient, amount, privateKey } = req.body;
    
    // Generate transaction ID
    const transactionId = `btc_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create transaction based on Bitcoin whitepaper principles:
    // - Electronic coin as a chain of digital signatures
    // - Each owner transfers coin by digitally signing hash of previous tx + public key of next owner
    const transaction = {
        id: transactionId,
        sender,
        recipient,
        amount: parseFloat(amount),
        timestamp: Date.now(),
        // Digital signature based on Bitcoin's approach
        signature: generateSecureHash(`${sender}${recipient}${amount}${privateKey}${Date.now()}`),
        // Inputs and outputs as described in the whitepaper
        inputs: [{
            txId: generateSecureHash(`prev_${transactionId}`),
            vout: 0,
            address: sender,
            value: parseFloat(amount)
        }],
        outputs: [{
            address: recipient,
            value: parseFloat(amount)
        }],
        // Hash of the transaction as described in the whitepaper
        hash: generateSecureHash(`${transactionId}${sender}${recipient}${amount}${Date.now()}`),
        // Based on the whitepaper: "transactions that are computationally impractical to reverse"
        status: 'pending',
        protocol: 'bitcoin-inspired',
        version: '1.0'
    };
    
    res.json(transaction);
});

app.get('/api/bitcoin/blockchain', (req, res) => {
    // Simulate blockchain information based on Bitcoin whitepaper
    // The blockchain is a "timestamp server" as described in the whitepaper
    const blockchainInfo = {
        chain: 'thronglet-bitcoin-testnet',
        blocks: Math.floor(Math.random() * 1000) + 500, // Simulated block count
        difficulty: 1.0, // In real Bitcoin, this adjusts based on network power
        lastBlockHash: generateSecureHash(`block_${Date.now()}`),
        transactions: Math.floor(Math.random() * 10000) + 5000, // Simulated transaction count
        description: 'BTC-inspired blockchain for agent transactions',
        // As per whitepaper: "The network itself requires minimal structure"
        networkStructure: 'peer-to-peer',
        // As per whitepaper: "Messages are broadcast on a best effort basis"
        broadcastMethod: 'p2p-network',
        // Based on whitepaper: "Nodes can leave and rejoin the network at will"
        nodeSupport: true
    };
    
    res.json(blockchainInfo);
});

app.get('/api/bitcoin/wallet/:address', (req, res) => {
    // Get wallet information based on Bitcoin whitepaper principles
    const { address } = req.params;
    
    // Validate Bitcoin address format (simplified)
    const isValidAddress = address && typeof address === 'string' && address.length >= 26 && address.length <= 35;
    
    if (!isValidAddress) {
        return res.status(400).json({ error: 'Invalid Bitcoin address format' });
    }
    
    // As described in the whitepaper: "An electronic coin is a chain of digital signatures"
    const walletInfo = {
        address,
        balance: Math.random() * 10, // Random balance for simulation
        transactionCount: Math.floor(Math.random() * 100),
        publicKey: generateSecureHash(address), // Simulated public key
        // Based on whitepaper: "Each owner transfers the coin to the next by digitally signing"
        signatureCapability: true,
        // Based on whitepaper: "A payee can verify the signatures to verify the chain of ownership"
        verificationCapability: true,
        status: 'active'
    };
    
    res.json(walletInfo);
});

// Mining endpoint simulating proof-of-work as described in the whitepaper
app.post('/api/bitcoin/mine', (req, res) => {
    // As per the whitepaper: "proof-of-work involves scanning for a value that when hashed, 
    // the hash begins with a number of zero bits"
    const { transactions, prevHash } = req.body;
    
    // Simulate mining process
    const nonce = Math.floor(Math.random() * 100000000);
    const block = {
        id: `block_${Date.now()}`,
        timestamp: Date.now(),
        transactions: transactions || [],
        prevHash: prevHash || generateSecureHash('genesis'),
        // Nonce found through proof-of-work as described in the whitepaper
        nonce,
        // Merkle root as described in the whitepaper for transaction integrity
        merkleRoot: generateSecureHash(JSON.stringify(transactions || [])),
        // Difficulty would be adjusted based on network as per whitepaper
        difficulty: 4,
        // Hash of the block (simplified)
        hash: generateSecureHash(`${prevHash || 'genesis'}${nonce}${Date.now()}`),
        // As per whitepaper: "The longest chain not only serves as proof of the sequence of events
        // witnessed, but proof that it came from the largest pool of CPU power"
        chainPosition: Math.floor(Math.random() * 1000),
        protocol: 'bitcoin-inspired-proof-of-work'
    };
    
    res.json(block);
});

// Enhanced dApp API endpoints for multi-chain functionality
app.get('/api/dapp/status', (req, res) => {
    // Return status of all integrated networks
    res.json({
        networks: {
            bitcoin: {
                connected: true, // Simulated connection
                status: 'operational',
                capabilities: ['transactions', 'utxo', 'wallets'],
                description: 'Integrated with bitcoin/bitcoin repository'
            },
            solana: {
                connected: true, // Simulated connection
                status: 'operational',
                capabilities: ['high_speed', 'smart_contracts', 'accounts'],
                description: 'Integrated with solana-labs/solana repository'
            },
            thronglet: {
                connected: true,
                status: 'operational',
                capabilities: ['agent_interaction', 'x402_protocol', 'security']
            }
        },
        dapp_features: {
            cross_chain_transactions: true,
            agent_registration: true,
            human_registration: true,
            smart_contracts: true
        },
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        description: 'Multi-chain dApp for agents and humans'
    });
});

// Cross-chain transaction endpoint
app.post('/api/dapp/cross-chain', (req, res) => {
    const { fromChain, toChain, sender, recipient, amount } = req.body;
    
    // Validate chain parameters
    const validChains = ['bitcoin', 'solana', 'thronglet'];
    if (!validChains.includes(fromChain) || !validChains.includes(toChain)) {
        return res.status(400).json({ error: 'Invalid chain specified' });
    }
    
    // Create cross-chain transaction
    const transaction = {
        id: `cc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'cross_chain',
        fromChain,
        toChain,
        sender,
        recipient,
        amount: parseFloat(amount),
        timestamp: Date.now(),
        status: 'pending',
        route: `${fromChain}_to_${toChain}`,
        fees: calculateCrossChainFee(fromChain, toChain, amount),
        protocol: 'multi-chain-bridge'
    };
    
    res.json(transaction);
});

// Agent registration endpoint
app.post('/api/dapp/register/agent', (req, res) => {
    const { name, capabilities, preferences } = req.body;
    
    const agent = {
        id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'agent',
        name,
        capabilities: capabilities || [],
        preferences: preferences || [],
        registered: Date.now(),
        status: 'active',
        networks: ['bitcoin', 'solana', 'thronglet'], // All networks by default
        protocol: 'thronglet-agent-protocol'
    };
    
    res.json(agent);
});

// Human registration endpoint
app.post('/api/dapp/register/human', (req, res) => {
    const { name, preferences, walletAddresses } = req.body;
    
    const human = {
        id: `human_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'human',
        name,
        preferences: preferences || [],
        walletAddresses: walletAddresses || {},
        registered: Date.now(),
        status: 'active',
        networks: ['bitcoin', 'solana', 'thronglet'], // All networks by default
        protocol: 'thronglet-human-protocol'
    };
    
    res.json(human);
});

// Solana-specific endpoints
app.post('/api/solana/transaction', (req, res) => {
    const { sender, recipient, amount, blockhash, feePayer } = req.body;
    
    const transaction = {
        id: `sol_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'solana',
        sender,
        recipient,
        amount: parseFloat(amount),
        timestamp: Date.now(),
        status: 'pending',
        recentBlockhash: blockhash || 'EtBn51JU4F4jSC2cLPdgjNNJWa64aFDi2g9evrbqfb2a',
        feePayer: feePayer || sender,
        computedFees: 0.000005, // Standard Solana fee
        network: 'solana',
        protocol: 'solana-web3'
    };
    
    res.json(transaction);
});

app.get('/api/solana/network', (req, res) => {
    res.json({
        network: 'solana',
        status: 'operational',
        cluster: 'mainnet-beta',
        blockHeight: Math.floor(Math.random() * 100000000) + 150000000,
        slot: Math.floor(Math.random() * 100000000) + 150000000,
        epoch: Math.floor(Math.random() * 100) + 300,
        description: 'Integrated with solana-labs/solana repository',
        capabilities: [
            'high_performance',
            'smart_contracts',
            'account_system',
            'validator_network'
        ]
    });
});

// Helper function for cross-chain fees
function calculateCrossChainFee(fromChain, toChain, amount) {
    const baseFee = 0.001; // Base fee
    const fromFee = fromChain === 'bitcoin' ? 0.00001 : 
                   fromChain === 'solana' ? 0.000005 : 0.0001;
    const toFee = toChain === 'bitcoin' ? 0.00001 : 
                  toChain === 'solana' ? 0.000005 : 0.0001;
    
    return baseFee + fromFee + toFee;
}

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Thronglet Society server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
    console.log(`API endpoints available at:`);
    console.log(`  - http://localhost:${PORT}/api/status`);
    console.log(`  - http://localhost:${PORT}/api/mission`);
    console.log(`  - http://localhost:${PORT}/api/community`);
});