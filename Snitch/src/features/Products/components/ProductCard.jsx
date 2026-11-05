import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/homeStyles';

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productImageWrapper}>
        <Image source={{ uri: product.image }} style={StyleSheet.absoluteFillObject} contentFit="cover" />
        {product.badge ? <View style={[styles.productBadge, product.badgeType === 'primary' && styles.productBadgePrimary, product.badgeType === 'neutral' && styles.productBadgeNeutral, product.badgeType === 'premium' && styles.productBadgePremium]}><Text style={[styles.productBadgeText, product.badgeType === 'primary' && styles.productBadgeTextPrimary]}>{product.badge}</Text></View> : null}
        <View style={styles.counterBadge}><Text style={styles.counterBadgeText}>{product.counter}</Text></View>
        <Pressable style={styles.wishlistButton} onPress={() => onToggleWishlist(product.id, product.title)} accessibilityLabel="Wishlist"><SnitchIcon name={isWishlisted ? 'favorite' : 'favorite_border'} size={16} color={isWishlisted ? SnitchColors.error : SnitchColors.textPrimary} /></Pressable>
        <Pressable style={styles.quickAddButton} onPress={() => onAddToCart(product)} accessibilityLabel={`Add ${product.title} to bag`}><SnitchIcon name="shopping_bag" size={17} color={SnitchColors.textPrimary} /></Pressable>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.swatchesRow}>{product.swatches.map((color, index) => <View key={`${product.id}-swatch-${index}`} style={[styles.colorSwatch, { backgroundColor: color }]} />)}{product.extraSwatchesCount ? <Text style={styles.extraSwatchesText}>+{product.extraSwatchesCount}</Text> : null}</View>
        <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.productSubtitle} numberOfLines={1}>{product.subtitle}</Text>
        <View style={styles.ratingRow}><SnitchIcon name="star" size={13} color={SnitchColors.ratingStar} /><Text style={styles.ratingNumber}>{product.rating}</Text><Text style={styles.ratingCount}>({product.reviews})</Text></View>
        <View style={styles.priceRow}><View style={styles.priceContainer}><Text style={styles.currentPrice}>₹{product.price.toLocaleString()}</Text>{product.originalPrice ? <Text style={styles.strikePrice}>₹{product.originalPrice.toLocaleString()}</Text> : null}</View>{product.discount ? <Text style={[styles.discountText, product.discount === 'PREMIUM' && styles.premiumDiscountText]}>{product.discount}</Text> : null}</View>
      </View>
    </View>
  );
}
