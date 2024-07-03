import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';

import { BookingService } from './booking.service';
import pick from '../../../shared/pick';

const hotelBooking = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;

    const result = await BookingService.hotelBooking(data);
    console.log(result);
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

const getHotelBookings = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }

    const result = await BookingService.getHotelBookings(token, options);
    console.log(result);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel Booking Retrieved successfully !',
      meta: result?.meta,
      data: result?.data
    });
  } catch (err) {
    console.log(err);
  }
});
const getTotalBookings = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }

    const result = await BookingService.getTotalBookings(token);
    console.log(result);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Hotel Booking Retrieved successfully !',

      data: result
    });
  } catch (err) {
    console.log(err);
  }
});
const getTourBookings = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }
    const result = await BookingService.getTourBookings(token, options);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tour Booking Retrieved successfully !',
      meta: result?.meta,
      data: result?.data
    });
  } catch (err) {}
});

export const BookingController = {
  hotelBooking,
  tourBooking,
  getHotelBookings,
  getTourBookings,
  getTotalBookings
};
