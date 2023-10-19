import { Hotel, PrismaClient } from '@prisma/client';
import { uploadImagesToImageBB } from '../../../helpers/fileUploader';

const prisma = new PrismaClient();
const createHotel = async (data: any): Promise<any> => {
  console.log('service', data);
  const result = await prisma.hotel.create({
    data
  });
  return result;
};

const createImage = async (data: any) => {
  console.log('service', data);

  // Upload multiple images to ImageBB
  const imageLinks = await uploadImagesToImageBB(data.photos); // Assuming 'images' is an array of image data
  console.log(imageLinks);
  // Create the hotel with the image links
  // const result = await prisma.hotel.create({
  //   data: {
  //     ...data,
  //     photos: imageLinks, // Update 'images' property with the image links array
  //   },
  // });

  // return result;
};

const getHotels = async () => {
  const result = await prisma.hotel.findMany({});

  return result;
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
  createImage,
  getHotels,
  getHotelRooms
};
