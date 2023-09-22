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
export const OrderService = {
  createOrder,
};
