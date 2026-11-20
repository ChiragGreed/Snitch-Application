import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import RazorpayCheckout from 'react-native-razorpay';

import useAuth from '@/features/Authentication/hooks/useAuth';
import { clearCart } from '@/features/Cart/states/cartSlice';

import { createPaymentOrderApi, verifyPaymentApi, createOrderApi } from '@/features/Checkout/services/checkoutApi';

export default function useCheckout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { protectedRouteHandler } = useAuth();

    const User = useSelector((state) => state.auth.User);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const total = useSelector((state) => state.cart.total);
    const currency = useSelector((state) => state.cart.currency);

    const [loading, setLoading] = useState(false);

    const items = Array.isArray(cartItems)
        ? cartItems
        : Array.isArray(cartItems?.items)
            ? cartItems.items
            : [];


    const checkoutHandler = useCallback(async () => {
        if (loading) return;

        if (!total || total <= 0) {
            Alert.alert('Invalid amount', 'Your cart total is invalid.');
            return;
        }

        try {
            setLoading(true);

            const isLoggedIn = await protectedRouteHandler();
            if (!isLoggedIn) {
                router.replace({ pathname: '/auth/login', params: { returnTo: '/checkout' } });
                return;
            }

            // 1. Create Razorpay order on backend
            const paymentResponse = await createPaymentOrderApi();
            console.log('PAYMENT API RESPONSE:', paymentResponse);

            if (
                !paymentResponse?.success ||
                !paymentResponse?.key ||
                !paymentResponse?.order?.id
            ) {
                throw new Error(
                    paymentResponse?.message || 'Unable to create payment order'
                );
            }

            const razorpayKey = paymentResponse.key;
            const razorpayOrder = paymentResponse.order;

            // 2. Open native Razorpay checkout
            const paymentResult = await RazorpayCheckout.open({
                key: razorpayKey,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'Snitch',
                description: 'Order payment',
                order_id: razorpayOrder.id,
                prefill: {
                    name: User?.fullname || User?.name || '',
                    email: User?.email || '',
                    contact: User?.phone || User?.contact || '',
                },
                theme: {
                    color: '#000000',
                },
            });

            // 3. Verify payment on backend
            const verificationResponse = await verifyPaymentApi({
                razorpay_order_id: paymentResult.razorpay_order_id,
                razorpay_payment_id: paymentResult.razorpay_payment_id,
                razorpay_signature: paymentResult.razorpay_signature,
            });

            if (!verificationResponse?.success) {
                throw new Error(
                    verificationResponse?.message || 'Payment verification failed'
                );
            }

            // 4. Create order using verified payment's cartId
            const cartId = verificationResponse.cartId;

            if (!cartId) {
                throw new Error('Payment verified, but cart ID was not returned.');
            }

            const orderResponse = await createOrderApi(cartId);

            if (!orderResponse?.success) {
                throw new Error(
                    orderResponse?.message || 'Unable to create your order'
                );
            }

            // 5. Clear local cart
            dispatch(clearCart());

            router.replace('/orders/orderConfirmation');

        } catch (error) {
            console.log('Checkout error:', error?.response?.data || error?.message || error);

            const message =
                error?.response?.data?.message ||
                error?.description ||
                error?.message ||
                'Something went wrong during checkout.';

            Alert.alert('Checkout failed', message);

        } finally {
            setLoading(false);
        }
    }, [User, total, loading, dispatch, router, protectedRouteHandler]);


    return { items, total, currency, loading, checkoutHandler };
}