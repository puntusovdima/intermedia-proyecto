import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import notificationService from '../services/notification.service.js';
import { generateTokens } from '../utils/jwt.js';
import { registerSchema, validationSchema, loginSchema } from '../validators/user.validator.js';
import bcrypt from 'bcryptjs';

// --- POINT 1: Register ---
export const register = async (req, res, next) => {
    try {
        // 1. Validate data coming from client using Zod
        const validatedData = registerSchema.parse(req.body);

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            // Throw conflict error
            throw new AppError('Email is already registered.', 409);
        }

        // 3. Generate random 6 digit code (100000 to 999999)
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // 4. Create the user. The password plain text will be automatically hashed
        //    by the "pre('save')" hook before it enters MongoDB.
        const newUser = await User.create({
            email: validatedData.email,
            password: validatedData.password,
            verificationCode: code
        });

        // 5. Fire global event
        notificationService.emit('user:registered', newUser.email);

        // 6. Generate Tokens
        const tokens = generateTokens(newUser._id);

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    email: newUser.email,
                    role: newUser.role,
                    status: newUser.status,
                    _id: newUser._id
                },
                ...tokens
            }
        });
    } catch (error) {
        // If Zod throws a validation error, we format it nicely
        if (error.name === 'ZodError') {
            return next(new AppError(error.errors[0].message, 400));
        }
        next(error);
    }
};

// --- POINT 2: Email Validation ---
export const validateEmail = async (req, res, next) => {
    try {
        // req.user.id comes from the 'protect' JWT auth middleware!
        const userId = req.user.id;
        
        // Zod validation
        const validatedData = validationSchema.parse(req.body);

        const user = await User.findById(userId);
        if (!user) {
            throw new AppError('User not found.', 404);
        }

        if (user.status === 'verified') {
            throw new AppError('User is already verified.', 400);
        }

        if (user.verificationAttempts <= 0) {
            throw new AppError('Too many failed attempts. Account locked.', 429);
        }

        if (user.verificationCode !== validatedData.code) {
            // Decrease attempts
            user.verificationAttempts -= 1;
            await user.save();
            throw new AppError(`Invalid code. ${user.verificationAttempts} attempts remaining.`, 401);
        }

        // Success!
        user.status = 'verified';
        // (Optional) wipe the code/attempts so they can't be reused
        user.verificationCode = undefined;
        await user.save();

        notificationService.emit('user:verified', user.email);

        res.status(200).json({ status: 'success', message: 'Email validated successfully!' });
    } catch (error) {
        if (error.name === 'ZodError') return next(new AppError(error.errors[0].message, 400));
        next(error);
    }
};

// --- POINT 3: Login ---
export const login = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        // We explicitly tell Mongoose to pull back the password for checking
        // using "+password" because we historically set it to "select: false"
        const user = await User.findOne({ email: validatedData.email }).select('+password');
        
        if (!user) {
            throw new AppError('Invalid email or password.', 401);
        }

        // Use bcrypt to compare plain text vs hashed
        const isPasswordCorrect = await bcrypt.compare(validatedData.password, user.password);

        if (!isPasswordCorrect) {
            throw new AppError('Invalid email or password.', 401);
        }

        // Generate new set of tokens
        const tokens = generateTokens(user._id);

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    _id: user._id
                },
                ...tokens
            }
        });
    } catch (error) {
        if (error.name === 'ZodError') return next(new AppError(error.errors[0].message, 400));
        next(error);
    }
};
