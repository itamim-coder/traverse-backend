import { Request, RequestHandler, Response } from 'express';

import sendResponse from '../../../shared/response';

import httpStatus from 'http-status';
import catchAsync from '../../../shared/catechAsync';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

const createUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const { ...user } = req.body;

    const result = await UserService.createdUser(user);

    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully !',
      data: result
    });
  } catch (err) {}
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users Retrieved successfully !',
      data: result
    });
  } catch (err) {}
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
  getUsers,
  getSingleUser,
  updateUser
  //   deleteUser
};
