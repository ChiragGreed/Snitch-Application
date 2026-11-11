import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/Products/states/productSlice.js';
import cartReducer from './features/Cart/states/cartSlice.js';
import wishListReducer from './features/Wishlist/states/wishListSlice.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = { key: "cart", storage: AsyncStorage };
const WishListPersistConfig = { key: "wishList", storage: AsyncStorage };

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishListReducer = persistReducer(WishListPersistConfig, wishListReducer);

export const reduxStore = configureStore({
    reducer: {
        products: productReducer,
        cart: persistedCartReducer,
        wishList: persistedWishListReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(reduxStore);
