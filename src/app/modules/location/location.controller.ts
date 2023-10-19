import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { LocationService } from './location.service';

const createLocation = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const result = await LocationService.createLocation(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});

const getLocation = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await LocationService.getLocation();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const getLocationBasedHotel = catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await LocationService.getLocationBasedHotel(req.params.id);
      sendResponse<any>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Location Based Hotel Retrieved successfully !',
        data: result
      });
    } catch (err) {}
  });
  

export const LocationController = {
  createLocation,
  getLocation,
  getLocationBasedHotel
};
