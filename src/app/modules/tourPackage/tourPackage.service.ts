import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const createPackage = async (data: any): Promise<any> => {
  const result = await prisma.tourPackage.create({
    data
  });
  return result;
};

const getTours = async () => {
  const result = await prisma.tourPackage.findMany({});

  return result;
};
const getAvailableTours = async () => {
  const result = await prisma.tourPackage.findMany({
    where: {
      available: true,
    },
  });

  return result;
};
const getUpcomingTours = async () => {
  const result = await prisma.tourPackage.findMany({
    where: {
      upcoming: true,
    },
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

export const TourPackageService = {
  createPackage,
  getTours,
  getAvailableTours,
  getUpcomingTours,
  getSingleTour
};
