import express from 'express';
import { normalUsers, adminUser } from '../middlewares/authMiddleware.js';
import { createFinancialData, deleteFinancialData, createCategory, updateSubCategory, deleteCategory } from '../controllers/dataController.js';

const router = express.Router();

router.post('/create', normalUsers, createFinancialData);
router.delete('/:id/delete', normalUsers, deleteFinancialData);
router.post('/:id/createcategory', normalUsers, createCategory);
router.delete('/:id/deletecategory', normalUsers, deleteCategory);
router.put('/:id/updatesubcategory', normalUsers, updateSubCategory);

export default router;