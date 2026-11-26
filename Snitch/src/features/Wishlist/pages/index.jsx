import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SnitchIcon } from '@/components/snitch-icon';
import WishListItemCard from '../components/WishListItemCard';
import CreateListModal from '../components/CreateListModal';
import AddToListModal from '../components/AddToListModal';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import useCart from '@/features/Cart/hooks/useCart';
import SnitchHeader from '@/shared/components/SnitchHeader';
import useWishList from '@/features/Wishlist/hooks/useWishList';
import useCustomLists from '@/features/Wishlist/hooks/useCustomLists';
import Toast from '@/shared/components/Toast';
import EmptyState from '@/shared/components/EmptyState';

const getProductId = (product) => product?.id ?? product?._id;

const isProductInStock = (product) => {
  if (Array.isArray(product?.variants) && product.variants.length > 0) {
    return product.variants.some((variant) => Number(variant?.stock) > 0);
  }
  if (product?.stock != null) return Number(product.stock) > 0;
  return true;
};

// Sentinel filter values
const FILTER_ALL = '__ALL__';
const FILTER_IN_STOCK = '__IN_STOCK__';

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { wishListItems, removeFromListHandler } = useWishList();
  const { addToCartHandler } = useCart();
  const {
    lists,
    createList,
    deleteList,
    addItem,
    removeItem,
    isItemInList,
    getListItems,
  } = useCustomLists();

  // ─── Filter state ───────────────────────────────────────────────
  // activeFilter: FILTER_ALL | FILTER_IN_STOCK | <custom list id>
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);

  // ─── Modal state ─────────────────────────────────────────────────
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [addToListTarget, setAddToListTarget] = useState(null); // { id, name }

  // ─── Toast ───────────────────────────────────────────────────────
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('default');

  const triggerToast = useCallback((message, type = 'default') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  // ─── Derived data ─────────────────────────────────────────────────
  const availableItems = useMemo(
    () => wishListItems.filter(isProductInStock),
    [wishListItems]
  );

  const visibleItems = useMemo(() => {
    if (activeFilter === FILTER_ALL) return wishListItems;
    if (activeFilter === FILTER_IN_STOCK) return availableItems;
    return getListItems(activeFilter, wishListItems);
  }, [activeFilter, wishListItems, availableItems, getListItems]);

  // ─── Handlers: wishlist ───────────────────────────────────────────
  const handleRemove = useCallback(
    (product) => {
      // Also remove from all custom lists
      const pid = String(getProductId(product) ?? '');
      lists.forEach((l) => removeItem(l.id, pid));
      removeFromListHandler(product);
      triggerToast('Removed from wishlist');
    },
    [removeFromListHandler, triggerToast, lists, removeItem]
  );

  const handleMoveToBag = useCallback(
    async (product) => {
      try {
        const added = await addToCartHandler(product);
        if (!added) return;
        removeFromListHandler(product);
        triggerToast('Added to bag', 'success');
      } catch {
        triggerToast('Unable to add to bag. Please try again.', 'warning');
      }
    },
    [addToCartHandler, removeFromListHandler, triggerToast]
  );

  const handleMoveAllToBag = useCallback(async () => {
    if (availableItems.length === 0) {
      triggerToast('No in-stock items to move');
      return;
    }
    let failedCount = 0;
    for (const product of availableItems) {
      try {
        const added = await addToCartHandler(product);
        if (added) {
          removeFromListHandler(product);
        } else {
          failedCount += 1;
        }
      } catch {
        failedCount += 1;
      }
    }
    triggerToast(
      failedCount ? 'Some items could not be moved to bag.' : 'Added to bag',
      failedCount ? 'warning' : 'success'
    );
  }, [addToCartHandler, availableItems, removeFromListHandler, triggerToast]);

  const handlePressProduct = useCallback(
    (productId) => {
      if (productId != null) router.push(`/products/${productId}`);
    },
    [router]
  );

  // ─── Handlers: custom lists ───────────────────────────────────────
  const handleCreateList = useCallback(
    (name) => {
      const id = createList(name);
      triggerToast(`"${name}" list created`, 'success');
      // Switch to the new list and immediately open add-items modal
      setActiveFilter(id);
      const newList = { id, name };
      setAddToListTarget(newList);
    },
    [createList, triggerToast]
  );

  const handleDeleteList = useCallback(
    (listId) => {
      deleteList(listId);
      if (activeFilter === listId) setActiveFilter(FILTER_ALL);
      triggerToast('List deleted');
    },
    [deleteList, activeFilter, triggerToast]
  );

  const handleToggleItemInList = useCallback(
    (item) => {
      if (!addToListTarget) return;
      if (isItemInList(addToListTarget.id, item)) {
        removeItem(addToListTarget.id, getProductId(item));
      } else {
        addItem(addToListTarget.id, item);
      }
    },
    [addToListTarget, isItemInList, addItem, removeItem]
  );

  // ─── Render ───────────────────────────────────────────────────────
  const activeCustomList = lists.find((l) => l.id === activeFilter);

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

      {/* ── Modals ── */}
      <CreateListModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateList}
      />

      {addToListTarget && (
        <AddToListModal
          visible={!!addToListTarget}
          listName={addToListTarget.name}
          wishlistItems={wishListItems}
          isInList={(item) => isItemInList(addToListTarget.id, item)}
          onToggleItem={handleToggleItemInList}
          onClose={() => setAddToListTarget(null)}
        />
      )}

      {/* ── Empty state ── */}
      {wishListItems.length === 0 ? (
        <EmptyState
          icon="favorite_border"
          iconColor={SnitchColors.secondaryMuted}
          title="Your wishlist is empty"
          description="Save the pieces you love and they will be waiting here."
          actionLabel="EXPLORE COLLECTION"
          onAction={() => router.push('/')}
          containerStyle={styles.emptyState}
          iconContainerStyle={styles.emptyIcon}
          titleStyle={styles.emptyTitle}
          descriptionStyle={styles.emptySubtitle}
          actionStyle={styles.exploreButton}
          actionTextStyle={styles.exploreButtonText}
        />
      ) : (
        <>
          {/* ── Toolbar ── */}
          <View style={styles.toolbar}>
            {/* Filter chips (scrollable row) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersRow}
            >
              {/* All */}
              <Pressable
                style={[
                  styles.filterButton,
                  activeFilter === FILTER_ALL && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(FILTER_ALL)}
                accessibilityRole="button"
                accessibilityState={{ selected: activeFilter === FILTER_ALL }}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === FILTER_ALL && styles.filterTextActive,
                  ]}
                >
                  All ({wishListItems.length})
                </Text>
              </Pressable>

              {/* In Stock */}
              <Pressable
                style={[
                  styles.filterButton,
                  activeFilter === FILTER_IN_STOCK && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(FILTER_IN_STOCK)}
                accessibilityRole="button"
                accessibilityState={{ selected: activeFilter === FILTER_IN_STOCK }}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === FILTER_IN_STOCK && styles.filterTextActive,
                  ]}
                >
                  In Stock ({availableItems.length})
                </Text>
              </Pressable>

              {/* Custom lists */}
              {lists.map((list) => {
                const isActive = activeFilter === list.id;
                return (
                  <View key={list.id} style={styles.customFilterChipWrapper}>
                    <Pressable
                      style={[
                        styles.filterButton,
                        isActive && styles.filterButtonActive,
                      ]}
                      onPress={() => setActiveFilter(list.id)}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                    >
                      <Text
                        style={[
                          styles.filterText,
                          isActive && styles.filterTextActive,
                        ]}
                        numberOfLines={1}
                      >
                        {list.name} ({list.itemIds.length})
                      </Text>
                    </Pressable>
                  </View>
                );
              })}

              {/* Create List button */}
              <Pressable
                style={styles.createListChip}
                onPress={() => setShowCreateModal(true)}
                accessibilityRole="button"
                accessibilityLabel="Create a new list"
              >
                <SnitchIcon name="add" size={15} color={SnitchColors.textMuted} />
                <Text style={styles.createListChipText}>Create your list</Text>
              </Pressable>
            </ScrollView>

            {/* Move all button — only for All / In Stock views */}
            {(activeFilter === FILTER_ALL || activeFilter === FILTER_IN_STOCK) && (
              <Pressable
                style={[
                  styles.moveAllButton,
                  availableItems.length === 0 && styles.moveAllButtonDisabled,
                ]}
                onPress={handleMoveAllToBag}
                accessibilityRole="button"
                accessibilityLabel="Move all in-stock items to bag"
              >
                <SnitchIcon name="shopping_bag" size={16} color={SnitchColors.textPrimary} />
                <Text style={styles.moveAllText}>Move All</Text>
              </Pressable>
            )}

            {/* Add items / Delete list — for custom list views */}
            {activeCustomList && (
              <View style={styles.listActions}>
                <Pressable
                  style={styles.listActionButton}
                  onPress={() => setAddToListTarget(activeCustomList)}
                  accessibilityLabel="Add items to list"
                >
                  <SnitchIcon name="edit" size={15} color={SnitchColors.textPrimary} />
                  <Text style={styles.listActionText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={[styles.listActionButton, styles.listActionDeleteButton]}
                  onPress={() => handleDeleteList(activeCustomList.id)}
                  accessibilityLabel="Delete list"
                >
                  <SnitchIcon name="delete" size={15} color={SnitchColors.error} />
                </Pressable>
              </View>
            )}
          </View>

          {/* ── Item list ── */}
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
              <EmptyState
                icon={activeCustomList ? 'playlist_add' : null}
                iconColor={SnitchColors.textLight}
                showIconContainer={false}
                title={activeCustomList ? 'This list is empty' : 'Nothing in stock right now'}
                description={
                  activeCustomList
                    ? 'Tap Edit to add items from your wishlist.'
                    : 'Your saved out-of-stock pieces will stay in your wishlist.'
                }
                actionLabel={activeCustomList ? 'Add Items' : undefined}
                actionIcon={activeCustomList ? 'add' : undefined}
                onAction={
                  activeCustomList
                    ? () => setAddToListTarget(activeCustomList)
                    : undefined
                }
                containerStyle={styles.noResults}
                titleStyle={styles.noResultsTitle}
                descriptionStyle={styles.noResultsSubtitle}
                actionStyle={styles.addItemsButton}
                actionTextStyle={styles.addItemsButtonText}
              />
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
  // ─── Toolbar ───────────────────────────────────────────────────────
  toolbar: {
    paddingTop: SnitchSpacing.sm,
    paddingBottom: SnitchSpacing.sm,
    gap: SnitchSpacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SnitchSpacing.gutter,
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
  customFilterChipWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // "Create your list" chip
  createListChip: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs,
    paddingHorizontal: SnitchSpacing.md,
    borderRadius: SnitchRadius.full,
    borderWidth: 1.5,
    borderColor: SnitchColors.borderVariant,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
  createListChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: SnitchColors.textMuted,
  },
  // move all / list actions row
  moveAllButton: {
    alignSelf: 'flex-end',
    marginRight: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.xs,
    paddingHorizontal: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.xs,
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
  listActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: SnitchSpacing.sm,
    paddingHorizontal: SnitchSpacing.gutter,
  },
  listActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs,
    paddingHorizontal: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.xs,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  listActionDeleteButton: {
    paddingHorizontal: SnitchSpacing.sm,
    backgroundColor: 'rgba(186,26,26,0.07)',
  },
  listActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  // ─── Scroll ────────────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.md,
    gap: SnitchSpacing.md,
  },
  // ─── Empty / no results ────────────────────────────────────────────
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
    flex: 0,
    alignItems: 'center',
    paddingVertical: SnitchSpacing.xxl,
    paddingHorizontal: SnitchSpacing.xl,
    gap: SnitchSpacing.sm,
  },
  noResultsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
  addItemsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.xs,
    marginTop: SnitchSpacing.sm,
    paddingHorizontal: SnitchSpacing.xl,
    height: 44,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
  },
  addItemsButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.onPrimary,
    letterSpacing: 0.3,
  },
});
