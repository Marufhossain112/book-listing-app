import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import pick from '../../../shared/pick';
import { UserFilterableFields } from './user.constants';
import { paginationFields } from '../../../constants/pagination';
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users data fetched  successfully.',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserService.updateSingleUser(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
export const UserController = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
