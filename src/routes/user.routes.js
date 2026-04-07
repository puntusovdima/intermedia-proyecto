import express from 'express';
import { register, validateEmail, login, updatePersonalData, updateCompany, uploadLogo } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require JWT)
router.put('/validation', protect, validateEmail);
router.put('/register', protect, updatePersonalData);
router.patch('/company', protect, updateCompany);
router.patch('/logo', protect, upload.single('logo'), uploadLogo);

export default router;
