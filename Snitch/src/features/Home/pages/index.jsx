
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES, SORT_OPTIONS } from '@/features/Home/data/homeData';

import HomeHeader from '@/features/Home/components/HomeHeader';
import HeroBanner from '@/features/Home/components/HeroBanner';
import CategoryChips from '@/features/Home/components/CategoryChips';
import EditorialSections from '@/features/Home/components/EditorialSections';

import ProductGrid from '@/features/Products/components/ProductGrid';
import { fetchProducts } from '@/features/Products/services/productApi';
import { adaptProduct } from '@/features/Products/utils/productAdapter';

import SearchBar from '@/shared/components/SearchBar';
import Toast from '@/shared/components/Toast';

import { styles } from '@/shared/styles/homeStyles';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Products from backend
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Home screen state
  const [selectedCategory, setSelectedCategory] = useState('ALL PIECES');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortIndex, setSortIndex] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const products = await fetchProducts();

        const adaptedProducts = products.map(adaptProduct);

        setProductsData(adaptedProducts);

      } catch (err) {
        console.error('Products fetch error:', err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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

  // Add to cart (UI feedback for now)
  const handleAddToCart = (product) => {
    triggerToast(`Added ${product.title} to bag`);
  };

  // Sorting
  const handleNextSort = () => {
    setSortIndex((index) => (index + 1) % SORT_OPTIONS.length);
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
      products = [...products].sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
    }

    return products;
  }, [productsData, selectedCategory, searchQuery, sortIndex]);

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
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onAddToCart={handleAddToCart}
            sortOptions={SORT_OPTIONS}
            sortIndex={sortIndex}
            onNextSort={handleNextSort}
          />
        )}

        <EditorialSections onToast={triggerToast} />
      </ScrollView>
    </View>
  );
}