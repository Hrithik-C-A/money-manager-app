import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createManagingMonthYearAndAmount, createFinancialData, updateFinancialData } from '../controllers/dataController.js';

const router = express.Router();

router.post('/create', normalUsers, createManagingMonthYearAndAmount);
router.post('/:id/create', normalUsers, createFinancialData);
router.put('/:id/update', normalUsers, updateFinancialData);

export default router;