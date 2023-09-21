import { Prisma, User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { IUserFilterRequest } from './user.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { UserSearchableFields } from './user.constants';

const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: UserSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  // console.log('dd', filterData);
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const { sortBy, sortOrder } = options;
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [options.sortBy as any]: options.sortOrder,
          }
        : { name: 'asc' },
  });
  // console.log('I am groot', filters);
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User>> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
