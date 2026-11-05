import React from 'react';
import { View, Text } from 'react-native';
import ProductCard from './ProductCard';
import { styles } from '@/shared/styles/homeStyles';

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
      <View style={styles.productGridHeader}>
        <Text style={styles.productCount}>
          {products.length} PRODUCTS
        </Text>
      </View>

      <View style={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={Array.isArray(wishlist) && wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </View>
    </>
  );
}