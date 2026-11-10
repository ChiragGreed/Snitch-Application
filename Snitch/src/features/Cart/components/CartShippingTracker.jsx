import React from 'react';
import { View, Text } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/cartStyles';

export default function CartShippingTracker({
  currentTotal,
  threshold = 3196,
  currency = 'INR',
}) {
  const currencySymbol = currency === 'INR' ? '₹' : currency;
  const isEligible = currentTotal >= threshold;
  const remaining = Math.max(0, threshold - currentTotal);
  const progressRatio = Math.min(1, threshold > 0 ? currentTotal / threshold : 1);
  const progressPercent = Math.round(progressRatio * 100);

  return (
    <View style={styles.shippingTrackerCard}>
      <View style={styles.shippingTrackerHeader}>
        <View style={styles.shippingTrackerTitleRow}>
          <SnitchIcon name="local_shipping" size={18} color={SnitchColors.secondaryMuted} />
          <Text style={styles.shippingTrackerTitle}>Complimentary Express Shipping</Text>
        </View>
        <Text style={styles.shippingTrackerAmount}>
          {currencySymbol}{currentTotal.toLocaleString('en-IN')} / {currencySymbol}{threshold.toLocaleString('en-IN')}
        </Text>
      </View>

      {/* Progress Track */}
      <View style={styles.progressBarTrack}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progressPercent}%` },
          ]}
        />
      </View>

      {/* Notice */}
      <View style={styles.shippingNoticeRow}>
        {isEligible ? (
          <Text style={[styles.shippingNoticeText, { color: SnitchColors.secondaryMuted, fontWeight: '600' }]}>
            You have unlocked complimentary premium express delivery!
          </Text>
        ) : (
          <Text style={styles.shippingNoticeText}>
            Add <Text style={styles.shippingNoticeHighlight}>{currencySymbol}{remaining.toLocaleString('en-IN')}</Text> more to unlock complimentary premium express delivery.
          </Text>
        )}
      </View>
    </View>
  );
}
