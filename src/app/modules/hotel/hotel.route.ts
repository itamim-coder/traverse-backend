import express from 'express';

import { hotelController } from './hotel.controller';
import validateRequest from '../../middlewares/validateRequest';
import { hotelValidation } from './hotel.validation';

const router = express.Router();

router.post('/create-hotel', hotelController.createHotel);

export const HotelRoutes = router;
