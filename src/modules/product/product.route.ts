import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.get('/:id', ProductController.getSingleProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/', ProductController.getAllProduct);
router.post('/create-product', ProductController.createProduct);

export const ProductRoutes = router;
