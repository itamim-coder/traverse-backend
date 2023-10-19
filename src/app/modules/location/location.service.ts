import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createLocation = async (data: any): Promise<any> => {
  console.log('service', data);
  const result = await prisma.location.create({
    data
  });
  return result;
};

const getLocation = async () => {
  const result = await prisma.location.findMany({});

  return result;
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

export const LocationService = {
  createLocation,
  getLocation,
  getLocationBasedHotel
};
