import express from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';

const router = express.Router();

router.get('/:id', BlogControllers.getSingleBlog);
router.delete('/:id', BlogControllers.deleteBlog);

router.patch('/:id',
    validateRequest(BlogValidation.updateBlogSchema),
    BlogControllers.updateBlog);

router.post('/',
    validateRequest(BlogValidation.blogValidationSchema),
    BlogControllers.createBlog);

router.get('/', BlogControllers.getAllBlogs);


export const BlogRoutes = router