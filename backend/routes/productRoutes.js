import express from 'express';
import {
    getProductById,
    getProducts,
    updateProduct
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct);

export default router;