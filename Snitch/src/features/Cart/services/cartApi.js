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

export const addItemQuantityApi = async (itemId) => {
    await api.post('/addItemQuantity', { itemId });
}

export const subItemQuantityApi = async (itemId) => {
    await api.post('/subItemQuantity', { itemId });
}

export const removeItemApi = async (itemId) => {
    await api.post('/removeItem', { itemId });
}

export const clearCartApi = async () => {
    await api.delete('/clear');
}

export const migrateGuestCartApi = async (items) => {
    const response = await api.post('/migrate', { items });
    return response.data;
}