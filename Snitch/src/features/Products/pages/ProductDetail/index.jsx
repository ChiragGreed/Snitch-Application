import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductDetailScreen from '@/features/Products/components/ProductDetail';
import useProducts from '@/features/Products/hooks/useProducts';
import { SnitchColors } from '@/constants/snitch-theme';
import { useSelector } from 'react-redux';
import useCart from '@/features/Cart/hooks/useCart';
import useWishList from '@/features/Wishlist/hooks/useWishList';
import Toast from '@/shared/components/Toast';
import ScreenLoader from '@/shared/components/ScreenLoader';
import ErrorState from '@/shared/components/ErrorState';

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { getProductHandler } = useProducts();
  const { addToCartHandler } = useCart();
  const { isInList, toggleListHandler } = useWishList();

  const product = useSelector((state) => state.products.Product);
  const productDetails = useSelector((state) => state.products.productDetails);
  const user = useSelector((state) => state.auth.User);
  const [toastEvent, setToastEvent] = useState({ id: 0, message: null, type: 'default' });

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      await getProductHandler(productId);
    };
    fetchProduct();
  }, [getProductHandler, productId]);

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

  const handleBuyNow = useCallback(async (p, variant) => {
    if (!user) {
      showToast('Please sign in to continue with Buy Now.', 'warning');
      return;
    }

    try {
      const added = await addToCartHandler(p, variant);
      if (added) showToast('Buy Now is unavailable. Item added to your bag.', 'success');
    } catch {
      showToast('Unable to add to bag. Please try again.', 'warning');
    }
  }, [addToCartHandler, showToast, user]);

  if (!productId) {
    return <ErrorState title="Product not found" message="This product is unavailable." />;
  }

  const isCurrentProduct = productDetails.productId === productId;
  if (!isCurrentProduct || productDetails.loading) {
    return <ScreenLoader message="Loading product..." containerStyle={styles.centered} />;
  }

  if (productDetails.error || !product) {
    return (
      <ErrorState
        title="Unable to load product"
        message={productDetails.error || 'This product is unavailable.'}
        onRetry={() => getProductHandler(productId)}
        containerStyle={styles.centered}
      />
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
    backgroundColor: SnitchColors.canvas,
  },
  centered: {
    backgroundColor: SnitchColors.canvas,
  },
});
