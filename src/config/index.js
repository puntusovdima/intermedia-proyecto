import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the URL provided in the environment.
 * Handles the actual connection so our index.js stays clean.
 */
export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }
        
        await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
