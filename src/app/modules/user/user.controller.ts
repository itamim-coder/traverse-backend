import { Request, RequestHandler, Response } from 'express';

import sendResponse from '../../../shared/response';

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catechAsync';

import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...user } = req.body;
    console.log(user);
    const result = await UserService.createdUser(user);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...user } = req.body;
    console.log(user);
    const result = await UserService.createAdmin(user);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully !',
      data: result
    });
  } catch (err) {
    res.send(err);
  }
});

const getAdmins = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAdmins();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  try {
    console.log(req);
    const user = req;
    // const token = req.headers.authorization;
    // console.log(token);
    // const refreshToken = req.cookies.refreshToken;
    // if (!token) {
    //   return res.status(401).json({
    //     success: false,
    //     statusCode: 401,
    //     message: 'Token is required for this operation'
    //   });
    // }

    const result = await UserService.getProfile(req);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile Retrieved successfully !',
      data: result
    });
  } catch (err) {
    console.log(err);
  }
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUser(req.params.id);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Retrieved successfully !',
      data: result
    });
  } catch (err) {}
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: {}
  });
});
// const deleteUser= catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await UserService.deleteUser(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User delete successfully',
//     data: {}
//   });
// });

export const UserController = {
  createUser,
  createAdmin,
  getAdmins,
  getSingleUser,
  updateUser,
  getProfile
  //   deleteUser
};
