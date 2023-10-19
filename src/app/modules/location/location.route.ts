import express from 'express';

import { LocationController } from './location.controller';

const router = express.Router();

router.post('/', LocationController.createLocation);
router.get('/', LocationController.getLocation);
router.get('/hotels/:id', LocationController.getLocationBasedHotel);

export const LocationRoutes = router;
