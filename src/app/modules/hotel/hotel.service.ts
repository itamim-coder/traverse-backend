import { Hotel, PrismaClient } from '@prisma/client';
import { uploadImagesToImageBB } from '../../../helpers/fileUploader';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import config from '../../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();
const createHotel = async (data: any): Promise<any> => {
  const result = await prisma.hotel.create({
    data
  });
  return result;
};

const getHotels = async (options: IPaginationOptions) => {
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.hotel.findMany({
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { name: 'asc' },
    include: {
      location: true
    }
  });
  const total = await prisma.hotel.count({});
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

const getHotelRooms = async (id: string) => {
  const result = await prisma.hotel.findUnique({
    where: {
      id
    },
    include: {
      rooms: true
    }
  });
  return result;
};

const deleteHotel = async (id: string): Promise<Hotel> => {
  const deleteHotel = await prisma.hotel.delete({
    where: {
      id
    }
  });

  return deleteHotel;
};

const getTotalHotels = async (token: string) => {
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
    const total = await prisma.hotel.count({});

    return total;
  }
};

export const hotelService = {
  createHotel,

  getHotels,
  getHotelRooms,
  deleteHotel,
  getTotalHotels
};
