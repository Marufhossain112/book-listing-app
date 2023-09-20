import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import { selectUserProperties } from './auth.constants';
import bcrypt from 'bcrypt';

const signUp = async (data: User) => {
  const saltRounds = 10; // You can adjust the number of rounds for security
  const salt = await bcrypt.genSalt(saltRounds);
  // Hash the user's password with the generated salt
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword, // Store the hashed password in the database
    },
    select: selectUserProperties,
  });
  return result;
};
export const AuthService = {
  signUp,
};
