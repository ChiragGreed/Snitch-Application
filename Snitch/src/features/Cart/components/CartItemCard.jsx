import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/cartStyles';

export default function CartItemCard({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  onPressProduct,
  currency = 'INR',
}) {
  const product = item?.productId || {};
  const title = product?.title || item?.title || 'Editorial Item';
  const fabric = product?.fabric || product?.subtitle || product?.description || '';

  // Safe Image extraction
  const rawImage = item?.image || product?.image || (Array.isArray(product?.images) ? product.images[0] : null);
  const imageUrl = typeof rawImage === 'string' ? rawImage : rawImage?.url || null;

  // Safe Price extraction
  let price = 0;
  if (typeof item?.unitPrice === 'number') {
    price = item.unitPrice;
  } else if (typeof product?.variants?.price?.amount === 'number') {
    price = product.variants.price.amount;
  } else if (typeof product?.variants?.price === 'number') {
    price = product.variants.price;
  } else if (typeof product?.price?.amount === 'number') {
    price = product.price.amount;
  } else if (typeof product?.price === 'number') {
    price = product.price;
  } else if (typeof item?.price === 'number') {
    price = item.price;
  }

  const quantity = item?.quantity ?? 1;
  const badge = product?.badge || item?.badge;
  console.log('item', item);
  const variantAttributes = item?.variantAttributes || {};
  const attributes =
    variantAttributes && typeof variantAttributes === 'object' && !Array.isArray(variantAttributes)
      ? Object.entries(variantAttributes).filter(([, value]) => value != null)
      : [];
  const displayedAttributes = attributes.length
    ? attributes
    : [
      ['Size', item?.size || item?.variant?.size],
      ['Color', item?.color || item?.variant?.color],
    ].filter(([, value]) => value != null);
  const currencySymbol = currency === 'INR' ? '₹' : currency;

  return (
    <View style={styles.itemCard}>
      {/* Thumbnail */}
      <Pressable
        style={styles.itemThumbnailContainer}
        onPress={() => onPressProduct?.(product?._id || item?._id)}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.itemThumbnail}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.itemThumbnail, { backgroundColor: SnitchColors.surfaceContainer }]} />
        )}
        {badge ? (
          <View style={styles.topPickBadge}>
            <Text style={styles.topPickBadgeText}>{badge}</Text>
          </View>
        ) : null}
      </Pressable>

      {/* Details & Controls */}
      <View style={styles.itemDetails}>
        <View>
          <View style={styles.itemHeaderRow}>
            <Text
              style={styles.itemTitle}
              numberOfLines={1}
              onPress={() => onPressProduct?.(product?._id || item?._id)}
            >
              {title}
            </Text>
            <Pressable
              style={styles.itemDeleteButton}
              onPress={() => onRemove(item._id)}
              accessibilityLabel="Remove item"
              hitSlop={8}
            >
              <SnitchIcon name="delete_outline" size={18} color={SnitchColors.textLight} />
            </Pressable>
          </View>

          {fabric ? (
            <Text style={styles.itemFabricText} numberOfLines={1}>
              {fabric}
            </Text>
          ) : null}

          {displayedAttributes.length > 0 ? (
            <View style={styles.itemChipsRow}>
              {displayedAttributes.map(([name, value]) => (
                <View key={name} style={styles.itemChip}>
                  <Text style={styles.itemChipText}>
                    {name}: <Text style={styles.itemChipBold}>{String(value)}</Text>
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* Price & Stepper */}
        <View style={styles.itemBottomRow}>
          <Text style={styles.itemPrice}>
            {currencySymbol}{price.toLocaleString('en-IN')}
          </Text>

          <View style={styles.stepperContainer}>
            <Pressable
              style={styles.stepperButton}
              onPress={() => onDecrement(item._id)}
              accessibilityLabel="Decrease quantity"
              hitSlop={4}
            >
              <SnitchIcon name="remove" size={14} color={SnitchColors.textPrimary} />
            </Pressable>

            <Text style={styles.stepperValue}>{quantity}</Text>

            <Pressable
              style={styles.stepperButton}
              onPress={() => onIncrement(item._id)}
              accessibilityLabel="Increase quantity"
              hitSlop={4}
            >
              <SnitchIcon name="add" size={14} color={SnitchColors.textPrimary} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
