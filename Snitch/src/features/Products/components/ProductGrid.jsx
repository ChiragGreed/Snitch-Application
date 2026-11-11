import React from 'react';
import { View, Text } from 'react-native';
import ProductCard from './ProductCard';
import { styles } from '@/features/Products/styles/productStyles';

const getProductId = (product) => product?.id ?? product?._id;

export default function ProductGrid({
  products = [],
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  sortOptions,
  sortIndex,
  onNextSort,
}) {
  return (
    <>
      <View style={styles.productGrid}>
        {products.map((product) => {
          const productId = getProductId(product);
          const isWishlisted = Array.isArray(wishlist) && wishlist.some((item) => {
            const wishlistItemId = getProductId(item);
            return productId != null && wishlistItemId != null &&
              String(wishlistItemId) === String(productId);
          });

          return (
            <ProductCard
              key={productId}
              product={product}
              isWishlisted={isWishlisted}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          );
        })}
      </View>
    </>
  );
}