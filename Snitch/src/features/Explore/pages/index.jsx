import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SnitchColors, SnitchSpacing } from '@/constants/snitch-theme';
import { SnitchIcon } from '@/components/snitch-icon';

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EXPLORE</Text>
      </View>
      <View style={styles.empty}>
        <SnitchIcon name="search" size={40} color={SnitchColors.borderVariant} />
        <Text style={styles.emptyTitle}>Discover Snitch</Text>
        <Text style={styles.emptySubtitle}>Browse collections, trends, and curated edits.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SnitchColors.canvas,
  },
  header: {
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: SnitchColors.border,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    color: SnitchColors.textPrimary,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SnitchSpacing.sm,
    paddingHorizontal: SnitchSpacing.xxl,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: SnitchColors.textPrimary,
    marginTop: SnitchSpacing.sm,
  },
  emptySubtitle: {
    fontSize: 13,
    color: SnitchColors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});

