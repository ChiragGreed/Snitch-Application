import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

// Types
interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  badgeType?: 'primary' | 'neutral' | 'premium';
  counter: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  swatches: string[];
  extraSwatchesCount?: number;
}

const CATEGORIES = [
  'ALL PIECES',
  'NEW DROPS',
  'CUBAN SHIRTS',
  'TAILORED DENIM',
  'BLAZERS',
  'ESSENTIALS',
  'ACCESSORIES',
] as const;

const SORT_OPTIONS = ['Trending', 'Price: Low to High', 'Price: High to Low', 'Top Rated'] as const;

const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    title: 'Men Classic Boxy Striped Shirt',
    subtitle: 'Cuban Collar • Relaxed Fit',
    category: 'CUBAN SHIRTS',
    badge: 'BEST SELLER',
    badgeType: 'primary',
    counter: '1/4',
    rating: 4.6,
    reviews: '1.2k',
    price: 1198,
    originalPrice: 1999,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    swatches: ['#1A1C1A', '#DCDAD6', '#C6C6C6'],
    extraSwatchesCount: 2,
  },
  {
    id: 'prod-2',
    title: 'Drift Bootcut Jeans',
    subtitle: '13.5oz Rigid • Mid Rise',
    category: 'TAILORED DENIM',
    badge: 'HEAVY DENIM',
    badgeType: 'neutral',
    counter: '1/4',
    rating: 4.7,
    reviews: '1.5k',
    price: 1850,
    originalPrice: 2800,
    discount: '34% OFF',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    swatches: ['#485B70', '#1A1C1A'],
  },
  {
    id: 'prod-3',
    title: 'Oversized Viscose Abstract Shirt',
    subtitle: 'Drape Silhouette • Silky Feel',
    category: 'CUBAN SHIRTS',
    badge: '100% VISCOSE',
    badgeType: 'neutral',
    counter: '1/4',
    rating: 4.8,
    reviews: '840',
    price: 1199,
    originalPrice: 2199,
    discount: '45% OFF',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80',
    swatches: ['#5E5E5E', '#E5E2DE'],
  },
  {
    id: 'prod-4',
    title: 'Modern Fit Wool Twill Sport Coat',
    subtitle: 'Structure Cut • Virgin Wool',
    category: 'BLAZERS',
    badge: 'TAILORED FIT',
    badgeType: 'premium',
    counter: '1/5',
    rating: 4.9,
    reviews: '310',
    price: 9358,
    discount: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    swatches: ['#2A1704', '#1A1C1A'],
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL PIECES');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [, setCartCount] = useState(2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const toggleWishlist = (id: string, name: string) => {
    setWishlist((prev) => {
      const next = !prev[id];
      triggerToast(next ? `Saved "${name}" to wishlist` : `Removed "${name}" from wishlist`);
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    triggerToast(`Added ${product.title} to bag`);
  };

  const handleNextSort = () => {
    setSortIndex((prev) => (prev + 1) % SORT_OPTIONS.length);
  };

  // Filter & Sort products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL PIECES' ||
        selectedCategory === 'NEW DROPS' ||
        item.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    const currentSort = SORT_OPTIONS[sortIndex];
    if (currentSort === 'Price: Low to High') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (currentSort === 'Price: High to Low') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (currentSort === 'Top Rated') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortIndex]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Toast Notification */}
      {toastMessage && (
        <View style={[styles.toastContainer, { top: insets.top + 54 }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.brandWordmark}>SNITCH</Text>
          <View style={styles.headerDivider} />
          <Text style={styles.headerSub}>Home</Text>
        </View>

        <View style={styles.headerRight}>
          <Pressable
            style={styles.headerIconButton}
            onPress={() => triggerToast('Search active')}
            accessibilityLabel="Search">
            <SnitchIcon name="search" size={21} color={SnitchColors.textPrimary} />
          </Pressable>

          <Pressable
            style={styles.headerIconButton}
            onPress={() => triggerToast('No new notifications')}
            accessibilityLabel="Notifications">
            <SnitchIcon name="notifications" size={21} color={SnitchColors.textPrimary} />
            <View style={styles.notificationDot} />
          </Pressable>

          <Pressable
            style={styles.avatarContainer}
            onPress={() => triggerToast('Profile')}
            accessibilityLabel="Account">
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2ezDUZRp9ppjI7FyHPLgcdt_VKotlZgALsQiTPxSapg3J88L7a-ZzoNDxZyUjbHT1CrfMs1neRYrS_F3o8jWxuKo6Z2o5l3xDHYCR41S85L7m8uv-PYxRe5EPccn5oDX6c7fr3_7xbNlegeTySRFg4ioNouy9yubOVk1veceeAwtPGrZbpXqUa21lNFdOpAmm3aQvmlg-wzS8ujqncbBYfuEh9_kHLmBWpiQTwdM',
              }}
              style={styles.avatarImage}
              contentFit="cover"
            />
          </Pressable>
        </View>
      </View>

      {/* Scrollable Main Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}>
        {/* Search & Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <SnitchIcon name="search" size={19} color={SnitchColors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search shirts, bootcut denim, coats..."
              placeholderTextColor="rgba(70, 71, 65, 0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 ? (
              <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
                <SnitchIcon name="close" size={17} color={SnitchColors.textMuted} />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => triggerToast('Voice search listening...')}
                hitSlop={10}
                style={styles.micButton}>
                <SnitchIcon name="mic" size={19} color={SnitchColors.textMuted} />
              </Pressable>
            )}
          </View>

          <Pressable
            style={styles.filterButton}
            onPress={handleNextSort}
            accessibilityLabel="Filter Catalog">
            <SnitchIcon name="tune" size={19} color={SnitchColors.textPrimary} />
          </Pressable>
        </View>

        {/* Editorial Campaign Hero Lookbook Card */}
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
            }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />

          {/* Dark Overlay Gradient simulation */}
          <View style={styles.heroOverlay} />

          {/* Top Pill Badges */}
          <View style={styles.heroTopRow}>
            <View style={styles.limitedEditionBadge}>
              <Text style={styles.limitedEditionText}>LIMITED EDITION</Text>
            </View>

            <View style={styles.dropBadge}>
              <SnitchIcon name="auto_awesome" size={13} color="#FFFFFF" />
              <Text style={styles.dropBadgeText}>AW25 / Drop 04</Text>
            </View>
          </View>

          {/* Hero Bottom Information */}
          <View style={styles.heroBottomContent}>
            <Text style={styles.heroEyebrow}>CURATED LOOKBOOK</Text>
            <Text style={styles.heroTitle}>Refined Minimalism for the Modern Era</Text>
            <Text style={styles.heroDescription} numberOfLines={2}>
              Structured silhouettes, breathable raw silks, and oversized tailoring designed for
              effortless sophistication.
            </Text>

            {/* Actions & Bookmark */}
            <View style={styles.heroActionsRow}>
              <Pressable
                style={styles.heroShopButton}
                onPress={() => triggerToast('Opening AW25 Capsule collection')}>
                <Text style={styles.heroShopButtonText}>SHOP THE CAPSULE</Text>
                <SnitchIcon name="arrow_forward" size={15} color={SnitchColors.textPrimary} />
              </Pressable>

              <Pressable
                style={[styles.heroBookmarkButton, isBookmarked && styles.heroBookmarkActive]}
                onPress={() => {
                  setIsBookmarked(!isBookmarked);
                  triggerToast(isBookmarked ? 'Removed from saved capsules' : 'Capsule bookmarked');
                }}
                accessibilityLabel="Bookmark Capsule">
                <SnitchIcon
                  name={isBookmarked ? 'bookmark' : 'bookmark_border'}
                  size={19}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>

            {/* Carousel Pagination Dots */}
            <View style={styles.heroDotsContainer}>
              <View style={[styles.heroDot, styles.heroDotActive]} />
              <View style={styles.heroDot} />
              <View style={styles.heroDot} />
              <View style={styles.heroDot} />
            </View>
          </View>
        </View>

        {/* Horizontal Category Chips */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Pressable
                  key={cat}
                  style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(cat)}>
                  <Text
                    style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Feed Header Controls */}
        <View style={styles.feedHeader}>
          <View style={styles.feedHeaderLeft}>
            <Text style={styles.feedTitle}>Curated Drops</Text>
            <View style={styles.itemsBadge}>
              <Text style={styles.itemsBadgeText}>{filteredProducts.length} items</Text>
            </View>
          </View>

          <Pressable style={styles.sortButton} onPress={handleNextSort}>
            <Text style={styles.sortLabel}>Sort:</Text>
            <Text style={styles.sortValue}>{SORT_OPTIONS[sortIndex]}</Text>
            <SnitchIcon name="expand_more" size={16} color={SnitchColors.textPrimary} />
          </Pressable>
        </View>

        {/* 2-Column Product Grid */}
        <View style={styles.productGrid}>
          {filteredProducts.map((product) => {
            const isWishlisted = !!wishlist[product.id];

            return (
              <View key={product.id} style={styles.productCard}>
                {/* Product Image Container */}
                <View style={styles.productImageWrapper}>
                  <Image
                    source={{ uri: product.image }}
                    style={StyleSheet.absoluteFillObject}
                    contentFit="cover"
                  />

                  {/* Top Badges */}
                  {product.badge && (
                    <View
                      style={[
                        styles.productBadge,
                        product.badgeType === 'primary' && styles.productBadgePrimary,
                        product.badgeType === 'neutral' && styles.productBadgeNeutral,
                        product.badgeType === 'premium' && styles.productBadgePremium,
                      ]}>
                      <Text
                        style={[
                          styles.productBadgeText,
                          product.badgeType === 'primary' && styles.productBadgeTextPrimary,
                        ]}>
                        {product.badge}
                      </Text>
                    </View>
                  )}

                  {/* Photo Counter Pill */}
                  <View style={styles.counterBadge}>
                    <Text style={styles.counterBadgeText}>{product.counter}</Text>
                  </View>

                  {/* Wishlist Top Right Button */}
                  <Pressable
                    style={styles.wishlistButton}
                    onPress={() => toggleWishlist(product.id, product.title)}
                    accessibilityLabel="Wishlist">
                    <SnitchIcon
                      name={isWishlisted ? 'favorite' : 'favorite_border'}
                      size={16}
                      color={isWishlisted ? SnitchColors.error : SnitchColors.textPrimary}
                    />
                  </Pressable>

                  {/* Quick Add To Bag Floating Button */}
                  <Pressable
                    style={styles.quickAddButton}
                    onPress={() => handleAddToCart(product)}
                    accessibilityLabel={`Add ${product.title} to bag`}>
                    <SnitchIcon
                      name="shopping_bag"
                      size={17}
                      color={SnitchColors.textPrimary}
                    />
                  </Pressable>
                </View>

                {/* Metadata */}
                <View style={styles.productInfo}>
                  {/* Swatches */}
                  <View style={styles.swatchesRow}>
                    {product.swatches.map((colorHex, idx) => (
                      <View
                        key={idx}
                        style={[styles.colorSwatch, { backgroundColor: colorHex }]}
                      />
                    ))}
                    {product.extraSwatchesCount && (
                      <Text style={styles.extraSwatchesText}>+{product.extraSwatchesCount}</Text>
                    )}
                  </View>

                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productSubtitle} numberOfLines={1}>
                    {product.subtitle}
                  </Text>

                  {/* Ratings */}
                  <View style={styles.ratingRow}>
                    <SnitchIcon name="star" size={13} color={SnitchColors.ratingStar} />
                    <Text style={styles.ratingNumber}>{product.rating}</Text>
                    <Text style={styles.ratingCount}>({product.reviews})</Text>
                  </View>

                  {/* Pricing */}
                  <View style={styles.priceRow}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>₹{product.price.toLocaleString()}</Text>
                      {product.originalPrice && (
                        <Text style={styles.strikePrice}>
                          ₹{product.originalPrice.toLocaleString()}
                        </Text>
                      )}
                    </View>

                    {product.discount && (
                      <Text
                        style={[
                          styles.discountText,
                          product.discount === 'PREMIUM' && styles.premiumDiscountText,
                        ]}>
                        {product.discount}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Editorial Spotlight Banner */}
        <View style={styles.spotlightCard}>
          <View style={styles.spotlightHeader}>
            <Text style={styles.spotlightTag}>STUDIO PERSPECTIVE</Text>
            <SnitchIcon name="style" size={18} color={SnitchColors.textSecondary} />
          </View>

          <Text style={styles.spotlightTitle}>The Art of Everyday Tailoring</Text>
          <Text style={styles.spotlightDescription}>
            Unstructured shoulder lines, open-weave linens, and breathable tailoring crafted for
            effortless everyday comfort.
          </Text>

          <Pressable
            style={styles.spotlightLink}
            onPress={() => triggerToast('Opening SNITCH Design Journal')}>
            <Text style={styles.spotlightLinkText}>Read the Design Journal</Text>
            <SnitchIcon name="north_east" size={17} color={SnitchColors.secondary} />
          </Pressable>
        </View>

        {/* Flash Service Micro-Pillars */}
        <View style={styles.pillarsContainer}>
          <View style={styles.pillarItem}>
            <SnitchIcon name="local_shipping" size={20} color={SnitchColors.textPrimary} />
            <Text style={styles.pillarTitle}>EXPRESS DISPATCH</Text>
            <Text style={styles.pillarSubtitle}>Under 48 Hrs</Text>
          </View>

          <View style={[styles.pillarItem, styles.pillarBorder]}>
            <SnitchIcon name="cached" size={20} color={SnitchColors.textPrimary} />
            <Text style={styles.pillarTitle}>HASSLE-FREE</Text>
            <Text style={styles.pillarSubtitle}>7-Day Doorstep Returns</Text>
          </View>

          <View style={styles.pillarItem}>
            <SnitchIcon name="verified" size={20} color={SnitchColors.textPrimary} />
            <Text style={styles.pillarTitle}>100% COTTON</Text>
            <Text style={styles.pillarSubtitle}>Certified Mill Fabrics</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: SnitchColors.primary,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.sm,
    borderRadius: SnitchRadius.full,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  toastText: {
    color: SnitchColors.onPrimary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  header: {
    height: 56,
    paddingHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SnitchColors.canvas,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: SnitchColors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandWordmark: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2.5,
    color: SnitchColors.textPrimary,
  },
  headerDivider: {
    width: 1,
    height: 14,
    backgroundColor: SnitchColors.borderVariant,
  },
  headerSub: {
    fontSize: 14,
    fontWeight: '500',
    color: SnitchColors.textSecondary,
    letterSpacing: 0.2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: SnitchRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: SnitchColors.discountBadge,
  },
  avatarContainer: {
    marginLeft: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SnitchSpacing.md,
  },

  // Search & Filter
  searchSection: {
    paddingHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    marginBottom: SnitchSpacing.gutter,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.full,
    paddingHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SnitchSpacing.sm,
    fontSize: 13,
    color: SnitchColors.textPrimary,
    fontWeight: '400',
  },
  micButton: {
    padding: 4,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.border,
  },

  // Hero Card
  heroCard: {
    marginHorizontal: SnitchSpacing.gutter,
    height: 380,
    borderRadius: SnitchRadius.xl,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: SnitchSpacing.gutter,
    backgroundColor: SnitchColors.surfaceContainerHigh,
    marginBottom: SnitchSpacing.gutter,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  limitedEditionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SnitchRadius.full,
  },
  limitedEditionText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: SnitchColors.textPrimary,
  },
  dropBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SnitchRadius.full,
  },
  dropBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  heroBottomContent: {
    zIndex: 2,
    gap: 6,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: '700',
    lineHeight: 28,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  heroDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.88)',
    marginBottom: 4,
  },
  heroActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  heroShopButton: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: SnitchRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  heroShopButtonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
    color: SnitchColors.textPrimary,
  },
  heroBookmarkButton: {
    width: 42,
    height: 42,
    borderRadius: SnitchRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBookmarkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  heroDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  heroDot: {
    width: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  heroDotActive: {
    width: 20,
    backgroundColor: '#FFFFFF',
  },

  // Categories
  categoriesSection: {
    marginBottom: SnitchSpacing.gutter,
  },
  categoriesScroll: {
    paddingHorizontal: SnitchSpacing.gutter,
    gap: 8,
  },
  categoryChip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerHighest,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.borderVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: SnitchColors.primary,
    borderColor: SnitchColors.primary,
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    letterSpacing: 0.6,
  },
  categoryChipTextActive: {
    color: SnitchColors.onPrimary,
  },

  // Feed Header
  feedHeader: {
    paddingHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SnitchSpacing.md,
  },
  feedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedTitle: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: SnitchColors.textPrimary,
  },
  itemsBadge: {
    backgroundColor: SnitchColors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SnitchRadius.full,
  },
  itemsBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: SnitchColors.textSecondary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: SnitchRadius.sm,
  },
  sortLabel: {
    fontSize: 12,
    color: SnitchColors.textMuted,
    letterSpacing: 0.3,
  },
  sortValue: {
    fontSize: 12,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },

  // Product Grid
  productGrid: {
    paddingHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SnitchSpacing.gutter,
    marginBottom: SnitchSpacing.xl,
  },
  productCard: {
    width: '48.2%',
    backgroundColor: SnitchColors.surfaceCard,
    borderRadius: SnitchRadius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.border,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  productImageWrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: SnitchColors.surfaceContainerLow,
    position: 'relative',
    overflow: 'hidden',
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: SnitchRadius.full,
    zIndex: 2,
  },
  productBadgePrimary: {
    backgroundColor: SnitchColors.primary,
  },
  productBadgeNeutral: {
    backgroundColor: SnitchColors.surfaceContainerHighest,
  },
  productBadgePremium: {
    backgroundColor: SnitchColors.surfaceContainerHighest,
  },
  productBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: SnitchColors.textPrimary,
  },
  productBadgeTextPrimary: {
    color: SnitchColors.onPrimary,
  },
  counterBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(18, 18, 18, 0.72)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: SnitchRadius.full,
    zIndex: 2,
  },
  counterBadgeText: {
    fontSize: 8.5,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 36,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAddButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  swatchesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 5,
  },
  colorSwatch: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  extraSwatchesText: {
    fontSize: 9,
    color: SnitchColors.textMuted,
    marginLeft: 2,
    fontWeight: '500',
  },
  productTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    lineHeight: 16,
  },
  productSubtitle: {
    fontSize: 10.5,
    color: SnitchColors.textMuted,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 6,
  },
  ratingNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  ratingCount: {
    fontSize: 9.5,
    color: SnitchColors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: SnitchColors.surfaceContainerHigh,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.2,
  },
  strikePrice: {
    fontSize: 10.5,
    color: SnitchColors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: SnitchColors.discountBadge,
  },
  premiumDiscountText: {
    color: SnitchColors.secondary,
    letterSpacing: 0.5,
  },

  // Editorial Spotlight Banner
  spotlightCard: {
    marginHorizontal: SnitchSpacing.gutter,
    backgroundColor: SnitchColors.surfaceContainer,
    borderRadius: SnitchRadius.lg,
    padding: SnitchSpacing.gutter,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.border,
    marginBottom: SnitchSpacing.xl,
    gap: 6,
  },
  spotlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: SnitchColors.secondaryMuted,
  },
  spotlightTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    letterSpacing: -0.2,
    marginTop: 2,
  },
  spotlightDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: SnitchColors.textSecondary,
  },
  spotlightLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  spotlightLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: SnitchColors.secondary,
  },

  // Flash Service Pillars
  pillarsContainer: {
    marginHorizontal: SnitchSpacing.gutter,
    flexDirection: 'row',
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderRadius: SnitchRadius.lg,
    paddingVertical: SnitchSpacing.md,
    paddingHorizontal: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.border,
    marginBottom: SnitchSpacing.xl,
  },
  pillarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  pillarBorder: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: SnitchColors.borderVariant,
  },
  pillarTitle: {
    fontSize: 9.5,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
    marginTop: 2,
  },
  pillarSubtitle: {
    fontSize: 8.5,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
});
