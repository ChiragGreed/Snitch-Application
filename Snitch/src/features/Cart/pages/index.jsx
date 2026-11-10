import React, { useMemo, useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import CartHeader from '@/features/Cart/components/CartHeader';
import CartItemCard from '@/features/Cart/components/CartItemCard';
import CartShippingTracker from '@/features/Cart/components/CartShippingTracker';
import CartOrderSummary from '@/features/Cart/components/CartOrderSummary';
import CartTrustBadges from '@/features/Cart/components/CartTrustBadges';
import CartStickyFooter from '@/features/Cart/components/CartStickyFooter';

import useCart from '@/features/Cart/hooks/useCart';

import Toast from '@/shared/components/Toast';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/cartStyles';

const FREE_SHIPPING_THRESHOLD = 3196;

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    incrementCartItemHandler,
    decrementCartItemHandler,
    removeCartItemHandler,
    clearCartHandler,
  } = useCart();

  // Read exclusively from Redux cart state
  const { cartItems, subtotal, total, currency = 'INR' } = useSelector((state) => state.cart);

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  // Extract items array strictly from Redux state
  const items = useMemo(() => {
    if (!cartItems) return [];
    if (Array.isArray(cartItems)) return cartItems;
    if (Array.isArray(cartItems.items)) return cartItems.items;
    return [];
  }, [cartItems]);

  // Compute total item count from Redux items
  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [items]);

  const handleIncrement = useCallback((id) => {
    incrementCartItemHandler(id);
  }, [incrementCartItemHandler]);

  const handleDecrement = useCallback(
    (id) => {
      const removed = decrementCartItemHandler(id);
      if (removed) {
        triggerToast('Item removed from bag');
      }
    },
    [decrementCartItemHandler, triggerToast]
  );

  const handleRemove = useCallback(
    (id) => {
      const removedItem = removeCartItemHandler(id);
      triggerToast(
        removedItem?.productId?.title || removedItem?.title
          ? `Removed "${removedItem?.productId?.title || removedItem?.title}"`
          : 'Item removed from bag'
      );
    },
    [removeCartItemHandler, triggerToast]
  );

  const handleMoveAllToWishlist = useCallback(() => {
    if (items.length === 0) return;
    clearCartHandler();
    triggerToast('All items moved to wishlist');
  }, [clearCartHandler, items.length, triggerToast]);

  const handleProceedToCheckout = useCallback(() => {
    if (items.length === 0) {
      triggerToast('Your shopping bag is empty');
      return;
    }
    triggerToast('Proceeding to Secure Checkout...');
  }, [items.length, triggerToast]);

  const handleNavigateProduct = useCallback(
    (productId) => {
      if (productId) {
        router.push(`/products/${productId}`);
      }
    },
    [router]
  );

  const handleExploreMore = useCallback(() => {
    router.push('/');
  }, [router]);

  // Active payable total
  const displayTotal = total > 0 ? total : subtotal;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Toast Notification */}
      <Toast message={toastMessage} top={insets.top + 50} />

      {/* Header */}
      <CartHeader
        onToast={triggerToast}
        onSearch={() => triggerToast('Search collection')}
        onProfile={() => router.push('/profile')}
      />

      {items.length === 0 ? (
        /* Empty Cart State */
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.emptyContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyIconContainer}>
            <SnitchIcon name="shopping_bag" size={38} color={SnitchColors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Your Shopping Bag is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Explore our latest editorial drops and elevate your contemporary wardrobe.
          </Text>
          <Pressable style={styles.exploreBtn} onPress={handleExploreMore}>
            <Text style={styles.exploreBtnText}>EXPLORE DROPS</Text>
          </Pressable>
        </ScrollView>
      ) : (
        /* Active Cart Flow from Redux State */
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title & Count Meta Indicator */}
          <View style={styles.titleSection}>
            <View style={styles.titleLeft}>
              <Text style={styles.pageTitle}>Shopping Bag</Text>
              <View style={styles.itemCountBadge}>
                <Text style={styles.itemCountText}>
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.moveWishlistButton}
              onPress={handleMoveAllToWishlist}
            >
              <Text style={styles.moveWishlistText}>Move all to Wishlist</Text>
            </Pressable>
          </View>

          {/* Complimentary Shipping Progress Tracker */}
          <CartShippingTracker
            currentTotal={displayTotal}
            threshold={FREE_SHIPPING_THRESHOLD}
            currency={currency}
          />

          {/* Cart Line Items from Redux */}
          <View style={styles.itemsList}>
            {items.map((item) => (
              <CartItemCard
                key={item._id}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
                onPressProduct={handleNavigateProduct}
                currency={currency}
              />
            ))}
          </View>

          {/* Order Summary Card using Redux state */}
          <CartOrderSummary
            subtotal={subtotal}
            deliveryCharge={0}
            originalDeliveryCharge={150}
            totalPayable={displayTotal}
            currency={currency}
          />

          {/* Assurance & Trust Badges */}
          <CartTrustBadges />
        </ScrollView>
      )}

      {/* Persistent Sticky Bottom Checkout Sheet */}
      {items.length > 0 ? (
        <CartStickyFooter
          totalPayable={displayTotal}
          currency={currency}
          onProceed={handleProceedToCheckout}
        />
      ) : null}
    </View>
  );
}
