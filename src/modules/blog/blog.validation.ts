import { z } from 'zod';

// Zod schema for the Blog model
const blogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    author: z.string().nonempty('Author is required'),
    isPublished: z.boolean().optional().default(true),
  }),
});
const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

// Define the Zod schema type
export const BlogValidation = {
  blogValidationSchema,
  updateBlogSchema,
};
