
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
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