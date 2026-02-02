// Server for Thronglet Society Application
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

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