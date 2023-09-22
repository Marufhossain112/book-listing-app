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
exports.AuthService = void 0;
const prisma_1 = require("../../../shared/prisma");
const auth_constants_1 = require("./auth.constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10; // You can adjust the number of rounds for security
    const salt = yield bcrypt_1.default.genSalt(saltRounds);
    // Hash the user's password with the generated salt
    const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
    const result = yield prisma_1.prisma.user.create({
        data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        select: auth_constants_1.selectUserProperties,
    });
    return result;
});
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('password from service, given', data.password);
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            email: data === null || data === void 0 ? void 0 : data.email,
        },
    });
    const isPasswordMatch = yield bcrypt_1.default.compare(data.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password did not match.');
    }
    // create token
    const payload = { role: user === null || user === void 0 ? void 0 : user.role, userId: user === null || user === void 0 ? void 0 : user.id };
    const token = jwtHelpers_1.jwtHelpers.createToken(payload, config_1.default.jwt.token, config_1.default.jwt.token_expires);
    return token;
});
exports.AuthService = {
    signUp,
    login,
};
