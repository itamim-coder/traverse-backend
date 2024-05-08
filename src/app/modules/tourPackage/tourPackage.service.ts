import { PrismaClient, TourPackage } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

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

export const TourPackageService = {
  createPackage,
  getTours,
  getAvailableTours,
  getUpcomingTours,
  getSingleTour,
  deleteTour,
  updateTour
  
};
