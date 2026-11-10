import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/cartStyles';

export default function CartCompleteLook({ item, onAddAndSave, isAdded }) {
  if (!item) return null;

  const product = item.productId || {};
  const title = product.title || 'Silver Signet Ring';
  const image = product.image;
  const price = item.unitPrice || 452;
  const originalPrice = item.originalPrice || 799;

  return (
    <View style={styles.completeLookCard}>
      <View style={styles.completeLookLeft}>
        <View style={styles.completeLookThumb}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%', borderRadius: 6 }}
              contentFit="cover"
            />
          ) : (
            <View style={{ flex: 1, backgroundColor: SnitchColors.surfaceContainer }} />
          )}
        </View>

        <View style={styles.completeLookTextGroup}>
          <Text style={styles.completeLookCategory}>Complete The Look</Text>
          <Text style={styles.completeLookTitle} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.completeLookPriceRow}>
            <Text style={styles.completeLookPrice}>
              +₹{price.toLocaleString('en-IN')}
            </Text>
            {originalPrice ? (
              <Text style={styles.completeLookStrikethrough}>
                ₹{originalPrice.toLocaleString('en-IN')}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <Pressable
        style={[
          styles.addAndSaveBtn,
          isAdded && { backgroundColor: SnitchColors.surfaceContainerHigh },
        ]}
        onPress={() => onAddAndSave?.(item)}
        disabled={isAdded}
      >
        <Text style={styles.addAndSaveBtnText}>
          {isAdded ? 'Added' : 'Add & Save'}
        </Text>
      </Pressable>
    </View>
  );
}

