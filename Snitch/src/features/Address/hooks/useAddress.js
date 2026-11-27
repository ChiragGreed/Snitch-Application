import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setAddress,
    setDefaultAddressId,
    setError,
    setLoading,
    setSelectedAddress,
} from '@/features/Address/states/addressSlice';
import {
    addAddressApi,
    getAddressByIdApi,
    getMyAddressesApi,
    removeAddressApi,
    updateAddressApi,
} from '@/features/Address/services/addressApi';

export default function useAddress() {
    const dispatch = useDispatch();
    const myAddresses = useSelector((state) => state.address.myAddresses);
    const selectedAddress = useSelector((state) => state.address.selectedAddress);
    const defaultAddressId = useSelector((state) => state.address.defaultAddressId);
    const loading = useSelector((state) => state.address.Loading);
    const error = useSelector((state) => state.address.Error);

    const getMyAddressesHandler = useCallback(async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await getMyAddressesApi();
            if (!response?.success || !Array.isArray(response.addresses)) {
                throw new Error(response?.message || 'Unable to load your addresses.');
            }

            dispatch(setAddress(response.addresses));
            return response.addresses;
        } catch (requestError) {
            const message = requestError?.response?.data?.message
                || requestError?.message
                || 'Unable to load your addresses.';
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const getAddressByIdHandler = useCallback(async (addressId) => {
        if (!addressId) {
            throw new Error('An address ID is required.');
        }

        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await getAddressByIdApi(addressId);
            if (!response?.success || !response.address) {
                throw new Error(response?.message || 'Unable to load this address.');
            }

            dispatch(setSelectedAddress(response.address));
            return response.address;
        } catch (requestError) {
            const message = requestError?.response?.data?.message
                || requestError?.message
                || 'Unable to load this address.';
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const addAddressHandler = useCallback(async (address) => {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await addAddressApi(address);

            if (!response?.success || !response.address) {
                throw new Error(response?.message || 'Unable to save this address.');
            }

            dispatch(setAddress([...(Array.isArray(myAddresses) ? myAddresses : []), response.address]));
            return response;
        } catch (requestError) {
            const message = requestError?.response?.data?.message
                || requestError?.message
                || 'Unable to save this address.';
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, myAddresses]);

    const updateAddressHandler = useCallback(async (addressId, address) => {
        if (!addressId) {
            throw new Error('An address ID is required.');
        }

        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await updateAddressApi(addressId, address);
            if (!response?.success || !response.address) {
                throw new Error(response?.message || 'Unable to update this address.');
            }

            dispatch(setAddress((Array.isArray(myAddresses) ? myAddresses : []).map((savedAddress) => (
                savedAddress?._id === addressId ? response.address : savedAddress
            ))));
            if (selectedAddress?._id === addressId) {
                dispatch(setSelectedAddress(response.address));
            }
            return response;
        } catch (requestError) {
            const message = requestError?.response?.data?.message
                || requestError?.message
                || 'Unable to update this address.';
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, myAddresses, selectedAddress]);

    const removeAddressHandler = useCallback(async (addressId) => {
        if (!addressId) {
            throw new Error('An address ID is required.');
        }

        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await removeAddressApi(addressId);
            if (!response?.success) {
                throw new Error(response?.message || 'Unable to remove this address.');
            }

            const remainingAddresses = (Array.isArray(myAddresses) ? myAddresses : []).filter(
                (savedAddress) => savedAddress?._id !== addressId
            );
            dispatch(setAddress(remainingAddresses));
            if (selectedAddress?._id === addressId) {
                dispatch(setSelectedAddress(null));
            }
            return response;
        } catch (requestError) {
            const message = requestError?.response?.data?.message
                || requestError?.message
                || 'Unable to remove this address.';
            dispatch(setError(message));
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, myAddresses, selectedAddress]);

    const setDefaultAddressHandler = useCallback((addressId) => {
        if (!addressId) {
            throw new Error('An address ID is required.');
        }
        if (!Array.isArray(myAddresses) || !myAddresses.some((savedAddress) => savedAddress?._id === addressId)) {
            throw new Error('This address is no longer available.');
        }

        dispatch(setDefaultAddressId(addressId));
        return addressId;
    }, [dispatch, myAddresses]);

    return {
        myAddresses,
        selectedAddress,
        defaultAddressId,
        loading,
        error,
        addAddressHandler,
        updateAddressHandler,
        removeAddressHandler,
        setDefaultAddressHandler,
        getMyAddressesHandler,
        getAddressByIdHandler,
    };
}
