import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string().email('Invalid email address'),
  contactNumber: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Enter a valid contact number',
    ),
  message: z.string().min(30, 'Message should be greater than 30 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
