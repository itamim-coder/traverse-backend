import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { HotelRoutes } from '../modules/hotel/hotel.route';
import { RoomRoutes } from '../modules/room/room.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/hotel',
    route: HotelRoutes
  },
  {
    path: '/room',
    route: RoomRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
