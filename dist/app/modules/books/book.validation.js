"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required.',
        }),
        author: zod_1.z.string({
            required_error: 'author is required.',
        }),
        price: zod_1.z.number({
            required_error: 'price is required.',
        }),
        genre: zod_1.z.string({
            required_error: 'genre is required.',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'publicationDate is required.',
        }),
        categoryId: zod_1.z.string({
            required_error: 'categoryId is required.',
        }),
    }),
});
const updateBookValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({}).optional(),
        author: zod_1.z.string({}).optional(),
        price: zod_1.z.number({}).optional(),
        genre: zod_1.z.string({}).optional(),
        publicationDate: zod_1.z.string({}).optional(),
        categoryId: zod_1.z.string({}).optional(),
    }),
});
exports.BookValidation = {
    createBookValidation,
    updateBookValidation,
};
