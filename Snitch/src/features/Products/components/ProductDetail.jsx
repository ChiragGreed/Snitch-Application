import React, { useState, useRef, useCallback, useEffect, useMemo, } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions, FlatList } from 'react-native';

import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { SnitchIcon } from '@/components/snitch-icon';
import {
  SnitchColors,
  SnitchSpacing,
  SnitchRadius,
} from '@/constants/snitch-theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --------------------------------
// Variant helpers
// --------------------------------

const getVariantAttributes = (variant) => {
  const attributes = variant?.attribute || variant?.attributes || {};

  if (!attributes || typeof attributes !== 'object' || Array.isArray(attributes)) {
    return {};
  }

  return attributes;
};

const getVariantPrice = (variant, product) => {
  const price = variant?.price;

  if (typeof price === 'number') return price;
  if (typeof price?.amount === 'number') return price.amount;

  if (typeof product?.price === 'number') return product.price;
  if (typeof product?.price?.amount === 'number') {
    return product.price.amount;
  }

  return 0;
};

const getVariantImages = (variant, product) => {
  if (variant?.images?.length > 0) {
    return variant.images;
  }

  return product?.images || (product?.image ? [product.image] : []);
};

const getVariantStock = (variant) => {
  return Number(variant?.stock ?? 0);
};

const getVariantId = (variant) => {
  return variant?._id || variant?.id || null;
};

// --------------------------------
// Component
// --------------------------------

