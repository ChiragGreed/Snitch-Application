import { createSlice } from "@reduxjs/toolkit"

const addressSlice = createSlice({
    name: "address",
    initialState: {
        myAddresses: [],
        selectedAddress: null,
        defaultAddressId: null,
        Loading: false,
        Error: null
    },

    reducers: {
        setAddress: (state, action) => {
            state.myAddresses = action.payload;
            const hasDefaultAddress = action.payload.some(
                (savedAddress) => savedAddress?._id === state.defaultAddressId
            );
            if (!hasDefaultAddress) {
                state.defaultAddressId = action.payload[0]?._id || null;
            }
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        setDefaultAddressId: (state, action) => {
            state.defaultAddressId = action.payload;
        },
        setLoading: (state, action) => {
            state.Loading = action.payload;
        },
        setError: (state, action) => {
            state.Error = action.payload;
        }
    }
})

export const {
    setAddress,
    setSelectedAddress,
    setDefaultAddressId,
    setLoading,
    setError,
} = addressSlice.actions;
export default addressSlice.reducer;