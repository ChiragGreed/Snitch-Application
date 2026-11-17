import axios from 'axios';

const api = axios.create({
    baseURL: 'https://snitch-ecommerce.onrender.com/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createPaymentOrderApi = async () => {
    const response = await api.post('/cart/order/payment');
    return response.data;
};

// Verify the payment signature on the backend.
export const verifyPaymentApi = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await api.post('/cart/order/payment/verify', { razorpay_order_id, razorpay_payment_id, razorpay_signature });
    return response.data;
};

export const createOrderApi = async (cartId) => {
    const response = await api.post('/order/createOrder', { cartId });

    return response.data;
};
