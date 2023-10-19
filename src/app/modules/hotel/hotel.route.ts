import express from 'express';

import { hotelController } from './hotel.controller';
import validateRequest from '../../middlewares/validateRequest';
import { hotelValidation } from './hotel.validation';

const router = express.Router();
router.get('/:id', hotelController.getHotelRooms);
router.post('/create-hotel', hotelController.createHotel);
router.post('/image', hotelController.createImage);
router.get('', hotelController.getHotels);

export const HotelRoutes = router;
