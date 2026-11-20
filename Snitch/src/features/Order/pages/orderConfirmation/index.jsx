import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { confirmationStyles as styles } from '@/features/Order/styles/confirmationStyles';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatINR = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

const getImageUrl = (item) => {
  const product = item?.productId || {};
  const raw = item?.image || product?.image || (Array.isArray(product?.images) ? product.images[0] : null);
  return typeof raw === 'string' ? raw : raw?.url || null;
};

const getSafePrice = (item) => {
  if (typeof item?.unitPrice === 'number') return item.unitPrice;
  if (typeof item?.price === 'number') return item.price;
  const p = item?.productId;
  if (typeof p?.variants?.price?.amount === 'number') return p.variants.price.amount;
  if (typeof p?.variants?.price === 'number') return p.variants.price;
  if (typeof p?.price?.amount === 'number') return p.price.amount;
  if (typeof p?.price === 'number') return p.price;
  return 0;
};

// ─── Status-to-timeline mapping ───────────────────────────────────────────────
// Steps always shown — progress depends on order.status
const TIMELINE_STEPS = [
  { key: 'placed',    label: 'Order Confirmed',   sub: 'Your order has been received' },
  { key: 'shipped',   label: 'Shipped',            sub: 'On the way to your address' },
  { key: 'delivered', label: 'Delivered',          sub: 'Successfully handed over' },
];
const STATUS_ORDER = ['placed', 'shipped', 'delivered'];

