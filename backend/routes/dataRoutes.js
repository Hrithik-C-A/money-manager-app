import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createFinancialData, updateFinancialData, deleteFinancialData, getFinancialData, getFinancialDataById, createCategory, updateCategory, deleteCategory, updateSubCategory } from '../controllers/dataController.js';

const router = express.Router();

router.get('/', normalUsers, getFinancialData);

router.route('/:id').get(normalUsers, getFinancialDataById).post(normalUsers, createFinancialData).put(normalUsers, updateFinancialData).delete(normalUsers, deleteFinancialData);

router.route('/category/:id').post(normalUsers, createCategory).put(normalUsers, updateCategory).delete(normalUsers, deleteCategory);

router.route('/subcategory/:id').put(normalUsers, updateSubCategory);

export default router;