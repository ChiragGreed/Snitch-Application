
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Switch, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';
import { SnitchIcon } from '@/components/snitch-icon';

import useProducts from '@/features/Products/hooks/useProducts';
import { getCategoriesApi } from '@/features/Products/services/productApi';
import ProductCard from '@/features/Products/components/ProductCard';
import Toast from '@/shared/components/Toast';

const SORT_OPTIONS = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
];

const getId = (value) => {
  if (!value) return '';
  return String(typeof value === 'object' ? value._id || value.id : value);
};

const formatName = (value = '') =>
  value.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { getProductsHandler } = useProducts();

  const products = useSelector((state) => state.products.AllProducts);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  const [selectedParentId, setSelectedParentId] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

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

  // Select the first available parent category when categories load.
  useEffect(() => {
    if (parentCategories.length === 0) {
      setSelectedParentId(null);
      setSelectedChildId(null);
      return;
    }

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

      return matchesCategory && matchesSearch && matchesStock;
    });

    if (sortIndex === 1) {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortIndex === 2) {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, visibleCategoryIds, searchQuery, inStockOnly, sortIndex]);

  const pageTitle = selectedChild
    ? formatName(selectedChild.name)
    : selectedParent
      ? formatName(selectedParent.name)
      : 'Explore';

  const triggerToast = (message) => {
    setToastMessage(message);
  };

  const toggleWishlist = (id, name) => {
    setWishlist((previous) => {
      const isSaved = !previous[id];

      triggerToast(
        isSaved
          ? `Saved "${name}" to wishlist`
          : `Removed "${name}" from wishlist`
      );

      return { ...previous, [id]: isSaved };
    });
  };

  const handleAddToCart = (product) => {
    triggerToast(`Added ${product.title} to bag`);
  };

  const loading = categoriesLoading || productStatus === 'idle' || productStatus === 'loading';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} top={insets.top + 8} />

      {/* Search header */}
      <View style={styles.header}>
        <Text style={styles.brand}>SNITCH</Text>

        <View style={styles.headerSearch}>
          <SnitchIcon name="search" size={19} color={SnitchColors.textPrimary} />
          <TextInput
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

        {/* Sorting and filters */}
        <View style={styles.filterRow}>
          <Pressable
            style={styles.sortButton}
            onPress={() =>
              setSortIndex((current) => (current + 1) % SORT_OPTIONS.length)
            }
          >
            <SnitchIcon name="tune" size={17} color="#FFFFFF" />
            <Text style={styles.sortButtonText}>
              Sort: {SORT_OPTIONS[sortIndex]}
            </Text>
            <SnitchIcon name="expand_more" size={18} color="#FFFFFF" />
          </Pressable>
        </View>

        <View style={styles.stockRow}>
          <View style={styles.stockToggle}>
            <Switch
              value={inStockOnly}
              onValueChange={setInStockOnly}
              trackColor={{
                false: SnitchColors.borderVariant,
                true: SnitchColors.textPrimary,
              }}
              thumbColor="#FFFFFF"
            />
            <Text style={styles.stockText}>In-Stock Only</Text>
          </View>

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
                isWishlisted={!!wishlist[product.id]}
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

  filterRow: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingBottom: 12,
  },
  sortButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SnitchColors.textPrimary,
    borderRadius: SnitchRadius.full,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  stockRow: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stockToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stockText: {
    fontSize: 12,
    color: SnitchColors.textSecondary,
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
