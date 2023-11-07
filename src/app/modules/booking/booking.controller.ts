import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';

import { BookingService } from './booking.service';

const hotelBooking = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const result = await BookingService.hotelBooking(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel Booking created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});
const tourBooking = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const result = await BookingService.tourBooking(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tour Booking created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});



  

export const BookingController = {
    hotelBooking,
    tourBooking
    
 
};
