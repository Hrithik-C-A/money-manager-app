import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createManagingMonthYearAndAmount, createFinancialData } from '../controllers/dataController.js';

const router = express.Router();

router.post('/create', normalUsers, createManagingMonthYearAndAmount);
router.post('/:id/create', normalUsers, createFinancialData);

export default router;