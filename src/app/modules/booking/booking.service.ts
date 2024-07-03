import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const prisma = new PrismaClient();

const hotelBooking = async (data: any): Promise<any> => {
  console.log('hotel', data);
  const result = await prisma.hotelBook.create({
    data
  });
  console.log(result);
  return result;
};

const tourBooking = async (data: any): Promise<any> => {
  const result = await prisma.tourBook.create({
    data
  });
  return result;
};

const getHotelBookings = async (token: string, options: IPaginationOptions) => {
  const secret = config.jwt.secret;
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  if (!secret) {
    throw new Error('JWT secret is not defined!');
  }
  const decodedToken: JwtPayload | string = jwt.verify(token, secret);
  console.log(decodedToken);

  if (typeof decodedToken === 'string') {
    // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
    throw new Error('Invalid token');
  }

  // Assuming the token contains user information like userId and role
  const userId = decodedToken.userId;
  const userRole = decodedToken.role;
  console.log(userRole);
  if (userRole == 'user') {
    const result = await prisma.hotelBook.findMany({
      where: {
        userId: userId
      },
      skip,
      take: size,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'asc' }
    });
    console.log('user');
    const total = await prisma.hotelBook.count({});
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
  }

  if (userRole == 'admin') {
    const result = await prisma.hotelBook.findMany({
      skip,
      take: size,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'asc' }
    });
    const total = await prisma.hotelBook.count({});
    const totalPage = Math.ceil(total / size);
    console.log('admin');
    return {
      meta: {
        total,
        page,
        totalPage,
        size
      },
      data: { result }
    };
  }
};
const getTotalBookings = async (token: string) => {
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
    const totalHotelBooks = await prisma.hotelBook.count({});
    const totalTourBooks = await prisma.tourBook.count({});
    const total = totalHotelBooks + totalTourBooks;
    console.log('admin');
    return total;
  }
};

const getTourBookings = async (token: string, options: IPaginationOptions) => {
  const secret = config.jwt.secret;
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  if (!secret) {
    throw new Error('JWT secret is not defined!');
  }
  const decodedToken: JwtPayload | string = jwt.verify(token, secret);
  console.log(decodedToken);

  if (typeof decodedToken === 'string') {
    // Handle the case where decodedToken is a string (e.g., an error occurred during token verification)
    throw new Error('Invalid token');
  }

  // Assuming the token contains user information like userId and role
  const userId = decodedToken.userId;
  const userRole = decodedToken.role;

  if (userRole == 'user') {
    const result = await prisma.tourBook.findMany({
      where: {
        userId: userId
      },
      skip,
      take: size,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'asc' }
    });
    console.log('user');
    const total = await prisma.tourBook.count({});
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
  }

  if (userRole == 'admin') {
    const result = await prisma.tourBook.findMany({
      skip,
      take: size,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : { createdAt: 'asc' }
    });
    console.log('admin');
    const total = await prisma.tourBook.count({});
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
  }
};

export const BookingService = {
  hotelBooking,
  tourBooking,
  getHotelBookings,
  getTourBookings,
  getTotalBookings
};