export default function ProductDetailScreen({ product, onAddToCart, onToggleWishlist, isWishlisted, }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const flatListRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const [fabricExpanded, setFabricExpanded] = useState(false);
  const [shippingExpanded, setShippingExpanded] = useState(false);
  const [returnsExpanded, setReturnsExpanded] = useState(false);

  // --------------------------------
  // Attribute options
  // --------------------------------


  const attributeOptions = useMemo(() => {
    const structure = {};

    (product?.variants || []).forEach((variant) => {
      const attributes = getVariantAttributes(variant);

      Object.entries(attributes).forEach(([name, value]) => {
        if (!name || value == null) return;

        if (!structure[name]) {
          structure[name] = [];
        }

        const alreadyExists = structure[name].some(
          (item) => String(item) === String(value)
        );

        if (!alreadyExists) {
          structure[name].push(value);
        }
      });
    });

    return structure;
  }, [product?.variants]);

  // --------------------------------
  // Find selected variant
  // --------------------------------


  const selectedVariant = useMemo(() => {
    const variants = product?.variants || [];
    const requiredAttributes = Object.keys(attributeOptions);

    if (!variants.length || !requiredAttributes.length) {
      return null;
    }

    const allSelected = requiredAttributes.every(
      (name) => selectedAttributes[name] != null
    );

    if (!allSelected) return null;

    return (
      variants.find((variant) => {
        const attributes = getVariantAttributes(variant);

        return requiredAttributes.every(
          (name) =>
            String(attributes[name]) ===
            String(selectedAttributes[name])
        );
      }) || null
    );
  }, [product?.variants, attributeOptions, selectedAttributes]);

  const hasVariants = (product?.variants?.length || 0) > 0;

  const allAttributesSelected = Object.keys(attributeOptions).every(
    (name) => selectedAttributes[name] != null
  );

  const variantStock = getVariantStock(selectedVariant);
  const variantId = getVariantId(selectedVariant);

  const currentPrice = getVariantPrice(selectedVariant, product);

  const images = useMemo(() => {
    return getVariantImages(selectedVariant, product);
  }, [selectedVariant, product]);

  const totalImages = images.length || 1;

  const canPurchase = hasVariants
    ? Boolean(selectedVariant && variantId && variantStock > 0)
    : true;

  // --------------------------------
  // Reset when product changes
  // --------------------------------

  useEffect(() => {
    setSelectedAttributes({});
    setActiveSlide(0);
  }, [product?.id]);

  // Reset carousel when selected variant changes.
  useEffect(() => {
    setActiveSlide(0);

    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [variantId]);

  // --------------------------------
  // Carousel
  // --------------------------------


  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveSlide(viewableItems[0].index ?? 0);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const goToSlide = (index) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

    setActiveSlide(index);
  };

  // --------------------------------
  // Variant selection
  // --------------------------------


  const handleAttributeSelect = (name, value) => {
    setSelectedAttributes((current) => {
      const updated = { ...current };

      // Click again to deselect.
      if (String(updated[name]) === String(value)) {
        delete updated[name];
      } else {
        updated[name] = value;
      }

      return updated;
    });
  };

  // --------------------------------
  // Discount
  // --------------------------------


  if (!product) return null;

  const originalPrice = Number(product.originalPrice || 0);

  const discount =
    originalPrice > currentPrice && currentPrice > 0
      ? Math.round(
        ((originalPrice - currentPrice) / originalPrice) * 100
      )
      : null;

  // ─────────────────────────────────────────────
  // Add to cart
  // ─────────────────────────────────────────────

  const handleAddToCart = () => {
    if (!canPurchase) return;

    onAddToCart?.(product, selectedVariant);
  };

  // --------------------------------
  // UI
  // --------------------------------


  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ── */}

      <View style={styles.header}>
        <Pressable
          style={styles.headerBtn}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <SnitchIcon
            name="arrow_back"
            size={22}
            color={SnitchColors.textPrimary}
          />
        </Pressable>

        <View style={styles.headerRight}>
          <Pressable
            style={styles.headerBtn}
            onPress={() => onToggleWishlist?.(product)}
            accessibilityLabel="Wishlist"
          >
            <SnitchIcon
              name={isWishlisted ? 'favorite' : 'favorite_border'}
              size={22}
              color={
                isWishlisted
                  ? SnitchColors.error
                  : SnitchColors.textPrimary
              }
            />
          </Pressable>
        </View>
      </View>

      {/* ── Scrollable Body ── */}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 88,
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Image Carousel ── */}

        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={images.length > 0 ? images : [null]}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => String(i)}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                {item ? (
                  <Image
                    source={{ uri: item }}
                    style={styles.slideImage}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.slideImage,
                      styles.imagePlaceholder,
                    ]}
                  />
                )}
              </View>
            )}
          />

          <View style={styles.slideCounterBadge}>
            <Text style={styles.slideCounterText}>
              {activeSlide + 1}/{totalImages}
            </Text>
          </View>
        </View>

        {/* ── Thumbnail Strip ── */}

        {images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbStrip}
            contentContainerStyle={styles.thumbStripContent}
          >
            {images.map((img, i) => (
              <Pressable
                key={i}
                style={[
                  styles.thumb,
                  i === activeSlide && styles.thumbActive,
                ]}
                onPress={() => goToSlide(i)}
              >
                <Image
                  source={{ uri: img }}
                  style={styles.thumbImage}
                  contentFit="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        )}

        {/* ── Product Info ── */}

        <View style={styles.infoSection}>

          <View style={styles.metaRow}>
            <Text style={styles.collectionLabel}>
              COLLECTION 2026
            </Text>

            {product.rating && (
              <View style={styles.ratingBadge}>
                <SnitchIcon
                  name="star"
                  size={12}
                  color={SnitchColors.ratingStar}
                />

                <Text style={styles.ratingText}>
                  {product.rating}
                </Text>

                {product.reviews && (
                  <Text style={styles.reviewsText}>
                    ({product.reviews})
                  </Text>
                )}
              </View>
            )}
          </View>

          <Text style={styles.productTitle}>
            {product.title}
          </Text>

          <View style={styles.sellerRow}>
            <SnitchIcon
              name="verified"
              size={14}
              color={SnitchColors.textMuted}
            />

            <Text style={styles.sellerText}>
              Sold by SNITCH Atelier
            </Text>

            <Text style={styles.dot}>•</Text>

            <Text style={styles.shippingTag}>
              Free 3-Day Express
            </Text>
          </View>

          {/* Price */}

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              ₹{currentPrice.toLocaleString('en-IN')}
            </Text>

            {originalPrice > 0 && (
              <Text style={styles.strikePrice}>
                ₹{originalPrice.toLocaleString('en-IN')}
              </Text>
            )}

            {discount > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>
                  {discount}% Off
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.taxNote}>
            MRP inclusive of all taxes. Free shipping on prepaid orders.
          </Text>
        </View>

        {/* ── Variants ── */}

        {Object.entries(attributeOptions).map(([name, values]) => (
          <View key={name} style={styles.variantSection}>

            <View style={styles.variantTitleRow}>
              <Text style={styles.variantLabel}>
                Select {name}:
              </Text>

              <Text style={styles.variantSelected}>
                {selectedAttributes[name] ?? 'None'}
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.variantPillsRow}
            >
              {values.map((value) => {
                const isSelected =
                  String(selectedAttributes[name]) === String(value);

                return (
                  <Pressable
                    key={`${name}-${value}`}
                    style={[
                      styles.variantPill,
                      isSelected && styles.variantPillSelected,
                    ]}
                    onPress={() => handleAttributeSelect(name, value)}
                  >
                    <Text
                      style={[
                        styles.variantPillText,
                        isSelected && styles.variantPillTextSelected,
                      ]}
                    >
                      {value}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        ))}

        {/* ── Stock Availability ── */}

        {hasVariants && selectedVariant && (
          <View style={styles.variantStockCard}>
            <View style={styles.variantStockRow}>
              <Text style={styles.variantStockLabel}>
                Stock Available:
              </Text>

              <Text
                style={[
                  styles.variantStockValue,
                  variantStock <= 0 && styles.variantOutOfStock,
                ]}
              >
                {variantStock > 0
                  ? `${variantStock} Available`
                  : 'Out of Stock'}
              </Text>
            </View>

            {selectedVariant.price?.amount != null && (
              <View style={styles.variantStockRow}>
                <Text style={styles.variantStockLabel}>
                  Variant Price:
                </Text>

                <Text style={styles.variantStockValue}>
                  ₹{currentPrice.toLocaleString('en-IN')}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Invalid combination */}

        {hasVariants &&
          allAttributesSelected &&
          !selectedVariant && (
            <View style={styles.invalidVariantCard}>
              <Text style={styles.invalidVariantText}>
                ✕ This combination is not available
              </Text>
            </View>
          )}

        {/* ── Delivery Card ── */}

        <View style={styles.deliveryCard}>
          <View style={styles.deliveryIcon}>
            <SnitchIcon
              name="local_shipping"
              size={18}
              color={SnitchColors.textPrimary}
            />
          </View>

          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryTitle}>
              Standard Delivery
            </Text>

            <Text style={styles.deliverySubtitle}>
              Free on prepaid orders • Ships in 24 hours
            </Text>
          </View>
        </View>

        {/* ── Description ── */}

        {product.subtitle?.length > 0 && (
          <View style={styles.accordionSection}>
            <Pressable
              style={styles.accordionHeader}
              onPress={() => setFabricExpanded(!fabricExpanded)}
            >
              <View style={styles.accordionLeft}>
                <SnitchIcon
                  name="style"
                  size={18}
                  color={SnitchColors.textMuted}
                />

                <Text style={styles.accordionTitle}>
                  Product Details
                </Text>
              </View>

              <SnitchIcon
                name={fabricExpanded ? 'expand_less' : 'expand_more'}
                size={20}
                color={SnitchColors.textMuted}
              />
            </Pressable>

            {fabricExpanded && (
              <View style={styles.accordionBody}>
                <Text style={styles.accordionText}>
                  {product.subtitle}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* ── Shipping Info ── */}

        <View style={styles.accordionSection}>
          <Pressable
            style={styles.accordionHeader}
            onPress={() => setShippingExpanded(!shippingExpanded)}
          >
            <View style={styles.accordionLeft}>
              <SnitchIcon
                name="local_shipping"
                size={18}
                color={SnitchColors.textMuted}
              />

              <Text style={styles.accordionTitle}>
                Complimentary Shipping
              </Text>
            </View>

            <SnitchIcon
              name={shippingExpanded ? 'expand_less' : 'expand_more'}
              size={20}
              color={SnitchColors.textMuted}
            />
          </Pressable>

          {shippingExpanded && (
            <View style={styles.accordionBody}>
              <Text style={styles.accordionText}>
                Standard delivery dispatched within 24 hours.
                Tracked delivery across tier 1 and tier 2 cities
                in 3–5 business days.
              </Text>
            </View>
          )}
        </View>

        {/* ── Returns ── */}

        <View style={styles.accordionSection}>
          <Pressable
            style={styles.accordionHeader}
            onPress={() => setReturnsExpanded(!returnsExpanded)}
          >
            <View style={styles.accordionLeft}>
              <SnitchIcon
                name="cached"
                size={18}
                color={SnitchColors.textMuted}
              />

              <Text style={styles.accordionTitle}>
                30-Day Easy Returns
              </Text>
            </View>

            <SnitchIcon
              name={returnsExpanded ? 'expand_less' : 'expand_more'}
              size={20}
              color={SnitchColors.textMuted}
            />
          </Pressable>

          {returnsExpanded && (
            <View style={styles.accordionBody}>
              <Text style={styles.accordionText}>
                Hassle-free doorstep exchanges and instant refunds.
                Items must be unworn with original tags attached.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── Sticky Bottom CTA ── */}

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <Pressable
          style={styles.wishlistToggle}
          onPress={() => onToggleWishlist?.(product)}
          accessibilityLabel="Wishlist"
        >
          <SnitchIcon
            name={isWishlisted ? 'favorite' : 'favorite_border'}
            size={22}
            color={
              isWishlisted
                ? SnitchColors.error
                : SnitchColors.textPrimary
            }
          />
        </Pressable>

        <Pressable
          style={[
            styles.addToBagBtn,
            !canPurchase && styles.disabledButton,
          ]}
          disabled={!canPurchase}
          onPress={handleAddToCart}
        >
          <SnitchIcon
            name="shopping_bag"
            size={18}
            color={SnitchColors.textPrimary}
          />

          <Text style={styles.addToBagText}>
            {hasVariants && !selectedVariant
              ? 'SELECT OPTIONS'
              : selectedVariant && variantStock <= 0
                ? 'OUT OF STOCK'
                : 'ADD TO BAG'}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.buyNowBtn,
            !canPurchase && styles.disabledButton,
          ]}
          disabled={!canPurchase}
          onPress={handleAddToCart}
        >
          <Text style={styles.buyNowText}>
            BUY NOW
          </Text>

          <Text style={styles.buyNowPrice}>
            ₹{currentPrice.toLocaleString('en-IN')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// --------------------------------
// Styles
// --------------------------------

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: SnitchSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
    backgroundColor: SnitchColors.canvas,
  },

  headerBtn: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scroll: {
    flex: 1,
  },

  // Carousel
  carouselContainer: {
    position: 'relative',
    backgroundColor: SnitchColors.surfaceContainerLow,
  },

  slide: {
    width: SCREEN_WIDTH,
    aspectRatio: 4 / 5,
  },

  slideImage: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },

  slideCounterBadge: {
    position: 'absolute',
    top: SnitchSpacing.md,
    right: SnitchSpacing.md,
    backgroundColor: 'rgba(26,28,26,0.70)',
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 4,
    borderRadius: SnitchRadius.full,
  },

  slideCounterText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Thumbnails
  thumbStrip: {
    backgroundColor: SnitchColors.canvas,
  },

  thumbStripContent: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.sm,
    gap: SnitchSpacing.sm,
    flexDirection: 'row',
  },

  thumb: {
    width: 52,
    height: 68,
    borderRadius: SnitchRadius.sm,
    overflow: 'hidden',
    opacity: 0.5,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  thumbActive: {
    opacity: 1,
    borderColor: SnitchColors.textPrimary,
  },

  thumbImage: {
    width: '100%',
    height: '100%',
  },

  // Info
  infoSection: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.md,
    paddingBottom: SnitchSpacing.sm,
    gap: SnitchSpacing.xs,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  collectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: SnitchColors.textMuted,
    textTransform: 'uppercase',
  },

  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 3,
    borderRadius: SnitchRadius.full,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  reviewsText: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },

  productTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.3,
    lineHeight: 26,
    marginTop: SnitchSpacing.xs,
  },

  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },

  sellerText: {
    fontSize: 12,
    color: SnitchColors.textMuted,
  },

  dot: {
    color: SnitchColors.borderVariant,
    fontSize: 12,
  },

  shippingTag: {
    fontSize: 12,
    color: SnitchColors.secondary,
    fontWeight: '500',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SnitchSpacing.sm,
    marginTop: SnitchSpacing.sm,
  },

  currentPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.5,
  },

  strikePrice: {
    fontSize: 14,
    color: SnitchColors.textLight,
    textDecorationLine: 'line-through',
  },

  discountBadge: {
    backgroundColor: SnitchColors.surfaceContainerHigh,
    paddingHorizontal: SnitchSpacing.sm,
    paddingVertical: 2,
    borderRadius: SnitchRadius.full,
  },

  discountBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: SnitchColors.discountBadge,
    letterSpacing: 0.5,
  },

  taxNote: {
    fontSize: 11,
    color: SnitchColors.textLight,
    marginTop: 2,
  },

  // Variant attributes
  variantSection: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.md,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
    marginTop: SnitchSpacing.sm,
    gap: SnitchSpacing.sm,
  },

  variantTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },

  variantLabel: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  variantSelected: {
    fontSize: 14,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  variantPillsRow: {
    flexDirection: 'row',
    gap: SnitchSpacing.sm,
  },

  variantPill: {
    height: 44,
    minWidth: 52,
    paddingHorizontal: SnitchSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceCard,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },

  variantPillSelected: {
    backgroundColor: SnitchColors.textPrimary,
    borderColor: SnitchColors.textPrimary,
  },

  variantPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  variantPillTextSelected: {
    color: '#FFFFFF',
  },

  // Stock availability
  variantStockCard: {
    marginHorizontal: SnitchSpacing.gutter,
    marginVertical: SnitchSpacing.sm,
    padding: SnitchSpacing.md,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.md,
    gap: SnitchSpacing.sm,
  },

  variantStockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  variantStockLabel: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    fontWeight: '500',
  },

  variantStockValue: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  variantOutOfStock: {
    color: SnitchColors.error,
  },

  invalidVariantCard: {
    marginHorizontal: SnitchSpacing.gutter,
    marginVertical: SnitchSpacing.sm,
    padding: SnitchSpacing.md,
    backgroundColor: '#FCE8E8',
    borderRadius: SnitchRadius.md,
  },

  invalidVariantText: {
    fontSize: 12,
    color: SnitchColors.error,
    fontWeight: '600',
  },

  // Delivery
  deliveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.md,
    marginHorizontal: SnitchSpacing.gutter,
    marginVertical: SnitchSpacing.sm,
    padding: SnitchSpacing.md,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.md,
  },

  deliveryIcon: {
    width: 36,
    height: 36,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deliveryInfo: {
    flex: 1,
  },

  deliveryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },

  deliverySubtitle: {
    fontSize: 12,
    color: SnitchColors.secondary,
    marginTop: 2,
  },

  // Accordions
  accordionSection: {
    marginHorizontal: SnitchSpacing.gutter,
    marginBottom: SnitchSpacing.sm,
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.md,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    overflow: 'hidden',
  },

  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.md,
    minHeight: 52,
  },

  accordionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
  },

  accordionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: SnitchColors.textPrimary,
  },

  accordionBody: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingBottom: SnitchSpacing.md,
  },

  accordionText: {
    fontSize: 13,
    color: SnitchColors.textSecondary,
    lineHeight: 20,
  },

  // Bottom Bar
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: SnitchSpacing.sm,
    backgroundColor: SnitchColors.canvas,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
  },

  wishlistToggle: {
    width: 46,
    height: 46,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addToBagBtn: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.xs,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },

  addToBagText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: SnitchColors.textPrimary,
  },

  buyNowBtn: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.xs,
    borderRadius: SnitchRadius.sm,
    backgroundColor: SnitchColors.textPrimary,
  },

  buyNowText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#FFFFFF',
  },

  buyNowPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  disabledButton: {
    opacity: 0.5,
  },
});
