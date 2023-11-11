import { TourRoutes } from './../modules/tourPackage/tourPackage.route';
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { HotelRoutes } from '../modules/hotel/hotel.route';
import { RoomRoutes } from '../modules/room/room.route';
import { UserRoutes } from '../modules/user/user.route';
import { LocationRoutes } from '../modules/location/location.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { OtpRoutes } from '../modules/otp/otp.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/user',
    route: UserRoutes
  },
  {
    path: '/hotel',
    route: HotelRoutes
  },
  {
    path: '/tour',
    route: TourRoutes
  },
  {
    path: '/location',
    route: LocationRoutes
  },
  {
    path: '/room',
    route: RoomRoutes
  },
  {
    path: '/booking',
    route: BookingRoutes
  },
  {
    path: '/otp',
    route: OtpRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
