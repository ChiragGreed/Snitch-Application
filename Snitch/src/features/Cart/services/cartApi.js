import axios from 'axios';

const api = axios.create({
    baseURL: 'https://snitch-ecommerce.onrender.com/api/cart',
    withCredentials: true,
});

export const addItemToCartApi = async (productId, variantId) => {
    const response = await api.post(`/add/${productId}/${variantId}`, { quantity: 1 });
    return response.data;
}

export const getCartItemsAPi = async () => {

    const response = await api.get('/items');
    return response.data;
}

export const migrateGuestCartApi = async (items) => {
    const response = await api.post('/migrate', { items });
    return response.data;
}