import app from './app.js';
import { connectDB } from './config/index.js';

// Setup port from env or 3000 as default
const PORT = process.env.PORT || 3000;

// Initialize Server
const startServer = async () => {
    // 1. Establish database connection first
    await connectDB();
    
    // 2. Once connected, start accepting HTTP requests
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();
