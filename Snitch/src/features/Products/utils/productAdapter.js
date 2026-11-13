export const adaptProduct = (product) => {
  const rawImages = product.images || [];
  const imageUrls = rawImages.map((img) => img?.url || img).filter(Boolean);
  return ({
    id: product._id,
    title: product.title,
    subtitle: product.description || '',
    image: imageUrls[0] || null,
    images: imageUrls,
    price: product.price?.amount || 0,
    originalPrice: null,
    rating: null,
    reviews: null,
    badge: null,
    discount: null,
    counter: `1/${imageUrls.length || 1}`,
    swatches: [],
    extraSwatchesCount: 0,
    createdAt: product.createdAt || product.created_at || null,
    category: product.category || [],
    variants: product.variants || []
  });
};