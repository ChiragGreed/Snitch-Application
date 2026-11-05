const API_BASE_URL = 'https://snitch-ecommerce.onrender.com';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Unable to fetch products');
  }
  
  return data.products;
};