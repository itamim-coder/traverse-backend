import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hotelBooking = async (data: any): Promise<any> => {
  const result = await prisma.hotelBook.create({
    data
  });
  return result;
};

const tourBooking = async (data: any): Promise<any> => {
  const result = await prisma.tourBook.create({
    data
  });
  return result;
};

export const BookingService = {
  hotelBooking,
  tourBooking
};
