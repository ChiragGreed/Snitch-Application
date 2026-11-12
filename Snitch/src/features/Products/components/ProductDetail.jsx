import React, { useState, useRef, useCallback, useEffect, useMemo, } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions, FlatList, Modal, useWindowDimensions } from 'react-native';

import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Products/styles/productDetailStyles';

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

export default function ProductDetailScreen({ product, onAddToCart, onBuyNow, onToggleWishlist, isWishlisted }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const flatListRef = useRef(null);
  const zoomScale = useSharedValue(1);
  const savedZoomScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);

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

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const resetZoom = useCallback(() => {
    zoomScale.value = 1;
    savedZoomScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    setIsZoomed(false);
  }, [zoomScale, savedZoomScale, translateX, translateY]);

  const savedScale = useSharedValue(1);

  const pinchFocalX = useSharedValue(0);
  const pinchFocalY = useSharedValue(0);

  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const changeViewerSlide = useCallback((direction) => {
    setActiveSlide(
      (current) => (current + direction + images.length) % images.length
    );
    resetZoom();
  }, [images.length, resetZoom]);

  const closeImageViewer = useCallback(() => {
    setIsFullScreen(false);
    resetZoom();
  }, [resetZoom]);

  const toggleZoom = useCallback(() => {
    if (zoomScale.value > 1) {
      resetZoom();
    } else {
      zoomScale.value = 2.5;
      setIsZoomed(true);
    }
  }, [zoomScale, resetZoom]);

  const pinchGesture = Gesture.Pinch()
    .onStart((event) => {
      savedScale.value = zoomScale.value;

      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;

      // Focal point relative to the centre of the image stage
      pinchFocalX.value = event.focalX - windowWidth / 2;
      pinchFocalY.value = event.focalY - windowHeight / 2;
    })
    .onUpdate((event) => {
      const newScale = Math.max(
        1,
        Math.min(savedScale.value * event.scale, 4)
      );

      zoomScale.value = newScale;

      // Current finger midpoint relative to image centre
      const currentFocalX = event.focalX - windowWidth / 2;
      const currentFocalY = event.focalY - windowHeight / 2;

      // Calculate the image point originally underneath the fingers
      const imagePointX =
        (pinchFocalX.value - savedTranslateX.value) /
        savedScale.value;

      const imagePointY =
        (pinchFocalY.value - savedTranslateY.value) /
        savedScale.value;

      // Keep that image point underneath the moving fingers
      const maxX = (windowWidth * (newScale - 1)) / 2;
      const maxY = (windowHeight * (newScale - 1)) / 2;

      translateX.value = Math.max(
        -maxX,
        Math.min(maxX, currentFocalX - imagePointX * newScale)
      );

      translateY.value = Math.max(
        -maxY,
        Math.min(maxY, currentFocalY - imagePointY * newScale)
      );
    })
    .onEnd(() => {
      if (zoomScale.value <= 1) {
        zoomScale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
      }
    });

  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .activeOffsetX([-20, 20])
    .failOffsetY([-20, 20])
    .onStart(() => {
      panStartX.value = translateX.value;
      panStartY.value = translateY.value;
    })
    .onUpdate((event) => {
      if (zoomScale.value <= 1) return;

      const maxX = (windowWidth * (zoomScale.value - 1)) / 2;
      const maxY = (windowHeight * (zoomScale.value - 1)) / 2;

      translateX.value = Math.max(
        -maxX,
        Math.min(maxX, panStartX.value + event.translationX)
      );

      translateY.value = Math.max(
        -maxY,
        Math.min(maxY, panStartY.value + event.translationY)
      );
    })
    .onEnd((event) => {
      // At normal zoom, horizontal swipe changes the image.
      if (zoomScale.value <= 1 && images.length > 1) {
        runOnJS(changeViewerSlide)(
          event.translationX < 0 ? 1 : -1
        );
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (zoomScale.value > 1) {
        zoomScale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
        runOnJS(setIsZoomed)(false);
      } else {
        zoomScale.value = 2.5;
        runOnJS(setIsZoomed)(true);
      }
    });

  const imageGestures = Gesture.Simultaneous(pinchGesture, panGesture, doubleTapGesture);
  const animatedZoomStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: zoomScale.value },
    ],
  }));

  const canPurchase = hasVariants
    ? Boolean(selectedVariant && variantId && variantStock > 0)
    : true;

  // --------------------------------
  // Reset when product changes
  // --------------------------------

  useEffect(() => {
    setSelectedAttributes({});
    setActiveSlide(0);
    closeImageViewer();
  }, [product?.id, closeImageViewer]);

  // Reset carousel when selected variant changes.
  useEffect(() => {
    setActiveSlide(0);
    resetZoom();

    flatListRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [variantId, resetZoom]);

  useEffect(() => {
    resetZoom();
  }, [activeSlide, resetZoom]);

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
            renderItem={({ item }) => {
              return (
                <View style={styles.slide}>
                  {item ? (
                    <Pressable
                      onPress={() => setIsFullScreen(true)}
                      accessibilityRole="button"
                      accessibilityLabel="Open product image"
                    >
                      <Image
                        source={{ uri: item }}
                        contentFit="cover"
                        style={styles.slideImage}
                      />
                    </Pressable>
                  ) : (
                    <View
                      style={[
                        styles.slideImage,
                        styles.imagePlaceholder,
                      ]}
                    />
                  )}
                </View>
              );
            }}
          />

          <View style={styles.slideCounterBadge}>
            <Text style={styles.slideCounterText}>
              {activeSlide + 1}/{totalImages}
            </Text>
          </View>
        </View>

        <Modal
          visible={isFullScreen && Boolean(images[activeSlide])}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={closeImageViewer}
        >
          <GestureHandlerRootView style={styles.viewerRoot}>
            <View style={styles.viewerRoot}>
              <GestureDetector gesture={imageGestures}>
                <View style={styles.viewerImageStage}>
                  <Animated.View
                    style={[
                      styles.viewerImageFrame,
                      { width: windowWidth, height: windowHeight },
                      animatedZoomStyle,
                    ]}
                  >
                    <Image
                      source={{ uri: images[activeSlide] }}
                      contentFit="contain"
                      style={styles.viewerImage}
                    />
                  </Animated.View>
                </View>
              </GestureDetector>

              <Pressable
                style={[styles.viewerCloseButton, { top: insets.top + 12 }]}
                onPress={closeImageViewer}
                accessibilityRole="button"
                accessibilityLabel="Close image viewer"
              >
                <Text style={styles.viewerControlText}>×</Text>
              </Pressable>

              <View style={[styles.viewerCounter, { top: insets.top + 22 }]}>
                <Text style={styles.viewerCounterText}>
                  {activeSlide + 1}/{totalImages}
                </Text>
              </View>

              {images.length > 1 && (
                <>
                  <Pressable
                    style={[styles.viewerNavButton, styles.viewerPreviousButton]}
                    onPress={() =>
                      goToSlide((activeSlide - 1 + images.length) % images.length)
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Previous image"
                  >
                    <Text style={styles.viewerControlText}>‹</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.viewerNavButton, styles.viewerNextButton]}
                    onPress={() =>
                      goToSlide((activeSlide + 1) % images.length)
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Next image"
                  >
                    <Text style={styles.viewerControlText}>›</Text>
                  </Pressable>
                </>
              )}

              <Pressable
                style={[styles.viewerZoomButton, { bottom: insets.bottom + 18 }]}
                onPress={toggleZoom}
                accessibilityRole="button"
                accessibilityLabel={isZoomed ? 'Reset zoom' : 'Zoom image'}
              >
                <Text style={styles.viewerZoomText}>
                  {isZoomed ? 'RESET ZOOM' : 'PINCH OR DOUBLE-TAP TO ZOOM'}
                </Text>
              </Pressable>
            </View>
          </GestureHandlerRootView>
        </Modal>

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

        {selectedVariant && variantStock <= 0 ? (
          <Pressable
            style={styles.buyNowBtn}
            disabled
            accessibilityRole="button"
            accessibilityLabel="Notify me"
          >
            <SnitchIcon
              name="notifications"
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.buyNowText}>
              NOTIFY ME
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={[
              styles.buyNowBtn,
              !canPurchase && styles.disabledButton,
            ]}
            disabled={!canPurchase}
            onPress={onBuyNow}
          >
            <Text style={styles.buyNowText}>
              BUY NOW
            </Text>

            <Text style={styles.buyNowPrice}>
              ₹{currentPrice.toLocaleString('en-IN')}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
