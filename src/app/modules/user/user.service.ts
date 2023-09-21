import { prisma } from '../../../shared/prisma';

const getAllUsers = async () => {
  const result = await prisma.user.findMany({});
  return result;
};
const getSingleUser = async (id: string ) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const UserService = {
  getAllUsers,
  getSingleUser,
};
