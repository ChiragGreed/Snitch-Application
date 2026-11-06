import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        Product: null,
        AllProducts: [],
        SellerProducts: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        productsFetchStarted: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        setAllProducts: (state, action) => {
            state.AllProducts = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        setProductsError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        setProduct: (state, action) => {
            state.Product = action.payload;
        },
        setSellerProducts: (state, action) => {
            state.SellerProducts = action.payload;
        },
    }
})

export const {
    productsFetchStarted,
    setAllProducts,
    setProductsError,
    setProduct,
    setSellerProducts,
} = productSlice.actions;
export default productSlice.reducer;