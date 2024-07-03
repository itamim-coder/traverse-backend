import express from 'express';

import { LocationController } from './location.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/', LocationController.createLocation);
router.get('/', LocationController.getLocation);
router.get('/hotels/:id', LocationController.getLocationBasedHotel);
router.get('/total-locations', LocationController.getTotalLocations);
router.delete('/:id', LocationController.deleteLocation);

export const LocationRoutes = router;
