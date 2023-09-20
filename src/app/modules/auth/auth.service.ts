import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { selectUserProperties } from './auth.constants';

const signUp = async (data: User) => {
  const result = await prisma.user.create({
    data: data,
    select: selectUserProperties,
  });
  return result;
};
export const AuthService = {
  signUp,
};
