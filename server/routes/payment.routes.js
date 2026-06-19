import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import { ensureAuthMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Both routes are protected because only logged-in users can upgrade
router.post('/create-order', ensureAuthMiddleware, createOrder);
router.post('/verify', ensureAuthMiddleware, verifyPayment);

export default router;
