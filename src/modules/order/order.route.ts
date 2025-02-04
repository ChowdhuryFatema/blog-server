import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/verifyPayment', OrderController.verifyPayment);
router.get('/', OrderController.getAllOrders);
router.post('/create-order', auth(USER_ROLE.admin, USER_ROLE.user), OrderController.createOrder);
router.get('/revenue', OrderController.getRevenue);

export const OrderRoutes = router;