// ─── Item Row ─────────────────────────────────────────────────────────────────
function ConfirmationItemRow({ item, isLast }) {
  const product = item?.productId || {};
  const title = product?.title || item?.title || 'Editorial Item';
  const quantity = item?.quantity ?? 1;
  const price = getSafePrice(item);
  const imgUrl = getImageUrl(item);

  const variantAttrs = item?.variantAttributes;
  let metaParts = [];
  if (variantAttrs && typeof variantAttrs === 'object' && !Array.isArray(variantAttrs)) {
    metaParts = Object.entries(variantAttrs)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}: ${v}`);
  }
  const metaStr = [...metaParts, `Qty: ${quantity}`].join(' · ');

  return (
    <View>
      <View style={styles.itemRow}>
        <View style={styles.itemThumbnail}>
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={{ flex: 1, backgroundColor: SnitchColors.surfaceContainer }} />
          )}
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle} numberOfLines={2}>{title}</Text>
          {metaStr ? <Text style={styles.itemMeta}>{metaStr}</Text> : null}
          <Text style={styles.itemPrice}>{formatINR(price * quantity)}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.itemDivider} />}
    </View>
  );
}

// ─── Timeline Step ────────────────────────────────────────────────────────────
function TimelineStep({ step, isActive, isLast }) {
  return (
    <View style={styles.timelineRow}>
      {/* Left: dot + connector */}
      <View style={styles.timelineLeft}>
        <View style={[styles.timelineDot, isActive ? styles.timelineDotActive : styles.timelineDotPending]}>
          {isActive && (
            <SnitchIcon name="check" size={11} color={SnitchColors.onPrimary} />
          )}
        </View>
        {!isLast && (
          <View style={[styles.timelineConnector, isActive && styles.timelineConnectorActive]} />
        )}
      </View>

      {/* Right: content */}
      <View style={styles.timelineContent}>
        <Text style={isActive ? styles.timelineLabel : styles.timelineLabelPending}>
          {step.label}
        </Text>
        {isActive && (
          <Text style={styles.timelineSubtext}>{step.sub}</Text>
        )}
      </View>
    </View>
  );
}

// ─── OrderConfirmationScreen ──────────────────────────────────────────────────
export default function OrderConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // ── Real data from Redux ──
  const User = useSelector((state) => state.auth.User);
  const orderDets = useSelector((state) => state.order.orderDets);

  // Handle both single order object and array — take the most recent
  const order = useMemo(() => {
    if (!orderDets) return null;
    if (Array.isArray(orderDets)) {
      return orderDets.length > 0 ? orderDets[orderDets.length - 1] : null;
    }
    return orderDets;
  }, [orderDets]);

  // ── Derived values ──
  const userName = User?.fullname || User?.fullName || User?.name || 'there';
  const firstName = userName.split(' ')[0];

  const orderId = useMemo(() => {
    const raw = String(order?._id ?? '');
    return raw.length >= 8 ? `#${raw.slice(-8).toUpperCase()}` : raw ? `#${raw.toUpperCase()}` : '—';
  }, [order]);

  const items = useMemo(() => {
    return Array.isArray(order?.items) ? order.items : [];
  }, [order]);

  const itemCount = items.reduce((acc, i) => acc + (i.quantity ?? 1), 0);

  const subtotal = useMemo(() =>
    items.reduce((acc, item) => acc + getSafePrice(item) * (item.quantity ?? 1), 0),
    [items]
  );

  const currentStatusIndex = STATUS_ORDER.indexOf(order?.status ?? 'placed');
  const activeStepCount = currentStatusIndex + 1; // how many steps are "done"

  const handleContinueShopping = () => router.replace('/');
  const handleViewOrders = () => router.push('/orders/myOrders');
  const handleNeedHelp = () => {
    // TODO: wire up to support flow
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <Text style={styles.topBarBrand}>SNITCH</Text>
        <View style={styles.topBarSecure}>
          <SnitchIcon name="verified_user" size={13} color={SnitchColors.secondaryMuted} />
          <Text style={styles.topBarSecureText}>Secure</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero success banner ── */}
        <View style={styles.heroBanner}>
          <View style={styles.successIconRing}>
            <SnitchIcon name="check_circle" size={38} color={SnitchColors.success} />
          </View>
          <Text style={styles.heroGreeting}>
            Order Placed, {firstName}! 🎉
          </Text>
          <Text style={styles.heroSubtitle}>
            Thank you for shopping with SNITCH. We'll keep you posted as your order makes its way to you.
          </Text>
          {order?._id ? (
            <View style={styles.orderIdChip}>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.orderIdValue}>{orderId}</Text>
            </View>
          ) : null}
        </View>

        {/* ── Order Status Timeline ── */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineCardTitle}>Order Status</Text>
          {TIMELINE_STEPS.map((step, idx) => (
            <TimelineStep
              key={step.key}
              step={step}
              isActive={idx < activeStepCount}
              isLast={idx === TIMELINE_STEPS.length - 1}
            />
          ))}
        </View>

        {/* ── Items Ordered ── */}
        {items.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardSectionHeader}>
              <SnitchIcon name="shopping_bag" size={15} color={SnitchColors.secondary} />
              <Text style={styles.cardSectionTitle}>
                Items Ordered ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </Text>
            </View>
            {items.map((item, idx) => (
              <ConfirmationItemRow
                key={item._id ?? idx}
                item={item}
                isLast={idx === items.length - 1}
              />
            ))}
          </View>
        )}

        {/* ── Bill Summary ── */}
        {subtotal > 0 && (
          <View style={styles.card}>
            <View style={styles.cardSectionHeader}>
              <SnitchIcon name="receipt_long" size={15} color={SnitchColors.secondary} />
              <Text style={styles.cardSectionTitle}>Bill Summary</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </Text>
              <Text style={styles.billValue}>{formatINR(subtotal)}</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValueFree}>FREE</Text>
            </View>

            <View style={styles.billDivider} />

            <View style={styles.billTotalRow}>
              <Text style={styles.billTotalLabel}>Total Paid</Text>
              <Text style={styles.billTotalAmount}>{formatINR(subtotal)}</Text>
            </View>
          </View>
        )}

        {/* ── Delivery Address ── */}
        <View style={styles.card}>
          <View style={styles.cardSectionHeader}>
            <SnitchIcon name="local_shipping" size={15} color={SnitchColors.secondary} />
            <Text style={styles.cardSectionTitle}>Delivering To</Text>
          </View>
          <Text style={styles.addressName}>{userName}</Text>
          <Text style={styles.addressText}>
            Flat 402, Signature Towers, 12th Main Rd, Indiranagar,{'\n'}
            Bengaluru, Karnataka — 560038
          </Text>
          <Text style={styles.addressPhone}>+91 98450 82194</Text>
        </View>

        {/* ── Need Help ── */}
        <Pressable style={styles.needHelpCard} onPress={handleNeedHelp}>
          <View style={styles.needHelpIcon}>
            <SnitchIcon name="headset_mic" size={22} color={SnitchColors.secondaryMuted} />
          </View>
          <View style={styles.needHelpTextGroup}>
            <Text style={styles.needHelpTitle}>Need Help?</Text>
            <Text style={styles.needHelpSubtitle}>
              Questions about your order? Our team is here for you.
            </Text>
          </View>
          <SnitchIcon name="chevron_right" size={18} color={SnitchColors.textLight} />
        </Pressable>

        {/* ── CTAs ── */}
        <View style={styles.ctaRow}>
          <Pressable style={styles.ctaSecondary} onPress={handleViewOrders}>
            <Text style={styles.ctaSecondaryText}>My Orders</Text>
          </Pressable>
          <Pressable style={styles.ctaPrimary} onPress={handleContinueShopping}>
            <Text style={styles.ctaPrimaryText}>Shop More</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
