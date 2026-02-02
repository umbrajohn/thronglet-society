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