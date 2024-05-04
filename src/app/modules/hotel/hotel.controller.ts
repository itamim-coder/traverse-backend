import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { hotelService } from './hotel.service';
import pick from '../../../shared/pick';

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

const getHotels = catchAsync(async (req: Request, res: Response) => {
  try {
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const result = await hotelService.getHotels(options);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel Retrieved successfully !',
      meta: result.meta,
      data: result.data
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

const deleteHotel = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await hotelService.deleteHotel(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Hotel deleted successfully',
    data: result
  });
});

export const hotelController = {
  createHotel,

  getHotels,
  getHotelRooms,
  deleteHotel
};
