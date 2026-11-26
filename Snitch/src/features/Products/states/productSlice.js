import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        Product: null,
        AllProducts: [],
        SellerProducts: [],
        status: 'idle',
        error: null,
        productsRequestId: null,
        Categories: [],
        categoriesStatus: 'idle',
        categoriesError: null,
        categoriesRequestId: null,
        productDetails: {
            productId: null,
            requestId: null,
            loading: false,
            error: null,
        },
    },
    reducers: {
        productsFetchStarted: (state, action) => {
            state.status = 'loading';
            state.error = null;
            state.productsRequestId = action.payload;
        },
        setAllProducts: (state, action) => {
            if (state.productsRequestId !== action.payload.requestId) return;
            state.AllProducts = action.payload.products;
            state.status = 'succeeded';
            state.error = null;
        },
        setProductsError: (state, action) => {
            if (state.productsRequestId !== action.payload.requestId) return;
            state.status = 'failed';
            state.error = action.payload.error;
        },
        setProduct: (state, action) => {
            state.Product = action.payload;
        },
        categoriesFetchStarted: (state, action) => {
            state.categoriesStatus = 'loading';
            state.categoriesError = null;
            state.categoriesRequestId = action.payload;
        },
        categoriesFetchSucceeded: (state, action) => {
            if (state.categoriesRequestId !== action.payload.requestId) return;
            state.Categories = action.payload.categories;
            state.categoriesStatus = 'succeeded';
            state.categoriesError = null;
        },
        categoriesFetchFailed: (state, action) => {
            if (state.categoriesRequestId !== action.payload.requestId) return;
            state.categoriesStatus = 'failed';
            state.categoriesError = action.payload.error;
        },
        productDetailFetchStarted: (state, action) => {
            const { productId, requestId } = action.payload;
            state.Product = null;
            state.productDetails = {
                productId,
                requestId,
                loading: true,
                error: null,
            };
        },
        productDetailFetchSucceeded: (state, action) => {
            const { requestId, product } = action.payload;
            if (state.productDetails.requestId !== requestId) return;
            state.Product = product;
            state.productDetails.loading = false;
            state.productDetails.error = null;
        },
        productDetailFetchFailed: (state, action) => {
            const { requestId, error } = action.payload;
            if (state.productDetails.requestId !== requestId) return;
            state.productDetails.loading = false;
            state.productDetails.error = error;
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
    categoriesFetchStarted,
    categoriesFetchSucceeded,
    categoriesFetchFailed,
    productDetailFetchStarted,
    productDetailFetchSucceeded,
    productDetailFetchFailed,
} = productSlice.actions;
export default productSlice.reducer;