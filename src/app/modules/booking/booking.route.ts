import express from 'express';

import { BookingController } from './booking.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/hotel', BookingController.hotelBooking);
router.post('/tour', BookingController.tourBooking);
router.get(
  '/user-hotel',
  //   auth(ENUM_USER_ROLE.USER),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getHotelBookings
);
router.get(
  '/user-tour',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),

  BookingController.getTourBookings
);
// router.get('/', LocationController.getLocation);

export const BookingRoutes = router;
