"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
router.put('/:id', product_controller_1.ProductController.updateProduct);
router.delete('/:id', product_controller_1.ProductController.deleteProduct);
router.get('/', product_controller_1.ProductController.getAllProduct);
router.post('/create-product', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductController.createProduct);
exports.ProductRoutes = router;
