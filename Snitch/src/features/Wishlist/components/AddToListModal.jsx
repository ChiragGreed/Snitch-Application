import React, { useCallback } from 'react';
import { Image } from 'expo-image';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';
import { SnitchIcon } from '@/components/snitch-icon';

const getItemId = (item) => {
  if (item == null) return null;
  const id = typeof item === 'object' ? item.id ?? item._id : item;
  return id == null ? null : String(id);
};

/**
 * AddToListModal
 *
 * Props:
 *  visible        – boolean
 *  listName       – string  (name of the list being edited)
 *  wishlistItems  – array   (all wishlisted products)
 *  isInList       – (item) => boolean
 *  onToggleItem   – (item) => void  (add or remove)
 *  onClose        – () => void
 */
export default function AddToListModal({
  visible,
  listName,
  wishlistItems,
  isInList,
  onToggleItem,
  onClose,
}) {
  const renderItem = useCallback(
    ({ item }) => {
      const added = isInList(item);
      const image = item?.image || item?.images?.[0];
      const imageUrl =
        typeof image === 'string' ? image : image?.url || image?.uri || null;
      const rawPrice = item?.price?.amount ?? item?.price ?? 0;
      const price = typeof rawPrice === 'number' ? rawPrice : 0;

      return (
        <Pressable
          style={styles.row}
          onPress={() => onToggleItem(item)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: added }}
          accessibilityLabel={`${added ? 'Remove' : 'Add'} ${item?.title || 'product'}`}
        >
          {/* Product thumbnail */}
          <View style={styles.thumb}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.thumbImage}
                contentFit="cover"
                transition={150}
              />
            ) : (
              <View style={[styles.thumbImage, styles.thumbPlaceholder]} />
            )}
          </View>

          {/* Info */}
          <View style={styles.info}>
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item?.title || 'Product'}
            </Text>
            {item?.subtitle ? (
              <Text style={styles.itemSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            ) : null}
            <Text style={styles.itemPrice}>
              ₹{price.toLocaleString('en-IN')}
            </Text>
          </View>

          {/* Toggle icon */}
          <Pressable
            style={[styles.toggleButton, added && styles.toggleButtonAdded]}
            onPress={() => onToggleItem(item)}
            hitSlop={6}
            accessibilityLabel={added ? 'Remove from list' : 'Add to list'}
          >
            <SnitchIcon
              name={added ? 'remove' : 'add'}
              size={20}
              color={added ? SnitchColors.onPrimary : SnitchColors.textPrimary}
            />
          </Pressable>
        </Pressable>
      );
    },
    [isInList, onToggleItem]
  );

  const keyExtractor = useCallback(
    (item) => String(getItemId(item) ?? Math.random()),
    []
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.sheetTitle}>Add to "{listName}"</Text>
              <Text style={styles.sheetSubtitle}>
                Tap + to add items from your wishlist
              </Text>
            </View>
            <Pressable
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={8}
              accessibilityLabel="Close"
            >
              <SnitchIcon name="close" size={20} color={SnitchColors.textMuted} />
            </Pressable>
          </View>

          {/* List */}
          {wishlistItems.length === 0 ? (
            <View style={styles.emptyState}>
              <SnitchIcon
                name="favorite_border"
                size={28}
                color={SnitchColors.textLight}
              />
              <Text style={styles.emptyText}>Your wishlist is empty.</Text>
              <Text style={styles.emptySubtext}>
                Add items to your wishlist first to build a list.
              </Text>
            </View>
          ) : (
            <FlatList
              data={wishlistItems}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}

          {/* Done button */}
          <Pressable style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: SnitchColors.surfaceCard,
    borderTopLeftRadius: SnitchRadius.xl,
    borderTopRightRadius: SnitchRadius.xl,
    maxHeight: '85%',
    paddingBottom: SnitchSpacing.xxl,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.borderVariant,
    alignSelf: 'center',
    marginTop: SnitchSpacing.md,
    marginBottom: SnitchSpacing.sm,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.xl,
    paddingBottom: SnitchSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
    gap: SnitchSpacing.sm,
  },
  headerLeft: {
    flex: 1,
    gap: 2,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: SnitchColors.textPrimary,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    flexShrink: 0,
  },
  listContent: {
    paddingHorizontal: SnitchSpacing.xl,
    paddingTop: SnitchSpacing.md,
    paddingBottom: SnitchSpacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: SnitchColors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.md,
  },
  thumb: {
    width: 60,
    height: 72,
    borderRadius: SnitchRadius.sm,
    overflow: 'hidden',
    backgroundColor: SnitchColors.surfaceContainer,
    flexShrink: 0,
  },
  thumbImage: {
    width: 60,
    height: 72,
  },
  thumbPlaceholder: {
    backgroundColor: SnitchColors.surfaceContainer,
  },
  info: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.1,
  },
  itemSubtitle: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    marginTop: 4,
  },
  toggleButton: {
    width: 36,
    height: 36,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderWidth: 1.5,
    borderColor: SnitchColors.border,
  },
  toggleButtonAdded: {
    backgroundColor: SnitchColors.primary,
    borderColor: SnitchColors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SnitchSpacing.xxl,
    paddingHorizontal: SnitchSpacing.xl,
    gap: SnitchSpacing.sm,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  emptySubtext: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    textAlign: 'center',
    lineHeight: 19,
  },
  doneButton: {
    marginHorizontal: SnitchSpacing.xl,
    marginTop: SnitchSpacing.sm,
    height: 48,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    fontSize: 14,
    fontWeight: '700',
    color: SnitchColors.onPrimary,
    letterSpacing: 0.3,
  },
});

