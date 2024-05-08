import { TourPackageController } from './tourPackage.controller';
import express from 'express';

const router = express.Router();

router.post('/create-tour', TourPackageController.createPackage);
router.get('/', TourPackageController.getTours);
router.get('/available', TourPackageController.getAvailableTours);
router.get('/upcoming', TourPackageController.getUpcomingTours);
router.get('/:id', TourPackageController.getSingleTour);
router.delete('/:id', TourPackageController.deleteTour);
router.patch('/:id', TourPackageController.updateTour);

export const TourRoutes = router;
