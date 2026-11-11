import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SnitchIcon } from '@/components/snitch-icon';
import WishListItemCard from '../components/WishListItemCard';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import useCart from '@/features/Cart/hooks/useCart';
import SnitchHeader from '@/shared/components/SnitchHeader';
import useWishList from '@/features/Wishlist/hooks/useWishList';
import Toast from '@/shared/components/Toast';

const getProductId = (product) => product?.id ?? product?._id;

const isProductInStock = (product) => {
  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    return product.variants.some((variant) => Number(variant?.stock) > 0);
  }
  if (product?.stock != null) return Number(product.stock) > 0;
  return true;
};

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { wishListItems, removeFromListHandler } = useWishList();
  const { addToCartHandler } = useCart();
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('default');

  const availableItems = useMemo(
    () => wishListItems.filter(isProductInStock),
    [wishListItems]
  );
  const visibleItems = showInStockOnly ? availableItems : wishListItems;

  const triggerToast = useCallback((message, type = 'default') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  const handleRemove = useCallback((product) => {
    removeFromListHandler(product);
    triggerToast('Removed from wishlist');
  }, [removeFromListHandler, triggerToast]);

  const handleMoveToBag = useCallback((product) => {
    addToCartHandler(product);
    removeFromListHandler(product);
    triggerToast('Added to bag', 'success');
  }, [addToCartHandler, removeFromListHandler, triggerToast]);

  const handleMoveAllToBag = useCallback(() => {
    if (availableItems.length === 0) {
      triggerToast('No in-stock items to move');
      return;
    }

    availableItems.forEach((product) => {
      addToCartHandler(product);
      removeFromListHandler(product);
    });
    triggerToast('Added to bag', 'success');
  }, [addToCartHandler, availableItems, removeFromListHandler, triggerToast]);

  const handlePressProduct = useCallback((productId) => {
    if (productId != null) router.push(`/products/${productId}`);
  }, [router]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} type={toastType} top={insets.top + 50} />

      <SnitchHeader
        title="Wishlist"
        onToast={triggerToast}
        onSearch={() => router.push('/explore')}
        onNotifications={() => triggerToast('No new notifications')}
        onProfile={() => router.push('/profile')}
      />

      {wishListItems.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <SnitchIcon name="favorite_border" size={34} color={SnitchColors.secondaryMuted} />
          </View>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>
            Save the pieces you love and they will be waiting here.
          </Text>
          <Pressable style={styles.exploreButton} onPress={() => router.push('/')}>
            <Text style={styles.exploreButtonText}>EXPLORE COLLECTION</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.toolbar}>
            <View style={styles.filters}>
              <Pressable
                style={[styles.filterButton, !showInStockOnly && styles.filterButtonActive]}
                onPress={() => setShowInStockOnly(false)}
                accessibilityRole="button"
                accessibilityState={{ selected: !showInStockOnly }}
              >
                <Text style={[styles.filterText, !showInStockOnly && styles.filterTextActive]}>
                  All ({wishListItems.length})
                </Text>
              </Pressable>
              <Pressable
                style={[styles.filterButton, showInStockOnly && styles.filterButtonActive]}
                onPress={() => setShowInStockOnly(true)}
                accessibilityRole="button"
                accessibilityState={{ selected: showInStockOnly }}
              >
                <Text style={[styles.filterText, showInStockOnly && styles.filterTextActive]}>
                  In Stock ({availableItems.length})
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.moveAllButton, availableItems.length === 0 && styles.moveAllButtonDisabled]}
              onPress={handleMoveAllToBag}
              accessibilityRole="button"
              accessibilityLabel="Move all in-stock items to bag"
            >
              <SnitchIcon name="shopping_bag" size={16} color={SnitchColors.textPrimary} />
              <Text style={styles.moveAllText}>Move All</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + SnitchSpacing.md },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {visibleItems.length > 0 ? (
              visibleItems.map((product) => (
                <WishListItemCard
                  key={getProductId(product)}
                  product={product}
                  inStock={isProductInStock(product)}
                  onMoveToBag={handleMoveToBag}
                  onRemove={handleRemove}
                  onPressProduct={handlePressProduct}
                />
              ))
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsTitle}>Nothing in stock right now</Text>
                <Text style={styles.noResultsSubtitle}>
                  Your saved out-of-stock pieces will stay in your wishlist.
                </Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },
  toolbar: {
    minHeight: 64,
    paddingHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.sm,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },
  filterButton: {
    minHeight: 36,
    paddingHorizontal: SnitchSpacing.gutter,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: SnitchColors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: SnitchColors.textPrimary,
  },
  filterTextActive: {
    color: SnitchColors.onPrimary,
    fontWeight: '600',
  },
  moveAllButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.xs,
    paddingHorizontal: SnitchSpacing.md,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  moveAllButtonDisabled: {
    opacity: 0.5,
  },
  moveAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.sm,
    gap: SnitchSpacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SnitchSpacing.xxl,
    paddingBottom: SnitchSpacing.xxl,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SnitchSpacing.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: SnitchSpacing.sm,
    fontSize: 13,
    lineHeight: 20,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
  exploreButton: {
    minHeight: 44,
    marginTop: SnitchSpacing.xl,
    paddingHorizontal: SnitchSpacing.xl,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: SnitchColors.onPrimary,
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: SnitchSpacing.xxl,
    paddingHorizontal: SnitchSpacing.xl,
  },
  noResultsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    marginTop: SnitchSpacing.xs,
    fontSize: 13,
    lineHeight: 19,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
});
