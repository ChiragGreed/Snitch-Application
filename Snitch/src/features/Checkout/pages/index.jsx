import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import Toast from '@/shared/components/Toast';
import { styles } from '@/features/Checkout/styles/checkoutStyles';
import useAuth from '@/features/Authentication/hooks/useAuth';
import useCheckout from '../hooks/useCheckout';

// ─── Delivery Options ─────────────────────────────────────────────────────────
const DELIVERY_OPTIONS = [
  {
    id: 'standard',
    title: 'Standard Delivery',
    subtitle: 'Arrives within 3–5 business days',
    price: 0,
    badge: 'RECOMMENDED',
  },
  {
    id: 'express',
    title: 'Express Delivery',
    subtitle: 'Guaranteed Next-Day by 8 PM',
    price: 99,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

const getImageUrl = (item) => {
  const product = item?.productId || {};
  const raw = item?.image || product?.image || (Array.isArray(product?.images) ? product.images[0] : null);
  return typeof raw === 'string' ? raw : raw?.url || null;
};

const formatINR = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

// ─── Stepper Component ────────────────────────────────────────────────────────
function CheckoutStepper({ activeStep = 1 }) {
  const steps = [
    { label: 'Address', step: 0 },
    { label: 'Review', step: 1 },
    { label: 'Pay', step: 2 },
  ];

  return (
    <View style={styles.stepperContainer}>
      {steps.map((s, i) => {
        const isCompleted = s.step < activeStep;
        const isActive = s.step === activeStep;
        const isPending = s.step > activeStep;

        return (
          <View key={s.step} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.stepCircleCompleted,
                  isActive && styles.stepCircleActive,
                  isPending && styles.stepCirclePending,
                ]}
              >
                {isCompleted ? (
                  <SnitchIcon name="check_circle" size={12} color={SnitchColors.onPrimary} />
                ) : (
                  <Text style={isPending ? styles.stepNumberPending : styles.stepNumber}>
                    {s.step + 1}
                  </Text>
                )}
              </View>
              <Text style={isPending ? styles.stepLabelPending : styles.stepLabel}>
                {s.label}
              </Text>
            </View>
            {i < steps.length - 1 && (
              <View
                style={[
                  s.step < activeStep ? styles.stepConnector : styles.stepConnectorPending,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

// ─── Bag Item Row ─────────────────────────────────────────────────────────────
function BagItemRow({ item, currency, isLast }) {
  const product = item?.productId || {};
  const title = product?.title || item?.title || 'Editorial Item';
  const quantity = item?.quantity ?? 1;
  const price = getSafePrice(item);
  const imageUrl = getImageUrl(item);
  const currencySymbol = currency === 'INR' ? '₹' : currency;

  // Build variant attribute string
  const variantAttrs = item?.variantAttributes;
  let metaParts = [];
  if (variantAttrs && typeof variantAttrs === 'object' && !Array.isArray(variantAttrs)) {
    metaParts = Object.entries(variantAttrs)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}: ${v}`);
  }
  const metaStr = [...metaParts, `Qty: ${quantity}`].join(' • ');

  return (
    <View>
      <View style={styles.bagItem}>
        {/* Thumbnail */}
        <View style={styles.bagItemThumbnail}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.bagItemThumbnailImg}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.bagItemThumbnailPlaceholder} />
          )}
        </View>

        {/* Details */}
        <View style={styles.bagItemDetails}>
          <Text style={styles.bagItemTitle} numberOfLines={2}>
            {title}
          </Text>
          {metaStr ? (
            <Text style={styles.bagItemMeta} numberOfLines={1}>
              {metaStr}
            </Text>
          ) : null}
          <Text style={styles.bagItemPrice}>
            {currencySymbol}{(price * quantity).toLocaleString('en-IN')}
          </Text>
        </View>
      </View>
      {!isLast && <View style={styles.bagItemDivider} />}
    </View>
  );
}

// ─── Main Checkout Screen ─────────────────────────────────────────────────────
export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Live cart state from Redux
  const { cartItems, subtotal, total, currency = 'INR' } = useSelector(
    (state) => state.cart
  );
  const User = useSelector((state) => state.auth.User);
  const { checkoutHandler } = useCheckout();
  const { protectedRouteHandler } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedDelivery, setSelectedDelivery] = useState('standard');
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('default');

  const triggerToast = useCallback((msg, type = 'default') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 2400);
  }, []);

  // Normalise cart items array
  const items = useMemo(() => {
    if (!cartItems) return [];
    if (Array.isArray(cartItems)) return cartItems;
    if (Array.isArray(cartItems?.items)) return cartItems.items;
    return [];
  }, [cartItems]);

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + (item.quantity || 1), 0),
    [items]
  );

  const displayTotal = total > 0 ? total : subtotal;
  const currencySymbol = currency === 'INR' ? '₹' : currency;

  const deliveryCharge = useMemo(() => {
    const opt = DELIVERY_OPTIONS.find((o) => o.id === selectedDelivery);
    return opt?.price ?? 0;
  }, [selectedDelivery]);

  const totalPayable = displayTotal + deliveryCharge;

  useEffect(() => {
    let active = true;

    const checkAuthentication = async () => {
      const authenticated = await protectedRouteHandler();

      if (active) {
        setIsLoggedIn(authenticated);
        setAuthChecked(true);
      }
    };

    checkAuthentication();
    return () => {
      active = false;
    };
  }, [protectedRouteHandler]);

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      router.replace({ pathname: '/auth/login', params: { returnTo: '/checkout' } });
    }
  }, [authChecked, isLoggedIn, router]);

  // ── Computed GST (included, 12% approx)
  const gstAmount = useMemo(
    () => Math.round(displayTotal * 0.12),
    [displayTotal]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleEditBag = useCallback(() => {
    router.back();
  }, [router]);

  const handlePlaceOrder = useCallback(() => {
    if (items.length === 0) {
      triggerToast('Your bag is empty');
      return;
    }
    checkoutHandler();
    triggerToast('Opening Secure Payment Gateway...', 'success');
    // TODO: Integrate Razorpay / payment gateway here
  }, [checkoutHandler, items.length, triggerToast]);

  if (!authChecked || !isLoggedIn) {
    return null;
  }

  // ── Empty Cart guard
  if (items.length === 0) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <Toast message={toastMessage} type={toastType} top={insets.top + 50} />
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.headerBackButton} onPress={handleBack} accessibilityLabel="Go back">
              <SnitchIcon name="arrow_back" size={22} color={SnitchColors.textPrimary} />
            </Pressable>
            <Text style={styles.headerTitle}>Checkout</Text>
          </View>
          <View style={styles.headerSecure}>
            <SnitchIcon name="verified_user" size={14} color={SnitchColors.secondaryMuted} />
            <Text style={styles.headerSecureText}>Secure</Text>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <SnitchIcon name="shopping_bag" size={32} color={SnitchColors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Add items to your bag before proceeding to checkout.
          </Text>
          <Pressable style={styles.emptyBackBtn} onPress={() => router.push('/')}>
            <Text style={styles.emptyBackBtnText}>Explore Drops</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Toast */}
      <Toast message={toastMessage} type={toastType} top={insets.top + 50} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            style={styles.headerBackButton}
            onPress={handleBack}
            accessibilityLabel="Go back"
          >
            <SnitchIcon name="arrow_back" size={22} color={SnitchColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
        <View style={styles.headerSecure}>
          <SnitchIcon name="verified_user" size={14} color={SnitchColors.secondaryMuted} />
          <Text style={styles.headerSecureText}>Secure</Text>
        </View>
      </View>

      {/* ── Checkout Stepper ────────────────────────────────────────────── */}
      <CheckoutStepper activeStep={1} />

      {/* ── Scrollable Content ──────────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 110 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Shipping Address Card ─────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.addressHeader}>
            <View style={styles.sectionLabelRow}>
              <SnitchIcon name="local_shipping" size={16} color={SnitchColors.secondary} />
              <Text style={styles.sectionLabelText}>Delivering To</Text>
            </View>
            <Pressable
              style={styles.addressChangBtn}
              onPress={() => triggerToast('Address management coming soon')}
              accessibilityLabel="Change address"
            >
              <Text style={styles.addressChangeText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.addressNameRow}>
            <Text style={styles.addressName}>
              {User?.fullname || User?.fullName || User?.name || 'Customer'}
            </Text>
            <View style={styles.addressTypeBadge}>
              <Text style={styles.addressTypeBadgeText}>HOME</Text>
            </View>
          </View>
          <Text style={styles.addressText}>
            Flat 402, Signature Towers, 12th Main Rd, Indiranagar,{'\n'}
            Bengaluru, Karnataka — 560038
          </Text>
          <Text style={styles.addressPhone}>+91 98450 82194</Text>
        </View>

        {/* ── Delivery Speed ─────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionLabelRow}>
            <SnitchIcon name="local_shipping" size={16} color={SnitchColors.secondary} />
            <Text style={styles.sectionLabelText}>Delivery Speed</Text>
          </View>

          {DELIVERY_OPTIONS.map((opt) => {
            const isSelected = selectedDelivery === opt.id;
            return (
              <Pressable
                key={opt.id}
                style={[
                  styles.deliveryOption,
                  isSelected
                    ? styles.deliveryOptionSelected
                    : styles.deliveryOptionUnselected,
                ]}
                onPress={() => setSelectedDelivery(opt.id)}
                accessibilityLabel={opt.title}
              >
                <View style={styles.deliveryOptionLeft}>
                  {/* Radio */}
                  <View
                    style={[
                      styles.radioOuter,
                      isSelected
                        ? styles.radioOuterSelected
                        : styles.radioOuterUnselected,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>

                  {/* Info */}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.deliveryTitle}>{opt.title}</Text>
                    <Text style={styles.deliverySubtitle}>{opt.subtitle}</Text>
                  </View>
                </View>

                {/* Price + Badge */}
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  {opt.badge && (
                    <View style={styles.deliveryBadge}>
                      <Text style={styles.deliveryBadgeText}>{opt.badge}</Text>
                    </View>
                  )}
                  {opt.price === 0 ? (
                    <Text style={styles.deliveryPriceFree}>FREE</Text>
                  ) : (
                    <Text style={styles.deliveryPrice}>+{currencySymbol}{opt.price}</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ── Bag Summary (live from Redux cartItems) ────────────────────── */}
        <View style={styles.card}>
          <View style={styles.bagHeader}>
            <View style={styles.sectionLabelRow}>
              <SnitchIcon name="shopping_bag" size={16} color={SnitchColors.secondary} />
              <Text style={styles.sectionLabelText}>
                Bag Summary ({itemCount} {itemCount === 1 ? 'Item' : 'Items'})
              </Text>
            </View>
            <Pressable onPress={handleEditBag} accessibilityLabel="Edit bag">
              <Text style={styles.bagEditBtn}>Edit</Text>
            </Pressable>
          </View>

          {items.map((item, index) => (
            <BagItemRow
              key={item._id || index}
              item={item}
              currency={currency}
              isLast={index === items.length - 1}
            />
          ))}
        </View>

        {/* ── Bill Details ───────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.sectionLabelRow}>
            <Text style={styles.sectionLabelText}>Bill Details</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Cart Total ({itemCount} {itemCount === 1 ? 'item' : 'items'})</Text>
            <Text style={styles.billValue}>{formatINR(displayTotal)}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            {deliveryCharge === 0 ? (
              <Text style={styles.billValueFree}>FREE</Text>
            ) : (
              <Text style={styles.billValue}>+{formatINR(deliveryCharge)}</Text>
            )}
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & GST (Included)</Text>
            <Text style={styles.billValue}>{formatINR(gstAmount)}</Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.billTotalRow}>
            <Text style={styles.billTotalLabel}>Total Payable</Text>
            <Text style={styles.billTotalAmount}>{formatINR(totalPayable)}</Text>
          </View>
        </View>

        {/* ── Security Badge ─────────────────────────────────────────────── */}
        <View style={styles.securityBadge}>
          <SnitchIcon name="verified_user" size={24} color={SnitchColors.secondaryMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.securityTitle}>100% Secure Checkout</Text>
            <Text style={styles.securitySubtitle}>
              256-Bit SSL Encrypted by Razorpay • Certified PCI-DSS Compliant
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Sticky Pay Bar ─────────────────────────────────────────────── */}
      <View style={[styles.payBar, { paddingBottom: insets.bottom + 8 }]}>
        <View style={styles.payBarContent}>
          <View style={styles.payBarPriceGroup}>
            <Text style={styles.payBarLabel}>To Pay</Text>
            <Text style={styles.payBarAmount}>{formatINR(totalPayable)}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.payButton,
              pressed && { opacity: 0.88 },
            ]}
            onPress={handlePlaceOrder}
            accessibilityLabel="Place Order"
          >
            <SnitchIcon name="verified_user" size={16} color={SnitchColors.onPrimary} />
            <Text style={styles.payButtonText}>
              Pay {formatINR(totalPayable)} via Razorpay
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
