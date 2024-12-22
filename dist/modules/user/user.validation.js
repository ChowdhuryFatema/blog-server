"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const UserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty('Name is required'),
        email: zod_1.z
            .string()
            .email('Invalid email format')
            .nonempty('Email is required'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
        role: zod_1.z.enum(['admin', 'user']).default('user'),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
const UpdateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Invalid email format').optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'user']).default('user'),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
exports.UserValidation = {
    UserValidationSchema,
    UpdateUserValidationSchema,
};
