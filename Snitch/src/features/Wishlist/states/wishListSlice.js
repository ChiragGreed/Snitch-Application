import { createSlice } from "@reduxjs/toolkit";

const getItemId = (item) => {
    if (item == null) return null;
    const id = typeof item === 'object' ? item.id ?? item._id : item;
    return id == null ? null : String(id);
};

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        wishListItems: [],
        inStock: true
    },
    reducers: {
        setWishListItems: (state, action) => {
            state.wishListItems = Array.isArray(action.payload) ? action.payload : [];
        },
        addWishListItem: (state, action) => {
            const itemId = getItemId(action.payload);
            if (itemId == null) return;

            const exists = state.wishListItems.some(
                (item) => getItemId(item) === itemId
            );
            if (!exists) state.wishListItems.push(action.payload);
        },
        removeWishListItem: (state, action) => {
            const itemId = getItemId(action.payload);
            if (itemId == null) return;

            state.wishListItems = state.wishListItems.filter(
                (item) => getItemId(item) !== itemId
            );
        },
        setInStock: (state, action) => {
            state.inStock = action.payload;
        }
    }
});

export const { setWishListItems, addWishListItem, removeWishListItem, setInStock, } = wishListSlice.actions;

export default wishListSlice.reducer;
