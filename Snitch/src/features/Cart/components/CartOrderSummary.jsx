import React from 'react';
import { View, Text } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Cart/styles/cartStyles';

export default function CartOrderSummary({
  subtotal = 0,
  discountAmount = 0,
  voucherCode = null,
  taxAmount = 0,
  deliveryCharge = 0,
  originalDeliveryCharge = 150,
  totalPayable = 0,
  totalSavings = 0,
  currency = 'INR',
}) {
  const currencySymbol = currency === 'INR' ? '₹' : currency;

  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Order Summary</Text>

      {/* Bag Total MRP */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryRowLabel}>Bag Total (MRP)</Text>
        <Text style={styles.summaryRowValue}>
          {currencySymbol}{subtotal.toLocaleString('en-IN')}
        </Text>
      </View>

      {/* Club Discount if applicable */}
      {discountAmount > 0 ? (
        <View style={styles.summaryRow}>
          <View style={styles.summaryRowLabelWithIcon}>
            <Text style={styles.summaryRowLabel}>Club Discount</Text>
            {voucherCode ? (
              <View style={styles.discountBadgeChip}>
                <Text style={styles.discountBadgeChipText}>{voucherCode}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.discountValueText}>
            -{currencySymbol}{discountAmount.toLocaleString('en-IN')}
          </Text>
        </View>
      ) : null}

      {/* Estimated GST & Taxes */}
      {taxAmount > 0 ? (
        <View style={styles.summaryRow}>
          <View style={styles.summaryRowLabelWithIcon}>
            <Text style={styles.summaryRowLabel}>Estimated GST & Taxes</Text>
            <SnitchIcon name="info" size={14} color={SnitchColors.textLight} />
          </View>
          <Text style={[styles.summaryRowValue, { color: SnitchColors.textSecondary }]}>
            {currencySymbol}{taxAmount.toLocaleString('en-IN')}{' '}
            <Text style={{ fontSize: 10, color: SnitchColors.textLight, fontWeight: '400' }}>
              (Included)
            </Text>
          </Text>
        </View>
      ) : null}

      {/* Delivery Partner Charges */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryRowLabel}>Delivery Partner Charges</Text>
        <View style={styles.deliveryValueContainer}>
          {originalDeliveryCharge > 0 ? (
            <Text style={styles.deliveryStrikethrough}>
              {currencySymbol}{originalDeliveryCharge.toLocaleString('en-IN')}
            </Text>
          ) : null}
          <Text style={styles.freeDeliveryTag}>
            {deliveryCharge === 0 ? 'FREE' : `${currencySymbol}${deliveryCharge}`}
          </Text>
        </View>
      </View>

      {/* Visual Divider */}
      <View style={styles.summaryDivider} />

      {/* Total Payable */}
      <View style={styles.totalPayableRow}>
        <View>
          <Text style={styles.totalPayableLabel}>Total Payable</Text>
          {totalSavings > 0 ? (
            <Text style={styles.totalSavingsSubtitle}>
              You saved {currencySymbol}{totalSavings.toLocaleString('en-IN')} in total today
            </Text>
          ) : null}
        </View>
        <Text style={styles.totalPayableAmount}>
          {currencySymbol}{totalPayable.toLocaleString('en-IN')}
        </Text>
      </View>
    </View>
  );
}
