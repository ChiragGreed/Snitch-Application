import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/Products/states/productSlice.js';


export const reduxStore = configureStore({
    reducer: {
        products: productReducer,
    }
});
