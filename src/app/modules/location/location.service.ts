import { Location, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const createLocation = async (data: any): Promise<any> => {
  console.log('service', data);
  const result = await prisma.location.create({
    data
  });
  return result;
};

const getLocation = async (options: IPaginationOptions) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.location.findMany({
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { name: 'asc' }
  });
  const total = await prisma.location.count({});
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
const getTotalLocations = async (token: string) => {
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

const getLocationBasedHotel = async (id: string) => {
  const result = await prisma.location.findUnique({
    where: {
      id
    },
    select: {
      Hotel: true
    }
  });
  return result;
};

const deleteLocation = async (id: string): Promise<Location> => {
  const deleteLocation = await prisma.location.delete({
    where: {
      id
    }
  });

  return deleteLocation;
};

export const LocationService = {
  createLocation,
  getLocation,
  getLocationBasedHotel,
  deleteLocation,
  getTotalLocations
};
