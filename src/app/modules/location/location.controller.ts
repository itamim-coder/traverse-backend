import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { LocationService } from './location.service';
import pick from '../../../shared/pick';

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
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const result = await LocationService.getLocation(options);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location Retrieved successfully !',
      meta: result.meta,
      data: result.data
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

const deleteLocation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LocationService.deleteLocation(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location deleted successfully',
    data: result
  });
});

const getTotalLocations = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Token is required for this operation'
      });
    }

    const result = await LocationService.getTotalLocations(token);
    console.log(result);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location count Retrieved successfully !',

      data: result
    });
  } catch (err) {
    console.log(err);
  }
});

export const LocationController = {
  createLocation,
  getLocation,
  getLocationBasedHotel,
  deleteLocation,
  getTotalLocations
};
