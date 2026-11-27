import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Authentication/states/authSlice.js';
import productReducer from './features/Products/states/productSlice.js';
import cartReducer from './features/Cart/states/cartSlice.js';
import wishListReducer from './features/Wishlist/states/wishListSlice.js';
import customListsReducer from './features/Wishlist/states/customListsSlice.js';
import orderReducer from './features/Order/states/orderSlice.js';
import addressReducer from './features/Address/states/addressSlice.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = {
    key: "cart",
    storage: AsyncStorage,
    blacklist: ["fetchStatus", "fetchError", "fetchRequestId"],
};
const WishListPersistConfig = { key: "wishList", storage: AsyncStorage };
const customListsPersistConfig = { key: "customLists", storage: AsyncStorage };
const addressPersistConfig = {
    key: "address",
    storage: AsyncStorage,
    whitelist: ["defaultAddressId"],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishListReducer = persistReducer(WishListPersistConfig, wishListReducer);
const persistedCustomListsReducer = persistReducer(customListsPersistConfig, customListsReducer);
const persistedAddressReducer = persistReducer(addressPersistConfig, addressReducer);

export const reduxStore = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: persistedCartReducer,
        wishList: persistedWishListReducer,
        customLists: persistedCustomListsReducer,
        order: orderReducer,
        address: persistedAddressReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(reduxStore);
