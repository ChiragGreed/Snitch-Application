import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Order/styles/orderStyles';

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  placed: {
    label: 'Order Placed',
    dot: SnitchColors.secondary,
    bg: 'rgba(72, 91, 112, 0.10)',
    color: SnitchColors.secondary,
  },
  shipped: {
    label: 'Shipped',
    dot: '#5A8A6A',
    bg: 'rgba(39, 131, 74, 0.10)',
    color: '#27834A',
  },
  delivered: {
    label: 'Delivered',
    dot: SnitchColors.success,
    bg: 'rgba(39, 131, 74, 0.12)',
    color: SnitchColors.success,
  },
  cancelled: {
    label: 'Cancelled',
    dot: SnitchColors.error,
    bg: 'rgba(186, 26, 26, 0.10)',
    color: SnitchColors.error,
  },
};

const MAX_THUMBNAILS = 3;

// ─── OrderCard ────────────────────────────────────────────────────────────────
export default function OrderCard({ order, onPress }) {
  const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.placed;
  const items = order.items ?? [];
  const shownItems = items.slice(0, MAX_THUMBNAILS);
  const extraCount = items.length - MAX_THUMBNAILS;

  const orderId = useMemo(() => {
    const raw = String(order._id ?? '');
    return raw.length >= 8 ? `#${raw.slice(-8).toUpperCase()}` : `#${raw.toUpperCase()}`;
  }, [order._id]);

  const formattedDate = useMemo(() => {
    if (!order.createdAt) return null;
    return new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [order.createdAt]);

  const itemCount = items.reduce((acc, i) => acc + (i.quantity ?? 1), 0);

  return (
    <Pressable style={styles.orderCard} onPress={() => onPress?.(order._id)}>
      {/* ── Header: Order ID + Status pill ── */}
      <View style={styles.cardHeader}>
        <View style={styles.orderMeta}>
          <Text style={styles.orderId}>{orderId}</Text>
          {formattedDate ? (
            <Text style={styles.orderDate}>{formattedDate}</Text>
          ) : null}
        </View>

        <View style={[styles.statusPill, { backgroundColor: status.bg }]}>
          <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>

      {/* ── Item thumbnail strip ── */}
      <View style={styles.thumbnailsRow}>
        {shownItems.map((item, idx) => {
          const product = item.productId ?? {};
          const rawImg =
            product.image ??
            (Array.isArray(product.images) ? product.images[0] : null);
          const imgUrl = typeof rawImg === 'string' ? rawImg : rawImg?.url ?? null;

          return (
            <View key={item._id ?? idx} style={styles.thumbnail}>
              {imgUrl ? (
                <Image
                  source={{ uri: imgUrl }}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                <View
                  style={{ flex: 1, backgroundColor: SnitchColors.surfaceContainer }}
                />
              )}
            </View>
          );
        })}

        {extraCount > 0 && (
          <View style={styles.overflowBadge}>
            <Text style={styles.overflowBadgeText}>+{extraCount}</Text>
          </View>
        )}
      </View>

      {/* ── Footer: item count + view details ── */}
      <View style={styles.cardFooter}>
        <Text style={styles.itemSummaryText}>
          <Text style={styles.itemSummaryBold}>{itemCount}</Text>{' '}
          {itemCount === 1 ? 'item' : 'items'}
        </Text>

        <Pressable style={styles.viewDetailsBtn} onPress={() => onPress?.(order._id)}>
          <Text style={styles.viewDetailsBtnText}>View Details</Text>
          <SnitchIcon name="chevron_right" size={14} color={SnitchColors.textPrimary} />
        </Pressable>
      </View>
    </Pressable>
  );
}
