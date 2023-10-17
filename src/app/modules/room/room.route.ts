import express from 'express';



import { roomController } from './room.controller';

const router = express.Router();

router.post('/create-room', roomController.createRoom);
router.post('/add-room', roomController.addRoom);
router.get('/get-room', roomController.getRooms);

export const RoomRoutes = router;
