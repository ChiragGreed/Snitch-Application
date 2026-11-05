
import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES, SORT_OPTIONS } from '@/features/Home/data/homeData';
import { PRODUCTS_DATA } from '@/features/Products/DummyData/productsData';

import HomeHeader from '@/features/Home/components/HomeHeader';
import HeroBanner from '@/features/Home/components/HeroBanner';
import CategoryChips from '@/features/Home/components/CategoryChips';
import EditorialSections from '@/features/Home/components/EditorialSections';

import ProductGrid from '@/features/Products/components/ProductGrid';

import SearchBar from '@/shared/components/SearchBar';
import Toast from '@/shared/components/Toast';

import { styles } from '@/shared/styles/homeStyles';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Home screen state
  const [selectedCategory, setSelectedCategory] = useState('ALL PIECES');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [wishlist, setWishlist] = useState({});
  const [cartCount, setCartCount] = useState(2);
  const [toastMessage, setToastMessage] = useState(null);

  // Toast notification
  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2400);
  };

  // Wishlist
  const toggleWishlist = (id, name) => {
    setWishlist((previous) => {
      const next = !previous[id];

      triggerToast(
        next
          ? `Saved "${name}" to wishlist`
          : `Removed "${name}" from wishlist`
      );

      return { ...previous, [id]: next };
    });
  };

  // Add to cart
  const handleAddToCart = (product) => {
    setCartCount((count) => count + 1);
    triggerToast(`Added ${product.title} to bag`);
  };

  // Sorting
  const handleNextSort = () => {
    setSortIndex((index) => (index + 1) % SORT_OPTIONS.length);
  };

  // Product filtering and sorting
  const filteredProducts = useMemo(() => {
    let products = PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'ALL PIECES' ||
        selectedCategory === 'NEW DROPS' ||
        product.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    const currentSort = SORT_OPTIONS[sortIndex];

    if (currentSort === 'Price: Low to High') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (currentSort === 'Price: High to Low') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (currentSort === 'Top Rated') {
      products = [...products].sort((a, b) => b.rating - a.rating);
    }

    return products;
  }, [selectedCategory, searchQuery, sortIndex]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} top={insets.top + 54} />

      <HomeHeader onToast={triggerToast} />

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
          onToast={triggerToast}
          onSort={handleNextSort}
        />

        <HeroBanner onToast={triggerToast} />

        <CategoryChips
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <ProductGrid
          products={filteredProducts}
          sortOptions={SORT_OPTIONS}
          sortIndex={sortIndex}
          onNextSort={handleNextSort}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onAddToCart={handleAddToCart}
        />

        <EditorialSections onToast={triggerToast} />
      </ScrollView>
    </View>
  );
}