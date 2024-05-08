import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserController } from './user.controller';

const router = express.Router();
router.get('/', UserController.getUsers);
router.get('/admins', UserController.getAdmins);
router.get('/profile', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER), UserController.getProfile);
router.post('/create-admin', UserController.createAdmin);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoutes = router;
