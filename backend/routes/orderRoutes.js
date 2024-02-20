import express from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').get(protect, updateOrderToPaid);
router.route('/:id/deliver').get(protect, updateOrderToDelivered);

export default router;