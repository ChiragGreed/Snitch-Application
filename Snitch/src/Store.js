import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/Products/states/productSlice.js';
import cartReducer from './features/Cart/states/cartSlice.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = { key: "cart", storage: AsyncStorage };

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const reduxStore = configureStore({
    reducer: {
        products: productReducer,
        cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(reduxStore);
