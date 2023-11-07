import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { hotelService } from './hotel.service';

const createHotel = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(req);
    const result = await hotelService.createHotel(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});
const createImage = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(req);
    const result = await hotelService.createImage(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});

const getHotels = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await hotelService.getHotels();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const getHotelRooms = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await hotelService.getHotelRooms(req.params.id);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rooms Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});




export const hotelController = {
  createHotel,
  createImage,
  getHotels,
  getHotelRooms
};
