import { Request, Response } from 'express';
import catchAsync from '../../../shared/catechAsync';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';
import { TourPackageService } from './tourPackage.service';
import pick from '../../../shared/pick';

const createPackage = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...data } = req.body;
   
    const result = await TourPackageService.createPackage(data);
   
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tour Package created successfully !',
      data: result
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const getTours = catchAsync(async (req: Request, res: Response) => {
  try {
    const options = pick(req.query, ['size', 'page', 'sortBy', 'sortOrder']);
    const result = await TourPackageService.getTours(options);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tour Retrieved successfully !',
      meta: result.meta,
      data: result.data
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

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourPackageService.deleteTour(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour deleted successfully',
    data: result
  });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourPackageService.updateTour(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tour updated successfully',
    data: {}
  });
});

export const TourPackageController = {
  createPackage,
  getTours,
  getAvailableTours,
  getUpcomingTours,
  getSingleTour,
  deleteTour,
  updateTour
};
