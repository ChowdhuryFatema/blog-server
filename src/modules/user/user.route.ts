import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();


router.patch('/users/:userId/block',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.UpdateUserValidationSchema),
    UserControllers.updateUser
);

router.delete('/blogs/:id',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.UpdateUserValidationSchema),
    UserControllers.deleteBlogByAdmin
);


export const UserRoutes = router