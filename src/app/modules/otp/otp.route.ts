import express from 'express';
import { UserController } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OtpController } from './otp.controller';


const router = express.Router();

router.post('/', OtpController.sendOtp);
router.post('/verify',  OtpController.verifyOtp);

export const OtpRoutes = router;
