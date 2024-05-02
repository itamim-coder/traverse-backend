import { Location, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

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
  deleteLocation
};
