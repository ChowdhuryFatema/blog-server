import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserControllers } from '../user/user.controller';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.UserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoute = router;
