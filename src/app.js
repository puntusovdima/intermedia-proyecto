import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import AppError from './utils/AppError.js';
import UserRouter from './routes/user.routes.js';

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON payload
app.use(express.json());

app.use('/api/user', UserRouter);

// A simple test route to verify everything is working
app.get('/api/ping', (req, res) => {
    res.json({ message: 'Pong! 🏓 The API is running.' });
});

// A route solely for testing our AppError and errorHandler
// You can remove this down the line. It serves as a proof of concept.
app.get('/api/test-error', (req, res, next) => {
    // We instantiate an operational error, and pass it immediately to next()
    const error = new AppError('This is a test operational error!', 400);
    // Passing anything to next() flags to Express that an error occurred
    next(error); 
});

// Route catch-all for undefined endpoints
app.all('*any', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Mount our centralized error handling middleware at the very end
app.use(errorHandler);

export default app;
