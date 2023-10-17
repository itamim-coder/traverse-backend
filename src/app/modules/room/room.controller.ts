import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { roomService } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const result = await roomService.createRoom(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});

const addRoom = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const result = await roomService.addRoom(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room added successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});

const getRooms = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await roomService.getRooms();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rooms Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

export const roomController = {
  createRoom,
  addRoom,
  getRooms
};
