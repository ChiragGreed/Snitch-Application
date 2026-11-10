import React from 'react';
import { SymbolView } from 'expo-symbols';
import { Platform, StyleSheet, Text, View } from 'react-native';

const SF_MAPPING: Record<string, string> = {
  search: 'magnifyingglass',
  notifications: 'bell',
  mic: 'mic',
  tune: 'slider.horizontal.3',
  auto_awesome: 'sparkles',
  arrow_forward: 'arrow.right',
  bookmark_border: 'bookmark',
  bookmark: 'bookmark.fill',
  expand_more: 'chevron.down',
  shopping_bag: 'bag',
  star: 'star.fill',
  style: 'sparkles.rectangle.stack',
  north_east: 'arrow.up.right',
  local_shipping: 'shippingbox',
  cached: 'arrow.triangle.2.circlepath',
  verified: 'checkmark.seal.fill',
  favorite: 'heart.fill',
  favorite_border: 'heart',
  close: 'xmark',
  home: 'house',
  person: 'person',
  expand_less: 'chevron.up',
  arrow_back: 'arrow.left',
  straighten: 'ruler',
  grid_view: 'square.grid.2x2',
  filter_list: 'line.3.horizontal.decrease',
  delete_outline: 'trash',
  delete: 'trash',
  remove: 'minus',
  add: 'plus',
  local_activity: 'ticket',
  chevron_right: 'chevron.right',
  info: 'info.circle',
  verified_user: 'checkmark.shield',
  published_with_changes: 'arrow.triangle.2.circlepath',
};

const UNICODE_FALLBACK: Record<string, string> = {
  search: '🔍',
  notifications: '🔔',
  mic: '🎤',
  tune: '⚙',
  auto_awesome: '✦',
  arrow_forward: '→',
  bookmark_border: '🔖',
  bookmark: '🔖',
  expand_more: '▾',
  shopping_bag: '🛍',
  star: '★',
  style: '✨',
  north_east: '↗',
  local_shipping: '📦',
  cached: '🔄',
  verified: '✓',
  favorite: '♥',
  favorite_border: '♡',
  close: '✕',
  home: '⌂',
  person: '👤',
  expand_less: '▴',
  arrow_back: '←',
  straighten: '↔',
  grid_view: '⊞',
  filter_list: '≡',
  delete_outline: '🗑',
  delete: '🗑',
  remove: '−',
  add: '+',
  local_activity: '🎟',
  chevron_right: '›',
  info: 'ⓘ',
  verified_user: '🛡',
  published_with_changes: '↺',
};

interface SnitchIconProps {
  name: string;
  size?: number;
  color?: string;
}

export function SnitchIcon({ name, size = 20, color = '#121212' }: SnitchIconProps) {
  const sfName = SF_MAPPING[name] ?? 'circle';
  const fallbackChar = UNICODE_FALLBACK[name] ?? '•';

  return (
    <SymbolView
      name={{
        ios: sfName,
        android: name,
        web: name,
      }}
      size={size}
      tintColor={color}
      fallback={
        <Text style={[styles.fallback, { fontSize: size * 0.8, color, lineHeight: size }]}>
          {fallbackChar}
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

