import { z } from 'zod';

export const signinSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),

  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type SignInFormValues = z.infer<typeof signinSchema>;
