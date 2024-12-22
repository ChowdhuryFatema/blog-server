"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
// Zod schema for the Blog model
const blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        content: zod_1.z.string().min(1, 'Content is required'),
        author: zod_1.z.string().nonempty('Author is required'),
        isPublished: zod_1.z.boolean().optional().default(true),
    }),
});
const updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
// Define the Zod schema type
exports.BlogValidation = {
    blogValidationSchema,
    updateBlogSchema,
};
