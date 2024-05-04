import { Hotel, PrismaClient, Room } from '@prisma/client';

const prisma = new PrismaClient();
const createRoom = async (data: any): Promise<any> => {
  console.log('service', data);
  const result = await prisma.room.create({
    data,
    include: {
      hotel: true
    }
  });
  return result;
};

const addRoom = async (data: any): Promise<any> => {
  console.log('service', data);
  const result = await prisma.roomNumber.create({
    data,
    include: {
      room: true
    }
  });
  return result;
};
const getRooms = async () => {
  const result = await prisma.room.findMany({
    include: {
      hotel: true,
      RoomNumber: true
    }
  });

  return result;
};
const getSingleCategoryRoom = async (id: string) => {
  const result = await prisma.room.findUnique({
    where: {
      id
    },

    include: {
      RoomNumber: true,

      hotel: true
    }
  });
  return result;
};

const getSameRooms = async () => {
  const result = await prisma.roomNumber.findMany({});
  console.log(result);
  return result;
};

const updateRoomAvailability = async (id: string, payload: Partial<any>): Promise<any> => {
  const result = await prisma.roomNumber.update({
    where: {
      id
    },
    data: payload
  });
  return result;
};

const deleteCategoryRoom = async (id: string): Promise<Room> => {
  const deleteCategoryRoom = await prisma.room.delete({
    where: {
      id
    }
  });

  return deleteCategoryRoom;
};

export const roomService = {
  createRoom,
  addRoom,
  getRooms,
  getSameRooms,
  getSingleCategoryRoom,
  updateRoomAvailability,
  deleteCategoryRoom
};
