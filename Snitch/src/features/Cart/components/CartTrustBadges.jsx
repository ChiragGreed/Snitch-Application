import React from 'react';
import { View, Text } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Cart/styles/cartStyles';

const TRUST_BADGES = [
  {
    id: 'secure',
    icon: 'verified_user',
    title: '100% Secure',
    description: '256-bit encrypted checkout',
  },
  {
    id: 'returns',
    icon: 'published_with_changes',
    title: 'Easy Returns',
    description: '30-day effortless doorstep pickup',
  },
];

export default function CartTrustBadges() {
  return (
    <View style={styles.trustGrid}>
      {TRUST_BADGES.map((badge) => (
        <View key={badge.id} style={styles.trustCard}>
          <SnitchIcon name={badge.icon} size={22} color={SnitchColors.secondaryMuted} />
          <View style={styles.trustCardTextGroup}>
            <Text style={styles.trustCardTitle}>{badge.title}</Text>
            <Text style={styles.trustCardSubtitle}>{badge.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
