import { Category } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import { CategoryService } from './category.service';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CategoryFilterableFields } from './category.constants';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully.',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, CategoryFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await CategoryService.getAllCategories(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All categories data fetched  successfully.',
    data: result,
  });
});
export const CategoryController = {
  createCategory,
  getAllCategories,
};
