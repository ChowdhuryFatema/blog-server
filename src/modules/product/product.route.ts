import express from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id', ProductController.getSingleProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.getAllProduct);
router.post('/create-product', auth(USER_ROLE.admin), ProductController.createProduct);

export const ProductRoutes = router;
