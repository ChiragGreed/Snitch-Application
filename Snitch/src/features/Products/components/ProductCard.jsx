import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Products/styles/productStyles';
import {
  findMatchingVariant,
  getAttributeOptions,
  getVariantId,
  getVariantStock,
} from '@/features/Products/utils/variantHelpers';

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  const router = useRouter();
  const [variantPickerVisible, setVariantPickerVisible] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const attributeOptions = useMemo(
    () => getAttributeOptions(variants),
    [variants]
  );
  const selectedVariant = useMemo(
    () => findMatchingVariant(variants, selectedAttributes, attributeOptions),
    [variants, selectedAttributes, attributeOptions]
  );
  const isOutOfStock =
    variants.length > 0 &&
    variants.every((variant) => Number(variant?.stock ?? 0) <= 0);
  const defaultAvailableVariant = variants.find(
    (variant) => getVariantStock(variant) > 0
  );
  const requiredAttributes = Object.keys(attributeOptions);
  const hasCompleteSelection = requiredAttributes.every(
    (name) => selectedAttributes[name] != null
  );
  const hasSelectedVariantId = Boolean(getVariantId(selectedVariant));
  const canAddSelectedVariant =
    Boolean(selectedVariant && hasSelectedVariantId) &&
    getVariantStock(selectedVariant) > 0;

  const openCartAction = (event) => {
    event.stopPropagation();
    if (isOutOfStock) return;

    if (variants.length > 0 && requiredAttributes.length > 0) {
      setSelectedAttributes({});
      setVariantPickerVisible(true);
      return;
    }

    onAddToCart(product, defaultAvailableVariant || null);
  };

  const confirmVariant = () => {
    if (!canAddSelectedVariant) return;
    onAddToCart(product, selectedVariant);
    setVariantPickerVisible(false);
  };

  return (
    <>
      <Pressable style={styles.productCard} onPress={() => router.push(`/products/${product.id}`)}>
        <View style={styles.productImageWrapper}>
          <Image source={{ uri: product.image }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
          {product.badge ? (
            <View style={[styles.productBadge, product.badgeType === 'primary' && styles.productBadgePrimary, product.badgeType === 'neutral' && styles.productBadgeNeutral, product.badgeType === 'premium' && styles.productBadgePremium]}>
              <Text style={[styles.productBadgeText, product.badgeType === 'primary' && styles.productBadgeTextPrimary]}>{product.badge}</Text>
            </View>
          ) : null}
          <View style={styles.counterBadge}>
            <Text style={styles.counterBadgeText}>{product.counter}</Text>
          </View>
          <Pressable
            style={styles.wishlistButton}
            onPress={() => onToggleWishlist(product)}
            accessibilityLabel="Wishlist"
          >
            <SnitchIcon name={isWishlisted ? 'favorite' : 'favorite_border'} size={16} color={isWishlisted ? SnitchColors.error : SnitchColors.textPrimary} />
          </Pressable>
          <Pressable
            style={styles.quickAddButton}
            onPress={openCartAction}
            disabled={isOutOfStock}
            accessibilityLabel={
              isOutOfStock
                ? `Notify me when ${product.title} is back in stock`
                : `Add ${product.title} to bag`
            }
          >
            <SnitchIcon
              name={isOutOfStock ? 'notifications' : 'shopping_bag'}
              size={17}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
        <View style={styles.productInfo}>
          <View style={styles.swatchesRow}>
            {product.swatches.map((color, index) => (
              <View key={`${product.id}-swatch-${index}`} style={[styles.colorSwatch, { backgroundColor: color }]} />
            ))}
            {product.extraSwatchesCount ? <Text style={styles.extraSwatchesText}>+{product.extraSwatchesCount}</Text> : null}
          </View>
          <Text style={styles.productTitle} numberOfLines={2}>{product.title}</Text>
          <Text style={styles.productSubtitle} numberOfLines={1}>{product.subtitle}</Text>
          <View style={styles.ratingRow}>
            <SnitchIcon name="star" size={13} color={SnitchColors.ratingStar} />
            <Text style={styles.ratingNumber}>{product.rating}</Text>
            <Text style={styles.ratingCount}>({product.reviews})</Text>
          </View>
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>₹{product.price.toLocaleString()}</Text>
              {product.originalPrice ? <Text style={styles.strikePrice}>₹{product.originalPrice.toLocaleString()}</Text> : null}
            </View>
            {product.discount ? <Text style={[styles.discountText, product.discount === 'PREMIUM' && styles.premiumDiscountText]}>{product.discount}</Text> : null}
          </View>
        </View>
      </Pressable>

      <Modal
        visible={variantPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setVariantPickerVisible(false)}
        statusBarTranslucent
      >
        <Pressable
          style={styles.variantPickerBackdrop}
          onPress={() => setVariantPickerVisible(false)}
        >
          <Pressable style={styles.variantPickerCard} onPress={() => {}}>
            <View style={styles.variantPickerHeader}>
              <View style={styles.variantPickerHeading}>
                <Text style={styles.variantPickerTitle}>Choose options</Text>
                <Text style={styles.variantPickerProduct} numberOfLines={1}>
                  {product.title}
                </Text>
              </View>
              <Pressable
                style={styles.variantPickerClose}
                onPress={() => setVariantPickerVisible(false)}
                accessibilityLabel="Close variant selection"
              >
                <SnitchIcon name="close" size={18} color={SnitchColors.textMuted} />
              </Pressable>
            </View>

            <ScrollView
              style={styles.variantPickerOptions}
              showsVerticalScrollIndicator={false}
            >
              {Object.entries(attributeOptions).map(([name, options]) => (
                <View key={name} style={styles.variantPickerAttribute}>
                  <Text style={styles.variantPickerAttributeName}>{name}</Text>
                  <View style={styles.variantPickerChoices}>
                    {options.map((value) => {
                      const isSelected =
                        String(selectedAttributes[name]) === String(value);

                      return (
                        <Pressable
                          key={`${name}-${String(value)}`}
                          style={[
                            styles.variantPickerChoice,
                            isSelected && styles.variantPickerChoiceSelected,
                          ]}
                          onPress={() =>
                            setSelectedAttributes((current) => ({
                              ...current,
                              [name]: value,
                            }))
                          }
                          accessibilityRole="radio"
                          accessibilityState={{ selected: isSelected }}
                        >
                          <Text
                            style={[
                              styles.variantPickerChoiceText,
                              isSelected && styles.variantPickerChoiceTextSelected,
                            ]}
                          >
                            {String(value)}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.variantPickerAvailability}>
              {!hasCompleteSelection
                ? 'Select a variant to add to cart'
                : !selectedVariant || !hasSelectedVariantId
                  ? 'This combination is unavailable'
                  : getVariantStock(selectedVariant) <= 0
                    ? 'This option is out of stock'
                    : ''}
            </Text>
            <Pressable
              style={[
                styles.variantPickerAddButton,
                !canAddSelectedVariant && styles.variantPickerAddButtonDisabled,
              ]}
              onPress={confirmVariant}
              disabled={!canAddSelectedVariant}
              accessibilityRole="button"
              accessibilityState={{ disabled: !canAddSelectedVariant }}
            >
              <Text style={styles.variantPickerAddButtonText}>Add to bag</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
