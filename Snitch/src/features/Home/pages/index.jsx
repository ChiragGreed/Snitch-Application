
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES } from '@/features/Home/data/homeData';
import useCart from '@/features/Cart/hooks/useCart';
import useWishList from '@/features/Wishlist/hooks/useWishList';

import SnitchHeader from '@/shared/components/SnitchHeader';
import HeroBanner from '@/features/Home/components/HeroBanner';
import CategoryChips from '@/features/Home/components/CategoryChips';
import EditorialSections from '@/features/Home/components/EditorialSections';

import ProductGrid from '@/features/Products/components/ProductGrid';
import useProducts from '@/features/Products/hooks/useProducts';

import Toast from '@/shared/components/Toast';
import ScreenLoader from '@/shared/components/ScreenLoader';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';

import useAuth from '@/features/Authentication/hooks/useAuth';

import { styles } from '@/features/Home/styles/homeStyles';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { getProductsHandler } = useProducts();
  const { addToCartHandler } = useCart();
  const { wishListItems, toggleListHandler } = useWishList();
  const { getMeHandler } = useAuth();

  useEffect(() => {
    getMeHandler();
  }, [getMeHandler]);

  useEffect(() => {
    getProductsHandler();
  }, [getProductsHandler]);
  const productsData = useSelector((state) => state.products.AllProducts);

  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const loading = status === 'idle' || status === 'loading';

  // Home screen state
  const [selectedCategory, setSelectedCategory] = useState('ALL PIECES');
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
  const handleAddToCart = async (product, variant) => {
    if (!product) return;
    try {
      const added = await addToCartHandler(product, variant);
      if (added) triggerToast('Added to bag', 'success');
    } catch {
      triggerToast('Unable to add to bag. Please try again.', 'warning');
    }
  };

  // Product filtering
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory =
        selectedCategory === 'ALL PIECES' ||
        selectedCategory === 'NEW DROPS' ||
        product.category?.some(
          (category) =>
            category.toLowerCase() === selectedCategory.toLowerCase()
        );

      return matchesCategory;
    });
  }, [productsData, selectedCategory]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Toast message={toastMessage} type={toastType} top={insets.top + 54} />

      <SnitchHeader
        title="Home"
        onToast={triggerToast}
        onSearch={() => router.push('/explore')}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner onToast={triggerToast} />

        <CategoryChips
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {loading ? (
          <ScreenLoader
            message="Loading products..."
            containerStyle={{ flex: 0, paddingVertical: 40 }}
          />
        ) : error ? (
          <ErrorState
            title="Unable to load products"
            message={error}
            onRetry={() => getProductsHandler(true)}
            containerStyle={{ flex: 0, paddingVertical: 40 }}
          />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            containerStyle={{ flex: 0, paddingVertical: 40 }}
          />
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