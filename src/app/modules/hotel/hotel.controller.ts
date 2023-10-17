import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { hotelService } from './hotel.service';

const createHotel = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
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

export const hotelController = {
  createHotel
};
