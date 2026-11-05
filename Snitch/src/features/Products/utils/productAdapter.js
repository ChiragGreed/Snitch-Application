export const adaptProduct = (product) => {
  console.log('RAW images field:', JSON.stringify(product.images));
  return ({
  id: product._id,
  title: product.title,
  subtitle: product.description || '',
  image: product.images?.[0]?.url || product.images?.[0] || null,
  price: product.price?.amount || 0,
  originalPrice: null,
  rating: null,
  reviews: null,
  badge: null,
  discount: null,
  counter: `1/${product.images?.length || 1}`,
  swatches: [],
  extraSwatchesCount: 0,
  category: product.category || [],
});
};