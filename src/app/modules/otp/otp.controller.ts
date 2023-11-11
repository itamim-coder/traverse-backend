import { NextFunction, Request, Response } from 'express';

import config from '../../../config';
import { OtpService } from './otp.service';

const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...otpData } = req.body;
    const result = await OtpService.sendOtp(otpData);


    res.send({
      statusCode: 200,
      success: true,
      message: 'Otp created  successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...otpData } = req.body;
    const result = await OtpService.verifyOtp(otpData);


    res.send({
      statusCode: 200,
      success: true,
      message: 'Otp verified  successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};



export const OtpController = { sendOtp,verifyOtp };
