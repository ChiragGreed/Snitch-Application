import { createSlice } from "@reduxjs/toolkit";

const getSafePrice = (item) => {
    if (typeof item?.unitPrice === 'number') return item.unitPrice;
    if (typeof item?.price === 'number') return item.price;
    const p = item?.productId;
    if (typeof p?.variants?.price?.amount === 'number') return p.variants.price.amount;
    if (typeof p?.variants?.price === 'number') return p.variants.price;
    if (typeof p?.price?.amount === 'number') return p.price.amount;
    if (typeof p?.price === 'number') return p.price;
    return 0;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: null,
        subtotal: 0,
        total: 0,
        currency: 'INR'
    },
    reducers: {
        setcartItems: (state, action) => {
            state.cartItems = action.payload;
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
            state.cartItems?.items?.forEach((item) => {
                if (item._id == action.payload) {
                    item.quantity += 1;
                    return;
                }
            });
        },
        addSubtotal: (state, action) => {
            state.cartItems?.items?.forEach((item) => {
                if (item._id == action.payload) {
                    const price = getSafePrice(item);
                    state.subtotal += price;
                    return;
                }
            });
        },
        addtotal: (state, action) => {
            state.cartItems?.items?.forEach((item) => {
                if (item._id == action.payload) {
                    const price = getSafePrice(item);
                    state.total += price;
                    return;
                }
            });
        },
        subItemQuantity: (state, action) => {
            state.cartItems?.items?.forEach((item) => {
                if (item._id == action.payload) {
                    item.quantity = Math.max(1, item.quantity - 1);
                    return;
                }
            });
        },
        subtractSubtotal: (state, action) => {
            state.cartItems?.items?.forEach((item) => {
                if (item._id == action.payload) {
                    const price = getSafePrice(item);
                    state.subtotal = Math.max(0, state.subtotal - price);
                    return;
                }
            });
        },
        subtractTotal: (state, action) => {
            state.cartItems?.items?.forEach((item) => {
                if (item._id == action.payload) {
                    const price = getSafePrice(item);
                    state.total = Math.max(0, state.total - price);
                    return;
                }
            });
        },
        removeCartItem: (state, action) => {
            if (state.cartItems?.items) {
                const target = state.cartItems.items.find((item) => item._id === action.payload);
                if (target) {
                    const itemTotal = getSafePrice(target) * (target.quantity || 1);
                    state.subtotal = Math.max(0, state.subtotal - itemTotal);
                    state.total = Math.max(0, state.total - itemTotal);
                }
                state.cartItems.items = state.cartItems.items.filter(
                    (item) => item._id !== action.payload
                );
            }
        },
        addToCart: (state, action) => {
            if (!state.cartItems) {
                state.cartItems = { items: [] };
            } else if (!state.cartItems.items) {
                state.cartItems.items = [];
            }
            const newItem = action.payload;
            const existingIndex = state.cartItems.items.findIndex(
                (item) => {
                    const itemProductId = item.productId?._id || item.productId?.id;
                    const newProductId = newItem.productId?._id || newItem.productId?.id;
                    return itemProductId && itemProductId === newProductId &&
                        (item.variantId || null) === (newItem.variantId || null);
                }
            );
            if (existingIndex >= 0) {
                state.cartItems.items[existingIndex].quantity += newItem.quantity || 1;
            } else {
                state.cartItems.items.push(newItem);
            }
            const itemPrice = getSafePrice(newItem) * (newItem.quantity || 1);
            state.subtotal += itemPrice;
            state.total += itemPrice;
        },
        clearCart: (state) => {
            state.cartItems = { items: [] };
            state.subtotal = 0;
            state.total = 0;
        },
    }
});

export const {
    setcartItems,
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
