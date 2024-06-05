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

const getSingleCategoryRoom = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await roomService.getSingleCategoryRoom(req.params.id);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room category Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const getSameRooms = catchAsync(async (req: Request, res: Response) => {
  try {
    console.log('trigger');
    const result = await roomService.getSameRooms();
    console.log(result);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room No Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const updateRoomAvailability = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await roomService.updateRoomAvailability(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room availability updated successfully',
    data: {
      result
    }
  });
});

const deleteCategoryRoom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await roomService.deleteCategoryRoom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Category deleted successfully',
    data: result
  });
});
const deleteRoomNo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await roomService.deleteRoomNo(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room No deleted successfully',
    data: result
  });
});

export const roomController = {
  createRoom,
  addRoom,
  getRooms,
  getSameRooms,
  getSingleCategoryRoom,
  updateRoomAvailability,
  deleteCategoryRoom,
  deleteRoomNo
};
