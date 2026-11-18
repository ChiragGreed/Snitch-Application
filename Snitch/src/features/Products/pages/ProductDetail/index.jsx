import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductDetailScreen from '@/features/Products/components/ProductDetail';
import useProducts from '@/features/Products/hooks/useProducts';
import { SnitchColors } from '@/constants/snitch-theme';
import { useSelector } from 'react-redux';
import useCart from '@/features/Cart/hooks/useCart';
import useWishList from '@/features/Wishlist/hooks/useWishList';
import Toast from '@/shared/components/Toast';

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const { getProductHandler } = useProducts();
  const { addToCartHandler } = useCart();
  const { isInList, toggleListHandler } = useWishList();

  const product = useSelector((state) => state.products.Product);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastEvent, setToastEvent] = useState({ id: 0, message: null, type: 'default' });

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

  const showToast = useCallback((message, type = 'default') => {
    setToastEvent((current) => ({ id: current.id + 1, message, type }));
  }, []);

  const handleToggleWishlist = useCallback((wishlistProduct) => {
    const added = toggleListHandler(wishlistProduct);
    showToast(added ? 'Added to wishlist' : 'Removed from wishlist', added ? 'success' : 'default');
    return added;
  }, [showToast, toggleListHandler]);

  const handleAddToCart = useCallback(async (p, variant) => {
    try {
      const added = await addToCartHandler(p, variant);
      if (added) showToast('Added to bag', 'success');
    } catch {
      showToast('Unable to add to bag. Please try again.', 'warning');
    }
  }, [addToCartHandler, showToast]);

  const handleBuyNow = useCallback(() => {
    showToast('Please sign in to continue with Buy Now.', 'warning');
  }, [showToast]);

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
    <View style={styles.page}>
      <SafeAreaProvider>
        <ProductDetailScreen
          product={product}
          isWishlisted={isInList(product)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </SafeAreaProvider>
      <Toast
        key={toastEvent.id}
        message={toastEvent.message}
        type={toastEvent.type}
        top={60}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
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
