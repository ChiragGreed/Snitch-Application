
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES, SORT_OPTIONS } from '@/features/Home/data/homeData';
import useCart from '@/features/Cart/hooks/useCart';
import useWishList from '@/features/Wishlist/hooks/useWishList';

import SnitchHeader from '@/shared/components/SnitchHeader';
import HeroBanner from '@/features/Home/components/HeroBanner';
import CategoryChips from '@/features/Home/components/CategoryChips';
import EditorialSections from '@/features/Home/components/EditorialSections';

import ProductGrid from '@/features/Products/components/ProductGrid';
import useProducts from '@/features/Products/hooks/useProducts';

import SearchBar from '@/features/Home/components/SearchBar';
import Toast from '@/shared/components/Toast';

import useAuth from '@/features/Authentication/hooks/useAuth';

import { styles } from '@/features/Home/styles/homeStyles';
import { convertStackToolbarSpacerPropsToRNHeaderItem } from 'expo-router/build/layouts/stack-utils/toolbar/StackToolbarSpacer/index.js';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { getProductsHandler } = useProducts();
  const { addToCartHandler } = useCart();
  const { wishListItems, toggleListHandler } = useWishList();

  useEffect(() => {
    getProductsHandler();
  }, [getProductsHandler]);
  const productsData = useSelector((state) => state.products.AllProducts);

  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const loading = status === 'idle' || status === 'loading';

  // Home screen state
  const [selectedCategory, setSelectedCategory] = useState('ALL PIECES');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('default');

  // Toast notification
  const triggerToast = (message, type = 'default') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // Wishlist
  const toggleWishlist = (product) => {
    const added = toggleListHandler(product);
    triggerToast(
      added
        ? 'Added to wishlist'
        : 'Removed from wishlist',
      added ? 'success' : 'default'
    );
  };

  // Add to cart
  const handleAddToCart = (product) => {
    if (!product) return;
    addToCartHandler(product);
    triggerToast('Added to bag', 'success');
  };

  const handleSearchSubmit = () => {
    const query = searchQuery.trim();
    if (!query) return;

    router.push({ pathname: '/explore', params: { search: query } });
  };

  // Product filtering and sorting
  const filteredProducts = useMemo(() => {
    let products = productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'ALL PIECES' ||
        selectedCategory === 'NEW DROPS' ||
        product.category?.some(
          (category) =>
            category.toLowerCase() === selectedCategory.toLowerCase()
        );

      return matchesCategory;
    });

    const currentSort = SORT_OPTIONS[sortIndex];

    if (currentSort === 'Price: Low to High') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (currentSort === 'Price: High to Low') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (currentSort === 'Top Rated') {
      products = [...products].sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return products;
  }, [productsData, selectedCategory, sortIndex]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} type={toastType} top={insets.top + 54} />

      <SnitchHeader title="Home" onToast={triggerToast} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          sortMenuOpen={sortMenuOpen}
          onSort={() => setSortMenuOpen((open) => !open)}
        />

        {sortMenuOpen ? (
          <View style={styles.homeSortPanel}>
            <Text style={styles.homeSortTitle}>Sort by</Text>
            <View style={styles.homeSortOptions}>
              {SORT_OPTIONS.map((option, index) => {
                const selected = sortIndex === index;

                return (
                  <Pressable
                    key={option}
                    style={[
                      styles.homeSortOption,
                      selected && styles.homeSortOptionSelected,
                    ]}
                    onPress={() => setSortIndex(index)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                  >
                    <Text
                      style={[
                        styles.homeSortOptionText,
                        selected && styles.homeSortOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}

        <HeroBanner onToast={triggerToast} />

        <CategoryChips
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginTop: 12 }}>Loading products...</Text>
          </View>
        ) : error ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Text>Unable to load products.</Text>
            <Text style={{ marginTop: 6 }}>{error}</Text>
          </View>
        ) : filteredProducts.length === 0 ? (
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Text>No products found.</Text>
          </View>
        ) : (
          <ProductGrid
            products={filteredProducts}
            wishlist={wishListItems}
            onToggleWishlist={toggleWishlist}
            onAddToCart={handleAddToCart}
          />
        )}

        <EditorialSections onToast={triggerToast} />
      </ScrollView>
    </View>
  );
}