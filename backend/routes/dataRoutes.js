import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createFinancialData, deleteFinancialData, createCategory, updateCategory, deleteCategory } from '../controllers/dataController.js';

const router = express.Router();

router.post('/create', normalUsers, createFinancialData);
router.delete('/:id/delete', normalUsers, deleteFinancialData);
router.post('/:id/createcategory', normalUsers, createCategory);
router.put('/:id/updatecategory', normalUsers, updateCategory);
router.delete('/:id/deletecategory', normalUsers, deleteCategory);

export default router;