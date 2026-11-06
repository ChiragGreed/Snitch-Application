import axios from 'axios';

const api = axios.create({
  baseURL: 'https://snitch-ecommerce.onrender.com',
  withCredentials: true,
});

export const getProductsApi = async () => {
  const response = await api.get(`/api/products`);
  return response.data.products;
};

export const getProductApi = async ({ productId }) => {
  const response = await api.get(`/${productId}`);
  return response.data;
}