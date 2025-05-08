import express from 'express';
import { createPayment, getPayments, updatePaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

// Create new payment
router.post('/payment', createPayment);

// Get payments (with optional orderId filter)
router.get('/payments', getPayments);

// Update payment status
router.patch('/payments/:paymentId', updatePaymentStatus);

export default router;