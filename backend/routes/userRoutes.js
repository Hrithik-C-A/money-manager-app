import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { login, register, logout } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);

export default router;