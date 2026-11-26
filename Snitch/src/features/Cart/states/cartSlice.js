import { createSlice } from "@reduxjs/toolkit";

const getItemPrice = (item) => {
    if (typeof item.unitPrice === 'number') return item.unitPrice;

    const product = item.productId;
    if (!product || typeof product !== 'object') return 0;

    const variant = product.variants;
    if (
        variant &&
        variant._id === item.variantId &&
        variant.price &&
        typeof variant.price.amount === 'number'
    ) {
        return variant.price.amount;
    }

    if (product.price && typeof product.price.amount === 'number') {
        return product.price.amount;
    }

    return 0;
};

const getProductId = (product) => {
    if (typeof product === 'string') return product;
    if (!product) return null;
    if (product._id) return product._id;
    return product.id;
};

const applyCart = (state, cartResponse) => {
    const cart = cartResponse?.cart;
    state.cartItems = cart?.items;
    state.subtotal = cart?.totalPrice.amount;
    state.total = cart?.totalPrice.amount;
    state.currency = cart?.totalPrice.currency;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        subtotal: 0,
        total: 0,
        currency: 'INR',
        fetchStatus: 'idle',
        fetchError: null,
        fetchRequestId: null,
    },
    reducers: {
        setcartItems: (state, action) => {
            applyCart(state, action.payload);
            if (state.fetchStatus === 'failed') {
                state.fetchStatus = 'succeeded';
                state.fetchError = null;
            }
        },
        cartFetchStarted: (state, action) => {
            state.fetchStatus = 'loading';
            state.fetchError = null;
            state.fetchRequestId = action.payload;
        },
        cartFetchSucceeded: (state, action) => {
            if (state.fetchRequestId !== action.payload.requestId) return;
            applyCart(state, action.payload.cartResponse);
            state.fetchStatus = 'succeeded';
            state.fetchError = null;
        },
        cartFetchFailed: (state, action) => {
            if (state.fetchRequestId !== action.payload.requestId) return;
            state.fetchStatus = 'failed';
            state.fetchError = action.payload.error;
        },

        setSubtotal: (state, action) => {
            state.subtotal = action.payload;
        },
        settotal: (state, action) => {
            state.total = action.payload;
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        addItemQuantity: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) item.quantity += 1;
        },
        addSubtotal: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) state.subtotal += getItemPrice(item);
        },
        addtotal: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) state.total += getItemPrice(item);
        },
        subItemQuantity: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) item.quantity = Math.max(1, item.quantity - 1);
        },
        subtractSubtotal: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) state.subtotal = Math.max(0, state.subtotal - getItemPrice(item));
        },
        subtractTotal: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) state.total = Math.max(0, state.total - getItemPrice(item));
        },
        removeCartItem: (state, action) => {
            const target = state.cartItems.find((item) => item._id === action.payload);
            if (target) {
                const itemTotal = getItemPrice(target) * target.quantity;
                state.subtotal = Math.max(0, state.subtotal - itemTotal);
                state.total = Math.max(0, state.total - itemTotal);
            }
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            const newProductId = getProductId(newItem.productId);
            const existingIndex = newProductId
                ? state.cartItems.findIndex((item) =>
                    getProductId(item.productId) === newProductId &&
                    item.variantId === newItem.variantId
                )
                : -1;
            const quantity = typeof newItem.quantity === 'number' ? newItem.quantity : 1;

            if (existingIndex >= 0) {
                state.cartItems[existingIndex].quantity += quantity;
            } else {
                state.cartItems.push({ ...newItem, quantity });
            }
            const itemPrice = getItemPrice(newItem) * quantity;
            state.subtotal += itemPrice;
            state.total += itemPrice;
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.subtotal = 0;
            state.total = 0;
            if (state.fetchStatus === 'failed') {
                state.fetchStatus = 'succeeded';
                state.fetchError = null;
            }
        },
    }
});

export const {
    setcartItems,
    cartFetchStarted,
    cartFetchSucceeded,
    cartFetchFailed,
    setSubtotal,
    settotal,
    setCurrency,
    addItemQuantity,
    addtotal,
    addSubtotal,
    subItemQuantity,
    subtractSubtotal,
    subtractTotal,
    removeCartItem,
    addToCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
