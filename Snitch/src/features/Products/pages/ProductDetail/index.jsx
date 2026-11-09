import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductDetailScreen from '@/features/Products/components/ProductDetail';
import useProducts from '@/features/Products/hooks/useProducts';
import { SnitchColors } from '@/constants/snitch-theme';
import { useSelector } from 'react-redux';

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const { getProductHandler } = useProducts();

  const product = useSelector((state) => state.products.Product);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      getProductHandler(id)
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
    finally {
      setLoading(false);
      console.log('Product :', product) 
    }

  }, [id]);

  const handleToggleWishlist = useCallback(() => {
    setIsWishlisted((prev) => !prev);
  }, []);``

  const handleAddToCart = useCallback((p) => {
    // Placeholder — integrate with global cart state later
    console.log('Add to cart:', p?.id);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={SnitchColors.textPrimary} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Product not found.'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ProductDetailScreen
        product={product}
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SnitchColors.canvas,
  },
  errorText: {
    fontSize: 14,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
});
