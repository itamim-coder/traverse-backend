import { PrismaClient, Room } from '@prisma/client';

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

export const roomService = {
  createRoom,
  addRoom,
  getRooms
};
