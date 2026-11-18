import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import SnitchHeader from '@/shared/components/SnitchHeader';
import OrderCard from '@/features/Order/components/OrderCard';
import useOrder from '@/features/Order/hooks/useOrder';
import Toast from '@/shared/components/Toast';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Order/styles/orderStyles';

// ─── OrdersScreen ─────────────────────────────────────────────────────────────
export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const orderData = useSelector((state) => state.order.orderDets);
  const { getOrderHandler } = useOrder();

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        await getOrderHandler();
      } catch (error) {
        if (isMounted) {
          setLoadError(
            error?.response?.data?.message || error?.message || 'Unable to load orders.'
          ); 
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [getOrderHandler, retryCount]);

  const orders = Array.isArray(orderData)
    ? orderData
    : orderData
      ? [orderData]
      : [];

  const handleOrderPress = (orderId) => {
    // TODO: navigate to order detail page when implemented
    triggerToast('Order details coming soon');
  };

  const handleNeedHelp = () => {
    // TODO: wire up to support / chat flow when implemented
    triggerToast('Support coming soon');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Toast */}
      <Toast message={toastMessage} top={insets.top + 50} />

      {/* Header */}
      <SnitchHeader
        title="Orders"
        onBack={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
        onToast={triggerToast}
        onSearch={() => router.push('/explore')}
        onNotifications={() => triggerToast('No new notifications')}
        onProfile={() => router.push('/profile')}
      />

      {isLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptySubtitle}>Loading your orders...</Text>
        </View>
      ) : loadError ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.emptyContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.emptyTitle}>Unable to load orders</Text>
          <Text style={styles.emptySubtitle}>{loadError}</Text>
          <Pressable
            style={styles.shopNowBtn}
            onPress={() => setRetryCount((count) => count + 1)}
          >
            <Text style={styles.shopNowBtnText}>Try Again</Text>
          </Pressable>
        </ScrollView>
      ) : orders.length === 0 ? (
        /* ── Empty State ── */
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.emptyContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.emptyIconContainer}>
            <SnitchIcon name="receipt_long" size={36} color={SnitchColors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No Orders Yet</Text>
          <Text style={styles.emptySubtitle}>
            Looks like you haven't placed any orders. Start shopping to see your orders here.
          </Text>
          <Pressable style={styles.shopNowBtn} onPress={() => router.push('/')}>
            <Text style={styles.shopNowBtnText}>Shop Now</Text>
          </Pressable>
        </ScrollView>
      ) : (
        /* ── Orders List ── */
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title row */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>My Orders</Text>
            <View style={styles.orderCountBadge}>
              <Text style={styles.orderCountText}>
                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
              </Text>
            </View>
          </View>

          {/* Order cards */}
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} onPress={handleOrderPress} />
          ))}

          {/* Need Help section */}
          <Pressable style={styles.needHelpCard} onPress={handleNeedHelp}>
            <View style={styles.needHelpIcon}>
              <SnitchIcon name="headset_mic" size={22} color={SnitchColors.secondaryMuted} />
            </View>
            <View style={styles.needHelpText}>
              <Text style={styles.needHelpTitle}>Need Help?</Text>
              <Text style={styles.needHelpSubtitle}>
                Questions about your order? Our team is here for you.
              </Text>
            </View>
            <View style={styles.needHelpChevron}>
              <SnitchIcon name="chevron_right" size={18} color={SnitchColors.textLight} />
            </View>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}
