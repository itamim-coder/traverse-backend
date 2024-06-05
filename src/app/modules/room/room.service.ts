import { Hotel, PrismaClient, Room, RoomNumber } from '@prisma/client';

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

const getRoomDetails = async (id: string): Promise<any> => {
  const room = await prisma.roomNumber.findUnique({
    where: {
      id
    }
  });
  return room;
};
const addUnavailableDates = (existingDates: string[], newDates: string[]): string[] => {
  console.log(existingDates);
  console.log('new', newDates);
  if (!Array.isArray(existingDates)) {
    existingDates = [];
  }
  newDates.forEach((date) => {
    if (!existingDates.includes(date)) {
      existingDates.push(date);
    }
  });
  console.log('existing dates', existingDates);
  return existingDates;
};

const updateRoomAvailability = async (
  id: string,
  newDates: { unavailableDates: string[] }
): Promise<any> => {
  const room = await getRoomDetails(id);

  if (!room) {
    throw new Error(`Room with id ${id} not found`);
  }

  const updatedDates = addUnavailableDates(room.unavailableDates, newDates.unavailableDates);

  const result = await prisma.roomNumber.update({
    where: {
      id
    },
    data: {
      unavailableDates: updatedDates
    }
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
const deleteRoomNo = async (id: string): Promise<RoomNumber> => {
  const deleteRoom = await prisma.roomNumber.delete({
    where: {
      id
    }
  });

  return deleteRoom;
};

export const roomService = {
  createRoom,
  addRoom,
  getRooms,
  getSameRooms,
  getSingleCategoryRoom,
  updateRoomAvailability,
  deleteCategoryRoom,
  deleteRoomNo
};
