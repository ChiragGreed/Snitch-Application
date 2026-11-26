import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import SnitchHeader from '@/shared/components/SnitchHeader';
import CartItemCard from '@/features/Cart/components/CartItemCard';
import CartShippingTracker from '@/features/Cart/components/CartShippingTracker';
import CartOrderSummary from '@/features/Cart/components/CartOrderSummary';
import CartTrustBadges from '@/features/Cart/components/CartTrustBadges';
import CartStickyFooter from '@/features/Cart/components/CartStickyFooter';

import useCart from '@/features/Cart/hooks/useCart';
import useWishList from '@/features/Wishlist/hooks/useWishList';

import Toast from '@/shared/components/Toast';
import ScreenLoader from '@/shared/components/ScreenLoader';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Cart/styles/cartStyles';

const FREE_SHIPPING_THRESHOLD = 3196;

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { getCartItemsHandler, incrementCartItemHandler, decrementCartItemHandler, removeCartItemHandler, clearCartHandler } = useCart();
  const { addToListHandler } = useWishList();

  // Read exclusively from Redux cart state
  const {
    cartItems,
    subtotal,
    total,
    currency = 'INR',
    fetchStatus,
    fetchError,
  } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.User);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('default');

  const triggerToast = useCallback((msg, type = 'default') => {
    setToastMessage(msg);
    setToastType(type);
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

  const isInitialFetch = Boolean(user) && fetchStatus === 'idle';
  const isLoadingWithoutItems =
    items.length === 0 && (isInitialFetch || fetchStatus === 'loading');
  const isErrorWithoutItems = items.length === 0 && fetchStatus === 'failed';

  useEffect(() => {
    getCartItemsHandler();
  }, [getCartItemsHandler]);

  const handleIncrement = useCallback((id) => {
    incrementCartItemHandler(id);
  }, [incrementCartItemHandler]);

  const handleDecrement = useCallback(
    (id) => {
      decrementCartItemHandler(id);
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
    items.forEach((item) => addToListHandler(item.productId));
    clearCartHandler();
    triggerToast('Added to wishlist', 'success');
  }, [addToListHandler, clearCartHandler, items, triggerToast]);

  const handleProceedToCheckout = useCallback(() => {
    if (items.length === 0) {
      triggerToast('Your shopping bag is empty');
      return;
    }
    triggerToast('Proceeding to Secure Checkout...');
    router.push('/checkout')
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
      <Toast message={toastMessage} type={toastType} top={insets.top + 50} />

      {/* Header */}
      <SnitchHeader
        title="Cart"
        onToast={triggerToast}
        onSearch={() => router.push('/explore')}
        onNotifications={() => triggerToast('No new notifications')}
        onProfile={() => router.push('/profile')}
      />

      {isLoadingWithoutItems ? (
        <ScreenLoader message="Loading your bag..." />
      ) : isErrorWithoutItems ? (
        <ErrorState
          title="Unable to load your bag"
          message={fetchError}
          onRetry={getCartItemsHandler}
        />
      ) : items.length === 0 ? (
        /* Empty Cart State */
        <EmptyState
          icon="shopping_bag"
          iconColor={SnitchColors.textMuted}
          title="Your Shopping Bag is Empty"
          description="Explore our latest editorial drops and elevate your contemporary wardrobe."
          actionLabel="EXPLORE DROPS"
          onAction={handleExploreMore}
          containerStyle={styles.emptyContainer}
          iconContainerStyle={styles.emptyIconContainer}
          titleStyle={styles.emptyTitle}
          descriptionStyle={styles.emptySubtitle}
          actionStyle={styles.exploreBtn}
          actionTextStyle={styles.exploreBtnText}
        />
      ) : (
        /* Active Cart Flow from Redux State */
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {fetchStatus === 'loading' ? (
            <ScreenLoader
              message="Refreshing your bag..."
              containerStyle={{ flex: 0, paddingVertical: 12 }}
            />
          ) : fetchStatus === 'failed' ? (
            <ErrorState
              title="Unable to refresh your bag"
              message={fetchError}
              onRetry={getCartItemsHandler}
              containerStyle={{ flex: 0, paddingVertical: 12 }}
            />
          ) : null}

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

          </View>

          <View style={styles.cartActions}>
            <Pressable
              accessibilityRole="button"
              style={styles.moveWishlistButton}
              onPress={handleMoveAllToWishlist}
            >
              <Text style={styles.moveWishlistText}>Move all to Wishlist</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear all items from cart"
              style={styles.clearCartButton}
              onPress={clearCartHandler}
            >
              <Text style={styles.clearCartText}>CLEAR CART</Text>
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
