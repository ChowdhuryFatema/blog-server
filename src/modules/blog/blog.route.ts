import express from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id', BlogControllers.getSingleBlog);
router.delete('/:id', 
    auth(USER_ROLE.admin, USER_ROLE.user),
    BlogControllers.deleteBlog);

router.patch('/:id',
    auth(USER_ROLE.user),
    validateRequest(BlogValidation.updateBlogSchema),
    BlogControllers.updateBlog);

router.post('/',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(BlogValidation.blogValidationSchema),
    BlogControllers.createBlog);

router.get('/', BlogControllers.getAllBlogs);


export const BlogRoutes = router