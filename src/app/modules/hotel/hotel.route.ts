import express from 'express';

import { hotelController } from './hotel.controller';
import validateRequest from '../../middlewares/validateRequest';
import { hotelValidation } from './hotel.validation';

const router = express.Router();
router.get('/total-hotels', hotelController.getTotalHotels);
router.get('/:id', hotelController.getHotelRooms);
router.post('', hotelController.createHotel);
router.get('', hotelController.getHotels);
router.delete('/:id', hotelController.deleteHotel);

export const HotelRoutes = router;
