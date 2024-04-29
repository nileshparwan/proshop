import express from 'express';
import {
    createProduct,
    createProductReview,
    deleteProduct,
    getProductById,
    getProducts,
    getTopProduct,
    updateProduct
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProduct)

router.route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;