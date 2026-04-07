import express from 'express';
import { register, validateEmail, login } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require JWT)
router.put('/validation', protect, validateEmail);

export default router;
