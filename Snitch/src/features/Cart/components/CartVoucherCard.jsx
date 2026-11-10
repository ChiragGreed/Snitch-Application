import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/cartStyles';

export default function CartVoucherCard({
  voucher,
  onApplyVoucher,
  onRemoveVoucher,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const handleApply = () => {
    const trimmed = inputCode.trim().toUpperCase();
    if (!trimmed) return;
    onApplyVoucher?.(trimmed);
    setInputCode('');
  };

  return (
    <View style={styles.voucherCard}>
      <View style={styles.voucherHeader}>
        <View style={styles.voucherTitleGroup}>
          <SnitchIcon name="local_activity" size={20} color={SnitchColors.secondaryMuted} />
          <Text style={styles.voucherTitle}>SNITCH Club Voucher</Text>
        </View>
        {voucher ? (
          <Text style={styles.voucherStatusApplied}>Applied</Text>
        ) : null}
      </View>

      {/* Applied Voucher Chip */}
      {voucher ? (
        <View style={styles.voucherChipContainer}>
          <View style={styles.voucherChipLeft}>
            <SnitchIcon name="verified" size={18} color={SnitchColors.secondaryMuted} />
            <View>
              <View style={styles.voucherCodeRow}>
                <Text style={styles.voucherCodeText}>{voucher.code}</Text>
                <View style={styles.voucherDiscountTag}>
                  <Text style={styles.voucherDiscountTagText}>
                    {voucher.discountPercent}% OFF
                  </Text>
                </View>
              </View>
              <Text style={styles.voucherSavingsSubtext}>
                {voucher.description || `Saved ₹${voucher.discountAmount} on this purchase`}
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.voucherRemoveBtn}
            onPress={onRemoveVoucher}
            accessibilityLabel="Remove coupon"
            hitSlop={6}
          >
            <SnitchIcon name="close" size={16} color={SnitchColors.textLight} />
          </Pressable>
        </View>
      ) : null}

      {/* Expandable drawer trigger */}
      <Pressable
        style={styles.promoDrawerTrigger}
        onPress={() => setDrawerOpen((prev) => !prev)}
      >
        <Text style={styles.promoDrawerTriggerText}>
          {voucher
            ? 'Have another gift card or promo code?'
            : 'Apply gift card or promo code'}
        </Text>
        <SnitchIcon
          name={drawerOpen ? 'expand_less' : 'chevron_right'}
          size={16}
          color={SnitchColors.textMuted}
        />
      </Pressable>

      {/* Input row when expanded */}
      {drawerOpen ? (
        <View style={styles.promoInputRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="ENTER PROMO CODE"
            placeholderTextColor={SnitchColors.textLight}
            value={inputCode}
            onChangeText={setInputCode}
            autoCapitalize="characters"
          />
          <Pressable style={styles.promoApplyBtn} onPress={handleApply}>
            <Text style={styles.promoApplyBtnText}>APPLY</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
