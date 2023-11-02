import { TourPackageController } from './tourPackage.controller';
import express from 'express';

const router = express.Router();

router.post('/', TourPackageController.createPackage);
router.get('/', TourPackageController.getTours);
router.get('/available', TourPackageController.getAvailableTours);
router.get('/upcoming', TourPackageController.getUpcomingTours);
router.get('/:id', TourPackageController.getSingleTour);
// router.get('/hotels/:id', LocationController.getLocationBasedHotel);

export const TourRoutes = router;
