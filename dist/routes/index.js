"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_route_1 = require("../modules/blog/blog.route");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/admin',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
