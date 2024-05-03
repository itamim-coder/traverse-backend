import { Hotel, PrismaClient } from '@prisma/client';
import { uploadImagesToImageBB } from '../../../helpers/fileUploader';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const prisma = new PrismaClient();
const createHotel = async (data: any): Promise<any> => {
  console.log('service', data);
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

export const hotelService = {
  createHotel,

  getHotels,
  getHotelRooms
};
