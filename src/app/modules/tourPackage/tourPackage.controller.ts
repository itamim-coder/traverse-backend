import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { TourPackageService } from './tourPackage.service';

const createPackage = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const result = await TourPackageService.createPackage(data);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tour Package created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});

const getTours = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await TourPackageService.getTours();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tour Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});
const getAvailableTours = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await TourPackageService.getAvailableTours();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available Tour Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});
const getUpcomingTours = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await TourPackageService.getUpcomingTours();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Upcoming Tour Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await TourPackageService.getSingleTour(req.params.id);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Tour Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

export const TourPackageController = {
  createPackage,
  getTours,
  getAvailableTours,
  getUpcomingTours,
  getSingleTour
};
