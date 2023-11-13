import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createManagingMonthYearAndAmount } from '../controllers/dataController.js';

const router = express.Router();

router.post('/create', normalUsers, createManagingMonthYearAndAmount);

export default router;