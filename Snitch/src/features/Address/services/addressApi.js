import axios from 'axios';

const api = axios.create({
    baseURL: 'https://snitch-ecommerce.onrender.com/api/address',
    withCredentials: true,
});

export const addAddressApi = async (address) => {
    const response = await api.post(`/myAddress`, { address: address });
    return response.data;
}

export const getMyAddressesApi = async () => {
    const response = await api.get('/myAddress');
    return response.data;
}

export const getAddressByIdApi = async (addressId) => {
    const response = await api.get(`/${encodeURIComponent(addressId)}`);
    return response.data;
}

export const updateAddressApi = async (addressId, address) => {
    const response = await api.put(`/${encodeURIComponent(addressId)}`, { address });
    return response.data;
}

export const removeAddressApi = async (addressId) => {
    const response = await api.delete(`/${encodeURIComponent(addressId)}`);
    return response.data;
}
