import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
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

const getAllOrders = async (token: string): Promise<Order[] | null> => {
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.token as string
  );
  const { role, userId } = verifiedUser;
  const whereCondition = role === 'customer' ? { userId } : {};
  const result = await prisma.order.findMany({
    where: whereCondition,
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
