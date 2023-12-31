import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import { Order } from '@prisma/client';
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully.',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await OrderService.getAllOrders(token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders data fetched  successfully.',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { orderId } = req.params;
  const result = await OrderService.getSingleOrder(token as string, orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single order data fetched  successfully.',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
