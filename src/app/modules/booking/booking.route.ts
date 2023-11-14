import express from 'express';

import { BookingController } from './booking.controller';

const router = express.Router();

router.post('/hotel', BookingController.hotelBooking);
router.post('/tour', BookingController.tourBooking);
router.get('/hotel', BookingController.getHotelBookings);
router.get('/tour', BookingController.getTourBookings);
// router.get('/', LocationController.getLocation);

export const BookingRoutes = router;
