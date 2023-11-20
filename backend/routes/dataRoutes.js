import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createFinancialData, updateFinancialData, deleteFinancialData, getFinancialData, getFinancialDataById, createCategory, updateCategory, deleteCategory,createSubCategory, updateSubCategory } from '../controllers/dataController.js';

const router = express.Router();

// Financial data routes
router.get('/', normalUsers, getFinancialData);

router.route('/:id').get(normalUsers, getFinancialDataById).post(normalUsers, createFinancialData).put(normalUsers, updateFinancialData).delete(normalUsers, deleteFinancialData);

// Category routes
router.route('/category/:id').post(normalUsers, createCategory).put(normalUsers, updateCategory).delete(normalUsers, deleteCategory);

// SubCategory routes
router.route('/subcategory/:id').post(normalUsers, createSubCategory).put(normalUsers, updateSubCategory);

export default router;