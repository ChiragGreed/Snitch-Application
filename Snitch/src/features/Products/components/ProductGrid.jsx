import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import ProductCard from './ProductCard';
import { styles } from '@/shared/styles/homeStyles';

export default function ProductGrid({ products, sortOptions, sortIndex, onNextSort, wishlist, onToggleWishlist, onAddToCart }) {
  return (
    <>
      <View style={styles.feedHeader}>
        <View style={styles.feedHeaderLeft}><Text style={styles.feedTitle}>Curated Drops</Text><View style={styles.itemsBadge}><Text style={styles.itemsBadgeText}>{products.length} items</Text></View></View>
        <Pressable style={styles.sortButton} onPress={onNextSort}><Text style={styles.sortLabel}>Sort:</Text><Text style={styles.sortValue}>{sortOptions[sortIndex]}</Text><SnitchIcon name="expand_more" size={16} color={SnitchColors.textPrimary} /></Pressable>
      </View>
      <View style={styles.productGrid}>
        {products.map((product) => <ProductCard key={product.id} product={product} isWishlisted={!!wishlist[product.id]} onToggleWishlist={onToggleWishlist} onAddToCart={onAddToCart} />)}
      </View>
    </>
  );
}
