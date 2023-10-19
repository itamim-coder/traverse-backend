import express from 'express';

import { roomController } from './room.controller';

const router = express.Router();

router.post('/create-room', roomController.createRoom);
router.post('/add-room', roomController.addRoom);
router.get('/get-room', roomController.getRooms);
router.get('/:id', roomController.getSingleCategoryRoom);
router.get('/get-room-no', roomController.getSameRooms);
router.patch('/room-no/:id', roomController.updateRoomAvailability);

export const RoomRoutes = router;
