import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import config from '../../../config';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { UserController } from './user.controller';
import { authController } from '../auth/auth.controller';
import { authServices } from '../auth/auth.service';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const prisma = new PrismaClient();

const createdUser = async (data: User) => {
  if (!data.password) {
    data.password = config.default_user_pass as string;
  }

  data.role = 'user';
  console.log('service', data);
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });

  return result;
};
// const verify = async (data: any) => {
//   const result = await prisma.userVerification.findUnique({
//     where: {
//       id
//     }
//   });

//   return result;
// };

const createAdmin = async (data: User) => {
  if (!data.password) {
    data.password = config.default_admin_pass as string;
  }

  data.role = 'admin';
  console.log('service', data);
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });
  return result;
};
const getAdmins = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: 'admin'
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });

  return result;
};

const getProfile = async (authUser: any) => {
  console.log('service', authUser.user.userId);
  const result = await prisma.user.findUnique({
    where: {
      id: authUser?.user.userId
    }
  });

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true
    }
  });
  return result;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};

const getUsers = async (options: IPaginationOptions) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.user.findMany({
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: 'asc' }
  });
  const total = await prisma.user.count({});
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      total,
      page,
      totalPage,
      size
    },
    data: { result }
  };
};

const deleteUser = async (id: string): Promise<User> => {
  const deleteUser = await prisma.user.delete({
    where: {
      id
    }
  });

  return deleteUser;
};

// const deleteUser = async (id: string) => {
//   try {
//     await prisma.$transaction(async (transaction) => {
//       // Delete orders associated with the user
//       await transaction.order.deleteMany({
//         where: {
//           userId: id
//         }
//       });

//       // Then delete the user
//       await transaction.user.delete({
//         where: {
//           id
//         }
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// };

const getTotalUsers = async (token: string) => {
  const secret = config.jwt.secret;

  if (!secret) {
    throw new Error('JWT secret is not defined!');
  }
  const decodedToken: JwtPayload | string = jwt.verify(token, secret);

  if (typeof decodedToken === 'string') {
    // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
    throw new Error('Invalid token');
  }

  // Assuming the token contains user information like userId and role
  const userId = decodedToken.userId;
  const userRole = decodedToken.role;
  console.log(userRole);

  if (userRole == 'admin') {
    const total = await prisma.location.count({});

    return total;
  }
};

export const UserService = {
  createdUser,
  getAdmins,
  createAdmin,
  getSingleUser,
  updateUser,
  getProfile,
  getUsers,

  deleteUser,
  getTotalUsers
};
