import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createFinancialData } from '../controllers/dataController.js';

const router = express.Router();

router.post('/create', normalUsers, createFinancialData);

export default router;