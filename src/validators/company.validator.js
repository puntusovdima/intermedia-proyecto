import { z } from 'zod';

/**
 * Validation schema for updating user's personal data (Point 4).
 */
export const personalDataSchema = z.object({
    name: z.string().min(1, 'Name is required').trim(),
    lastName: z.string().min(1, 'Last name is required').trim(),
    nif: z.string().min(1, 'NIF is required').trim().toUpperCase()
});

/**
 * Validation schema for associating a company (Point 4).
 */
export const companySchema = z.object({
    name: z.string().min(1, 'Company name is required').trim(),
    cif: z.string().min(1, 'CIF is required').trim().toUpperCase(),
    address: z.object({
        street: z.string().optional(),
        number: z.string().optional(),
        postal: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional()
    }),
    isFreelance: z.boolean().default(false)
});
