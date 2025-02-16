import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Name is required'),
    email: z
      .string()
      .email('Invalid email format')
      .nonempty('Email is required'),
    image: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});
const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z.string().optional(),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UpdateUserValidationSchema,
};
