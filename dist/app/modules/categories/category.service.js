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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../shared/prisma");
const category_constants_1 = require("./category.constants");
const createCategory = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.category.create({
        data: categoryData,
        include: {
            books: true,
        },
    });
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.category.findUnique({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return result;
});
const getAllCategories = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, skip, limit } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: category_constants_1.CategorySearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // console.log('dd', filterData);
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const { sortBy, sortOrder } = options;
    const result = yield prisma_1.prisma.category.findMany({
        where: whereConditions,
        include: { books: true },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { title: 'asc' },
    });
    // console.log('I am groot', filters);
    const total = yield prisma_1.prisma.category.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const updateCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.category.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteSingleCategory,
};
