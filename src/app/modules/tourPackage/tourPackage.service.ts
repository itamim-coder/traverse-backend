import { PrismaClient, TourPackage } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const createPackage = async (data: any): Promise<TourPackage> => {
  const result = await prisma.tourPackage.create({
    data
  });
  return result;
};

const getTours = async (options: IPaginationOptions) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.tourPackage.findMany({
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { title: 'asc' },
    include: {
      location: true
    }
  });
  const total = await prisma.tourPackage.count({});
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
const getAvailableTours = async () => {
  const result = await prisma.tourPackage.findMany({
    where: {
      available: true
    }
  });

  return result;
};
const getUpcomingTours = async () => {
  const result = await prisma.tourPackage.findMany({
    where: {
      upcoming: true
    }
  });

  return result;
};

const getSingleTour = async (id: string) => {
  const result = await prisma.tourPackage.findUnique({
    where: {
      id
    }
  });
  return result;
};

const deleteTour = async (id: string): Promise<TourPackage> => {
  const deleteTour = await prisma.tourPackage.delete({
    where: {
      id
    }
  });

  return deleteTour;
};

const updateTour = async (id: string, payload: Partial<TourPackage>): Promise<TourPackage> => {
  const result = await prisma.tourPackage.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};

const getTotalTours = async (token: string) => {
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
    const total = await prisma.tourPackage.count({});

    return total;
  }
};

export const TourPackageService = {
  createPackage,
  getTours,
  getAvailableTours,
  getUpcomingTours,
  getSingleTour,
  deleteTour,
  updateTour,
  getTotalTours
};
