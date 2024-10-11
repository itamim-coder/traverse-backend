import express from 'express';
import { UserController } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(userValidation.create), UserController.createUser);
router.post('/signin', validateRequest(authValidation.signin), authController.loginUser);
router.post('/google-signin', authController.googleLogin);
router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshToken),
  authController.refreshToken
);

export const AuthRoutes = router;
