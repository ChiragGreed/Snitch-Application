
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Switch, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';
import { SnitchIcon } from '@/components/snitch-icon';

import useProducts from '@/features/Products/hooks/useProducts';
import useWishList from '@/features/Wishlist/hooks/useWishList';
import useCart from '@/features/Cart/hooks/useCart';
import SnitchHeader from '@/shared/components/SnitchHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getCategoriesApi } from '@/features/Products/services/productApi';
import ProductCard from '@/features/Products/components/ProductCard';
import Toast from '@/shared/components/Toast';

const SORT_OPTIONS = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
];

const PRICE_FILTERS = [
  { label: 'Under ₹1,000', value: 'under-1000', max: 999 },
  { label: '₹1,000–₹2,499', value: '1000-2499', min: 1000, max: 2499 },
  { label: '₹2,500–₹4,999', value: '2500-4999', min: 2500, max: 4999 },
  { label: '₹5,000+', value: '5000-plus', min: 5000 },
];

const NEW_ARRIVALS_DAYS = 30;
const ALL_CATEGORY_ID = '__all__';

const getId = (value) => {
  if (!value) return '';
  return String(typeof value === 'object' ? value._id || value.id : value);
};

const formatName = (value = '') =>
  value.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

function FilterAccordion({ title, summary, expanded, onPress, children }) {
  return (
    <View style={styles.filterAccordion}>
      <Pressable
        style={styles.filterAccordionHeader}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
      >
        <View style={styles.filterAccordionHeading}>
          <Text style={styles.filterPanelTitle}>{title}</Text>
          {!expanded && summary ? (
            <Text style={styles.filterAccordionSummary}>{summary}</Text>
          ) : null}
        </View>
        <SnitchIcon
          name={expanded ? 'expand_less' : 'expand_more'}
          size={20}
          color={SnitchColors.textSecondary}
        />
      </Pressable>
      {expanded ? (
        <View style={styles.filterAccordionContent}>{children}</View>
      ) : null}
    </View>
  );
}

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { getProductsHandler } = useProducts();
  const { wishListItems, isInList, toggleListHandler } = useWishList();
  const { addToCartHandler } = useCart();

  const products = useSelector((state) => state.products.AllProducts);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);

  const router = useRouter();
  const { search: searchParam } = useLocalSearchParams();
  const searchParamValue = Array.isArray(searchParam)
    ? searchParam[0] || ''
    : typeof searchParam === 'string'
      ? searchParam
      : '';
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  const [selectedParentId, setSelectedParentId] = useState(ALL_CATEGORY_ID);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParamValue);
  const searchInputRef = useRef(null);
  const [sortIndex, setSortIndex] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expandedFilterSection, setExpandedFilterSection] = useState('sort');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [newArrivalsOnly, setNewArrivalsOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('default');

  useEffect(() => {
    setSearchQuery(searchParamValue);
    setSelectedParentId(ALL_CATEGORY_ID);
    setSelectedChildId(null);
  }, [searchParamValue]);

  useEffect(() => {
    getProductsHandler();
  }, [getProductsHandler]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoryError(null);

        const data = await getCategoriesApi(); 

        if (isMounted) {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (isMounted) {
          setCategoryError(
            error?.response?.data?.message || 'Unable to load categories.'
          );
        }
      } finally {
        if (isMounted) setCategoriesLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const categoriesWithProducts = useMemo(
    () =>
      new Set(
        products.flatMap((product) =>
          (product.category || []).map(getId).filter(Boolean)
        )
      ),
    [products]
  );

  const parentCategories = useMemo(
    () =>
      categories
        .filter((category) => !category.parent)
        .filter((category) => {
          const parentId = getId(category);

          return (
            categoriesWithProducts.has(parentId) ||
            categories.some(
              (child) =>
                getId(child.parent) === parentId &&
                categoriesWithProducts.has(getId(child))
            )
          );
        }),
    [categories, categoriesWithProducts]
  );

  const selectedParent = useMemo(
    () => parentCategories.find(
      (category) => getId(category) === selectedParentId
    ),
    [parentCategories, selectedParentId]
  );

  const childCategories = useMemo(
    () => categories.filter(
      (category) =>
        getId(category.parent) === selectedParentId &&
        categoriesWithProducts.has(getId(category))
    ),
    [categories, selectedParentId, categoriesWithProducts]
  );

  const selectedChild = useMemo(
    () => childCategories.find(
      (category) => getId(category) === selectedChildId
    ),
    [childCategories, selectedChildId]
  );

  // Keep the all-products selection while categories load.
  useEffect(() => {
    if (parentCategories.length === 0) {
      if (selectedParentId !== ALL_CATEGORY_ID) {
        setSelectedParentId(ALL_CATEGORY_ID);
        setSelectedChildId(null);
      }
      return;
    }

    if (selectedParentId === ALL_CATEGORY_ID) return;

    if (!parentCategories.some((category) => getId(category) === selectedParentId)) {
      setSelectedParentId(getId(parentCategories[0]));
      setSelectedChildId(null);
      return;
    }

    if (
      selectedChildId &&
      !childCategories.some((category) => getId(category) === selectedChildId)
    ) {
      setSelectedChildId(null);
    }
  }, [parentCategories, selectedParentId, selectedChildId, childCategories]);

  const visibleCategoryIds = useMemo(() => {
    if (selectedParentId === ALL_CATEGORY_ID) return [];
    if (!selectedParentId) return [];

    if (selectedChildId) {
      return [selectedChildId];
    }

    if (childCategories.length > 0) {
      return [
        selectedParentId,
        ...childCategories.map((category) => getId(category)),
      ];
    }

    return [selectedParentId];
  }, [selectedParentId, selectedChildId, childCategories]);

  const filteredProducts = useMemo(() => {
    const now = Date.now();
    const newArrivalsCutoff = now - NEW_ARRIVALS_DAYS * 24 * 60 * 60 * 1000;
    const priceFilter = PRICE_FILTERS.find(
      (option) => option.value === selectedPriceRange
    );

    let result = products.filter((product) => {
      const productCategoryIds = (product.category || []).map(getId);

      const matchesCategory =
        visibleCategoryIds.length === 0 ||
        productCategoryIds.some((id) => visibleCategoryIds.includes(id));

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.title?.toLowerCase().includes(query) ||
        product.subtitle?.toLowerCase().includes(query);

      const variants = product.variants || [];
      const hasStock =
        variants.length === 0 ||
        variants.some((variant) => Number(variant.stock) > 0);

      const matchesStock = !inStockOnly || hasStock;

      const price = Number(product.price);
      const matchesPrice =
        !priceFilter ||
        (Number.isFinite(price) &&
          (priceFilter.min === undefined || price >= priceFilter.min) &&
          (priceFilter.max === undefined || price <= priceFilter.max));

      const createdAt = new Date(product.createdAt).getTime();
      const matchesNewArrivals =
        !newArrivalsOnly ||
        (Number.isFinite(createdAt) &&
          createdAt >= newArrivalsCutoff &&
          createdAt <= now);

      return (
        matchesCategory &&
        matchesSearch &&
        matchesStock &&
        matchesPrice &&
        matchesNewArrivals
      );
    });

    if (sortIndex === 1) {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortIndex === 2) {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    products,
    visibleCategoryIds,
    searchQuery,
    inStockOnly,
    sortIndex,
    selectedPriceRange,
    newArrivalsOnly,
  ]);

  const activeFilterCount =
    (sortIndex !== 0 ? 1 : 0) +
    (selectedPriceRange ? 1 : 0) +
    (newArrivalsOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const clearFilters = () => {
    setSortIndex(0);
    setSelectedPriceRange(null);
    setNewArrivalsOnly(false);
    setInStockOnly(false);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilterSection((current) => (current === section ? null : section));
  };

  const pageTitle =
    selectedParentId === ALL_CATEGORY_ID
      ? 'All Products'
      : selectedChild
        ? formatName(selectedChild.name)
        : selectedParent
          ? formatName(selectedParent.name)
          : 'Explore';

  const triggerToast = (message, type = 'default') => {
    setToastMessage(message);
    setToastType(type);
  };

  const toggleWishlist = (product) => {
    const added = toggleListHandler(product);
    triggerToast(
      added ? 'Added to wishlist' : 'Removed from wishlist',
      added ? 'success' : 'default'
    );
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    addToCartHandler(product);
    triggerToast('Added to bag', 'success');
  };

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


  const loading = categoriesLoading || productStatus === 'idle' || productStatus === 'loading';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} type={toastType} top={insets.top + 8} />

      <SnitchHeader
        title="Explore"
        onToast={triggerToast}
        onSearch={() => searchInputRef.current?.focus()}
        onNotifications={() => triggerToast('No new notifications')}
        onProfile={() => router.push('/profile')}
      />

      {/* Search header */}
      <View style={styles.header}>

        <View style={styles.headerSearch}>
          <SnitchIcon name="search" size={19} color={SnitchColors.textPrimary} />
          <TextInput
            ref={searchInputRef}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products"
            placeholderTextColor={SnitchColors.textLight}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <SnitchIcon name="close" size={18} color={SnitchColors.textMuted} />
            </Pressable>
          )}
        </View>
        <Pressable
          style={styles.filterIconButton}
          onPress={() => {
            if (!filtersOpen) setExpandedFilterSection('sort');
            setFiltersOpen(!filtersOpen);
          }}
          accessibilityRole="button"
          accessibilityLabel="Filter and sort"
          accessibilityState={{ expanded: filtersOpen }}
        >
          <SnitchIcon name="tune" size={19} color={SnitchColors.textPrimary} />
          {activeFilterCount > 0 ? (
            <View style={styles.filterCountBadge}>
              <Text style={styles.filterCountText}>{activeFilterCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Parent category tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.parentTabs}
        >
          <Pressable
            onPress={() => {
              setSelectedParentId(ALL_CATEGORY_ID);
              setSelectedChildId(null);
            }}
            style={[
              styles.parentTab,
              selectedParentId === ALL_CATEGORY_ID && styles.parentTabActive,
            ]}
          >
            <Text
              style={[
                styles.parentTabText,
                selectedParentId === ALL_CATEGORY_ID && styles.parentTabTextActive,
              ]}
            >
              All
            </Text>
          </Pressable>

          {parentCategories.map((category) => {
            const id = getId(category);
            const active = selectedParentId === id;

            return (
              <Pressable
                key={id}
                onPress={() => {
                  setSelectedParentId(id);
                  setSelectedChildId(null);
                }}
                style={[styles.parentTab, active && styles.parentTabActive]}
              >
                <Text
                  style={[
                    styles.parentTabText,
                    active && styles.parentTabTextActive,
                  ]}
                >
                  {formatName(category.name)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Dynamic category heading */}
        <View style={styles.heading}>
          <View>
            <Text style={styles.pageTitle}>{pageTitle}</Text>
            <Text style={styles.pageSubtitle}>
              {filteredProducts.length} Curated Silhouettes
            </Text>
          </View>

          <View style={styles.newDropBadge}>
            <View style={styles.newDropDot} />
            <Text style={styles.newDropText}>COLLECTION</Text>
          </View>
        </View>

        {/* Subcategories */}
        {childCategories.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subcategoryList}
          >
            <Pressable
              onPress={() => setSelectedChildId(null)}
              style={[
                styles.subcategoryChip,
                !selectedChildId && styles.subcategoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.subcategoryText,
                  !selectedChildId && styles.subcategoryTextActive,
                ]}
              >
                All
              </Text>
            </Pressable>

            {childCategories.map((category) => {
              const id = getId(category);
              const active = selectedChildId === id;

              return (
                <Pressable
                  key={id}
                  onPress={() => setSelectedChildId(id)}
                  style={[
                    styles.subcategoryChip,
                    active && styles.subcategoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.subcategoryText,
                      active && styles.subcategoryTextActive,
                    ]}
                  >
                    {formatName(category.name)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        {filtersOpen ? (
          <View style={styles.filterPanel}>
            <View style={styles.filterPanelHeader}>
              <Text style={styles.filterPanelTitle}>Filters</Text>
              <Pressable onPress={clearFilters} accessibilityRole="button">
                <Text style={styles.clearFiltersText}>Clear all</Text>
              </Pressable>
            </View>

            <FilterAccordion
              title="Sort by"
              summary={SORT_OPTIONS[sortIndex]}
              expanded={expandedFilterSection === 'sort'}
              onPress={() => toggleFilterSection('sort')}
            >
              <View style={styles.filterChoices}>
                {SORT_OPTIONS.map((option, index) => {
                  const selected = sortIndex === index;

                  return (
                    <Pressable
                      key={option}
                      style={[
                        styles.sortChoice,
                        selected && styles.sortChoiceSelected,
                      ]}
                      onPress={() => setSortIndex(index)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.sortChoiceText,
                          selected && styles.sortChoiceTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </FilterAccordion>

            <FilterAccordion
              title="Price"
              summary={
                PRICE_FILTERS.find(
                  (option) => option.value === selectedPriceRange
                )?.label || 'Any price'
              }
              expanded={expandedFilterSection === 'price'}
              onPress={() => toggleFilterSection('price')}
            >
              <View style={styles.filterChoices}>
                {PRICE_FILTERS.map((option) => {
                  const selected = selectedPriceRange === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      style={[
                        styles.priceChoice,
                        selected && styles.priceChoiceSelected,
                      ]}
                      onPress={() =>
                        setSelectedPriceRange(selected ? null : option.value)
                      }
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: selected }}
                    >
                      <Text
                        style={[
                          styles.priceChoiceText,
                          selected && styles.priceChoiceTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </FilterAccordion>

            <FilterAccordion
              title="New Arrivals"
              summary={newArrivalsOnly ? 'On' : 'Off'}
              expanded={expandedFilterSection === 'arrivals'}
              onPress={() => toggleFilterSection('arrivals')}
            >
              <View style={styles.filterSwitchRow}>
                <View style={styles.filterSwitchCopy}>
                  <Text style={styles.filterSwitchTitle}>New Arrivals</Text>
                  <Text style={styles.filterSwitchDescription}>
                    Added in the last {NEW_ARRIVALS_DAYS} days
                  </Text>
                </View>
                <Switch
                  value={newArrivalsOnly}
                  onValueChange={setNewArrivalsOnly}
                  trackColor={{
                    false: SnitchColors.borderVariant,
                    true: SnitchColors.textPrimary,
                  }}
                  thumbColor="#FFFFFF"
                  accessibilityLabel="New arrivals only"
                />
              </View>
            </FilterAccordion>

            <FilterAccordion
              title="Availability"
              summary={inStockOnly ? 'In stock only' : 'All products'}
              expanded={expandedFilterSection === 'availability'}
              onPress={() => toggleFilterSection('availability')}
            >
              <View style={styles.filterSwitchRow}>
                <View style={styles.filterSwitchCopy}>
                  <Text style={styles.filterSwitchTitle}>In-Stock Only</Text>
                  <Text style={styles.filterSwitchDescription}>
                    Show available items
                  </Text>
                </View>
                <Switch
                  value={inStockOnly}
                  onValueChange={setInStockOnly}
                  trackColor={{
                    false: SnitchColors.borderVariant,
                    true: SnitchColors.textPrimary,
                  }}
                  thumbColor="#FFFFFF"
                  accessibilityLabel="In-stock products only"
                />
              </View>
            </FilterAccordion>
          </View>
        ) : null}

        <View style={styles.stockRow}>
          <Text style={styles.resultCount}>
            SHOWING {filteredProducts.length}
          </Text>
        </View>

        {/* Product grid */}
        {loading ? (
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" color={SnitchColors.textPrimary} />
            <Text style={styles.messageText}>Loading collection...</Text>
          </View>
        ) : categoryError ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{categoryError}</Text>
          </View>
        ) : productStatus === 'failed' ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              {productError || 'Unable to load products.'}
            </Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={styles.messageContainer}>
            <SnitchIcon name="search_off" size={32} color={SnitchColors.textLight} />
            <Text style={styles.messageTitle}>No products found</Text>
            <Text style={styles.messageText}>
              Try another category or search.
            </Text>
          </View>
        ) : (
          <View style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isInList(product)}
                onToggleWishlist={toggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </View>
        )}

        {/* Editorial footer */}
        {!loading && filteredProducts.length > 0 && (
          <View style={styles.editorial}>
            <View style={styles.editorialDivider} />
            <Text style={styles.editorialEyebrow}>
              THE SNITCH EDIT
            </Text>
            <Text style={styles.editorialTitle}>
              Contemporary silhouettes engineered for effortless movement.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: 12,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  brand: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
    color: SnitchColors.textPrimary,
  },
  headerSearch: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 12,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  filterIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  filterCountBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.textPrimary,
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: 13,
    color: SnitchColors.textPrimary,
  },

  parentTabs: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: 15,
    gap: 22,
  },
  parentTab: {
    paddingBottom: 7,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  parentTabActive: {
    borderBottomColor: SnitchColors.textPrimary,
  },
  parentTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textMuted,
  },
  parentTabTextActive: {
    color: SnitchColors.textPrimary,
  },

  heading: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingTop: 9,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    marginTop: 3,
  },
  newDropBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
  },
  newDropDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SnitchColors.secondaryMuted,
  },
  newDropText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: SnitchColors.textSecondary,
  },

  subcategoryList: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingBottom: 15,
    gap: 9,
  },
  subcategoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  subcategoryChipActive: {
    backgroundColor: SnitchColors.textPrimary,
    borderColor: SnitchColors.textPrimary,
  },
  subcategoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.textSecondary,
  },
  subcategoryTextActive: {
    color: '#FFFFFF',
  },

  filterPanel: {
    marginHorizontal: SnitchSpacing.gutter,
    marginBottom: 12,
    padding: SnitchSpacing.gutter,
    gap: 0,
    borderRadius: SnitchRadius.lg,
    backgroundColor: SnitchColors.surfaceCard,
    borderWidth: 1,
    borderColor: SnitchColors.border,
  },
  filterPanelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SnitchSpacing.sm,
  },
  filterPanelTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: SnitchColors.textPrimary,
  },
  filterAccordion: {
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
  },
  filterAccordionHeader: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.sm,
  },
  filterAccordionHeading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SnitchSpacing.sm,
  },
  filterAccordionSummary: {
    flexShrink: 1,
    fontSize: 11,
    color: SnitchColors.textMuted,
    textAlign: 'right',
  },
  filterAccordionContent: {
    paddingBottom: SnitchSpacing.md,
  },
  clearFiltersText: {
    fontSize: 12,
    fontWeight: '600',
    color: SnitchColors.secondaryMuted,
  },
  filterChoices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SnitchSpacing.sm,
  },
  sortChoice: {
    paddingHorizontal: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.sm,
    borderRadius: SnitchRadius.full,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    backgroundColor: SnitchColors.canvas,
  },
  sortChoiceSelected: {
    borderColor: SnitchColors.textPrimary,
    backgroundColor: SnitchColors.textPrimary,
  },
  sortChoiceText: {
    fontSize: 12,
    color: SnitchColors.textSecondary,
  },
  sortChoiceTextSelected: {
    color: '#FFFFFF',
  },
  priceChoice: {
    paddingHorizontal: SnitchSpacing.md,
    paddingVertical: SnitchSpacing.sm,
    borderRadius: SnitchRadius.full,
    borderWidth: 1,
    borderColor: SnitchColors.border,
    backgroundColor: SnitchColors.canvas,
  },
  priceChoiceSelected: {
    borderColor: SnitchColors.textPrimary,
    backgroundColor: SnitchColors.textPrimary,
  },
  priceChoiceText: {
    fontSize: 12,
    color: SnitchColors.textSecondary,
  },
  priceChoiceTextSelected: {
    color: '#FFFFFF',
  },
  filterSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterSwitchCopy: {
    gap: SnitchSpacing.xs,
  },
  filterSwitchTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  filterSwitchDescription: {
    fontSize: 11,
    color: SnitchColors.textMuted,
  },

  stockRow: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resultCount: {
    fontSize: 10,
    fontWeight: '700',
    color: SnitchColors.secondaryMuted,
    letterSpacing: 0.5,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SnitchSpacing.gutter,
    rowGap: 18,
    marginTop: 3,
  },

  messageContainer: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: 10,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
  },
  messageText: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },

  editorial: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 55,
    paddingBottom: 35,
  },
  editorialDivider: {
    width: 45,
    height: 2,
    backgroundColor: SnitchColors.border,
    marginBottom: 22,
  },
  editorialEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: SnitchColors.secondaryMuted,
    marginBottom: 12,
  },
  editorialTitle: {
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '500',
    color: SnitchColors.textPrimary,
    textAlign: 'center',
  },
});
