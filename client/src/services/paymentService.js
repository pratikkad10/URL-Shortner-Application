import api from './api';

export const paymentService = {
    upgradeToPro: async (user, onSuccess, onError) => {
        try {
            // 1. Create order on the backend
            const orderRes = await api.post('/payment/create-order');
            
            if (!orderRes.data.success) {
                throw new Error('Failed to create order');
            }

            const order = orderRes.data.order;

            // 2. Open Razorpay Checkout Modal
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || '', // Public Key
                amount: order.amount,
                currency: order.currency,
                name: "LinkSnap",
                description: "Upgrade to Pro Plan",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 3. Verify Payment on Backend
                        const verifyRes = await api.post('/payment/verify', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            onSuccess("Payment successful! You are now on the Pro plan.");
                        } else {
                            onError("Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        onError("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    name: user.firstName ? `${user.firstName} ${user.lastName}` : "User",
                    email: user.email,
                },
                theme: {
                    color: "#004ccd"
                }
            };

            const rzp1 = new window.Razorpay(options);
            
            rzp1.on('payment.failed', function (response){
                onError("Payment failed. Please try again.");
            });

            rzp1.open();
            
        } catch (error) {
            console.error("Payment initiation error:", error);
            onError("Could not initiate payment. Please try again later.");
        }
    }
};
