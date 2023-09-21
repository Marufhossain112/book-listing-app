import { Category } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import { CategoryService } from './category.service';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully.',
    data: result,
  });
});
export const CategoryController = {
  createCategory,
};
