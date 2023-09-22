"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = require("./../../../shared/prisma");
const createOrder = (BookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.order.create({
        data: BookData,
    });
    return result;
});
const getAllOrders = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.token);
    const { role, userId } = verifiedUser;
    const whereCondition = role === 'customer' ? { userId } : {};
    const result = yield prisma_1.prisma.order.findMany({
        where: whereCondition,
    });
    return result;
});
const getSingleOrder = (token, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.token);
    const { userId } = verifiedUser;
    const result = yield prisma_1.prisma.order.findMany({
        where: { id: orderId, userId },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
