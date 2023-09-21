import { Role } from '@prisma/client';
import { z } from 'zod';
const roleEnumValues = Object.values(Role) as string[];
const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([...roleEnumValues] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserValidation,
};
