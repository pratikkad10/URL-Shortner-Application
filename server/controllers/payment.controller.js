import { razorpayInstance as razorpay } from '../config/razorpay.config.js';
import crypto from 'crypto';
import { updateUser } from '../services/user.services.js';

// Create an Order
export const createOrder = async (req, res) => {
    try {
        if (!razorpay) {
            return res.status(500).json({ success: false, message: 'Razorpay keys not configured' });
        }

        const options = {
            amount: 199 * 100, // ₹199 in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };
        
        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
    }
};

// Verify the Payment
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update the user's tier in the database to 'pro' using the service
            const userId = req.user.id;
            
            await updateUser(userId, { 
                tier: 'pro', 
                updatedAt: new Date() 
            });

            res.status(200).json({ success: true, message: "Payment verified successfully. Welcome to Pro!" });
        } else {
            res.status(400).json({ success: false, message: "Invalid payment signature" });
        }
    } catch (error) {
        console.error("Verify Payment Error:", error);
        res.status(500).json({ success: false, message: 'Payment verification failed', error: error.message });
    }
};
