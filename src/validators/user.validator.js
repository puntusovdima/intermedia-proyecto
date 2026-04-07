import { z } from 'zod';

// Schema for Point 1: Registration
export const registerSchema = z.object({
    email: z.string().email('Invalid email address format').transform((val) => val.toLowerCase()),
    password: z.string().min(8, 'Password must be at least 8 characters long')
});

// Schema for Point 2: Email Validation
export const validationSchema = z.object({
    code: z.string().length(6, 'Verification code must be exactly 6 characters')
});

// Schema for Point 3: Login
export const loginSchema = z.object({
    email: z.string().email('Invalid email address format').transform((val) => val.toLowerCase()),
    password: z.string().min(1, 'Password is required')
});
