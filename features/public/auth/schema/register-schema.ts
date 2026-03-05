import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .min(4, 'Name must be at least 4 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string().nonempty('Email is required').email('Invalid email address'),
  phone: z
    .string()
    .nonempty('Phone is required')
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Invalid phone number format',
    ),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const resendOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResendOtpValues = z.infer<typeof resendOtpSchema>;
