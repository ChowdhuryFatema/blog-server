import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/verifyPayment", auth(USER_ROLE.user, USER_ROLE.admin), orderController.verifyPayment);
router.post("/create-order", auth(USER_ROLE.user, USER_ROLE.admin), orderController.createOrder)
router.get("/", auth(USER_ROLE.user, USER_ROLE.admin), orderController.getOrders);

export const OrderRoutes = router;




// const router = express.Router();

// router.get('/:id', ProductController.getSingleProduct);
// router.put('/:id', ProductController.updateProduct);
// router.delete('/:id', ProductController.deleteProduct);
// router.get('/', ProductController.getAllProduct);
// router.post('/create-product', auth(USER_ROLE.admin), ProductController.createProduct);

// export const ProductRoutes = router;
