import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Cart/styles/cartStyles';

export default function CartStickyFooter({
  totalPayable = 0,
  originalTotal = 0,
  onProceed,
  disabled = false,
  currency = 'INR',
}) {
  const insets = useSafeAreaInsets();
  const currencySymbol = currency === 'INR' ? '₹' : currency;

  return (
    <View
      style={[
        styles.stickyCheckoutBar,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <View style={styles.stickyBarContent}>
        <View style={styles.stickyPriceGroup}>
          <Text style={styles.stickyPriceLabel}>Grand Total</Text>
          <View style={styles.stickyPriceValues}>
            <Text style={styles.stickyPriceTotal}>
              {currencySymbol}{totalPayable.toLocaleString('en-IN')}
            </Text>
            {originalTotal > totalPayable ? (
              <Text style={styles.stickyPriceOriginal}>
                {currencySymbol}{originalTotal.toLocaleString('en-IN')}
              </Text>
            ) : null}
          </View>
        </View>

        <Pressable
          style={[
            styles.checkoutButton,
            disabled && { opacity: 0.6 },
          ]}
          onPress={onProceed}
          disabled={disabled}
          accessibilityLabel="Proceed to Checkout"
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <SnitchIcon name="arrow_forward" size={18} color={SnitchColors.onPrimary} />
        </Pressable>
      </View>
    </View>
  );
}
