import { prisma } from './../../../shared/prisma';
import { Order, Prisma } from '@prisma/client';

const createOrder = async (
  BookData: Prisma.OrderCreateInput
): Promise<Order> => {
  const result = await prisma.order.create({
    data: BookData,
  });
  return result;
};

const getAllOrders = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    where: {},
  });
  return result;
};
export const OrderService = {
  createOrder,
  getAllOrders,
};
