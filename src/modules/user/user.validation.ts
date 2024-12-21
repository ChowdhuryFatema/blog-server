import { z } from 'zod';

const UserValidationSchema = z.object({
    body: z.object({
        name: z.string().nonempty("Name is required"),
        email: z
            .string()
            .email("Invalid email format")
            .nonempty("Email is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.enum(["admin", "user"]).default("user"),
        isBlocked: z.boolean().default(false),
    })
})

export const UserValidation = {
    UserValidationSchema
}