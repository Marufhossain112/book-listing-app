/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { BookSearchableFields } from './book.constants';
import { IBookFilterRequest } from './book.interface';

const createBook = async (BookData: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: BookData,
    include: {
      category: true,
    },
  });
  return result;
};
const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, skip, limit } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: BookSearchableFields.map(field => ({
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
      AND: Object.keys(filterData).map(key => {
        // if ((filterData as any)[key]) {
        if (key === 'category') {
          return {
            category: {
              id: {
                equals: filterData[key],
              },
            },
          };
        } else if (key === 'maxPrice') {
          return {
            price: {
              lte: Number(filterData[key]),
            },
          };
        } else if (key === 'minPrice') {
          return {
            price: {
              gte: Number(filterData[key]),
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
        // }
      }),
    });
  }
  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const { sortBy, sortOrder } = options;
  const result = await prisma.book.findMany({
    where: whereConditions,
    include: { category: true },
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
  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const getBooksByCategory = async (id: string): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    where: { categoryId: id },
  });
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Partial<Book>> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};
export const BookService = {
  createBook,
  getAllBooks,
  updateBook,
  deleteSingleBook,
  getSingleBook,
  getBooksByCategory,
};
