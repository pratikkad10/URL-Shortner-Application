import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

export const razorpayInstance = process.env.RAZORPAY_KEY_ID ? new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
}) : null;
