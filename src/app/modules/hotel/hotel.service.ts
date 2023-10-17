import { Hotel, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createHotel = async (data: any): Promise<any> => {
  console.log('service', data);
  const result = await prisma.hotel.create({
    data
  });
  return result;
};

export const hotelService = {
  createHotel
};
