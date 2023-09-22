/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { CategorySearchableFields } from './category.constants';
import { ICategoryFilterRequest } from './category.interface';

const createCategory = async (categoryData: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: categoryData,
    include: {
      books: true,
    },
  });
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const getAllCategories = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: CategorySearchableFields.map(field => ({
        [field]: {
          contains: search,
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
  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const { sortBy, sortOrder } = options;
  const result = await prisma.category.findMany({
    where: whereConditions,
    include: { books: true },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [options.sortBy as any]: options.sortOrder,
          }
        : { title: 'asc' },
  });
  // console.log('I am groot', filters);
  const total = await prisma.category.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Partial<Category>> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};
export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteSingleCategory,
};
