"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/users/user.routes");
const category_routes_1 = require("../modules/categories/category.routes");
const book_routes_1 = require("../modules/books/book.routes");
const order_routes_1 = require("../modules/orders/order.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.UserRoutes,
    },
    {
        path: '/categories',
        routes: category_routes_1.CategoryRoutes,
    },
    {
        path: '/books',
        routes: book_routes_1.BookRoutes,
    },
    {
        path: '/orders',
        routes: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
