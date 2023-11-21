import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { login, register, logout, getAllUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/', normalUsers, adminUser, getAllUsers);
router.route('/:id').get(normalUsers, getUserById);

export default router;