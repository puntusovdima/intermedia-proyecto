import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

const ACCESS_SECRET = process.env.JWT_SECRET;
if (!ACCESS_SECRET) throw new Error('JWT_SECRET is not defined');

export const protect = (req, res, next) => {
    let token;

    // Check if the auth header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    try {
        // Verification step
        const decoded = jwt.verify(token, ACCESS_SECRET);
        
        // We attach the extracted payload (which includes our userId as `id`) to the request object
        req.user = decoded; 
        next();
    } catch (error) {
        return next(new AppError('Invalid token or token has expired.', 401));
    }
};
