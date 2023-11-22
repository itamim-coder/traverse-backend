import { PrismaClient } from '@prisma/client';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import config from '../../../config';

const prisma = new PrismaClient();

const hotelBooking = async (data: any): Promise<any> => {
  console.log("hotel",data)
  const result = await prisma.hotelBook.create({
    data
  });
  console.log(result)
  return result;
};

const tourBooking = async (data: any): Promise<any> => {
  const result = await prisma.tourBook.create({
    data
  });
  return result;
};



const getHotelBookings = async (token: string) => {
  const secret = config.jwt.secret;

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

  if (userRole == 'customer') {
    const result = await prisma.hotelBook.findMany({
      where: {
        userId: userId
      }
    });
    console.log('customer');
    return result;
  }

  if (userRole == 'admin') {
    const result = await prisma.hotelBook.findMany({});
    console.log('admin');
    return result;
  }
};
const getTourBookings = async (token: string) => {
  const secret = config.jwt.secret;

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

  if (userRole == 'customer') {
    const result = await prisma.tourBook.findMany({
      where: {
        userId: userId
      }
    });
    console.log('customer');
    return result;
  }

  if (userRole == 'admin') {
    const result = await prisma.tourBook.findMany({});
    console.log('admin');
    return result;
  }
};


export const BookingService = {
  hotelBooking,
  tourBooking,
  getHotelBookings,
  getTourBookings
};
