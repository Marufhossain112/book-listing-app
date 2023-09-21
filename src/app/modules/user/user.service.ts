import config from '../../../config';
import { prisma } from '../../../shared/prisma';

const getAllUsers = async () => {
  const env = config.jwt.token;
  console.log(env)
  const result = await prisma.user.findMany({});
  return result;
};
export const UserService = {
  getAllUsers,
};
