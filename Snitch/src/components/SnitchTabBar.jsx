
import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform, } from 'react-native';

import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SnitchColors, SnitchSpacing } from '@/constants/snitch-theme';
import { SnitchIcon } from '@/components/snitch-icon';

const TABS = [
  { name: 'Home', href: '/', icon: 'home', iconActive: 'home' },
  { name: 'Explore', href: '/explore', icon: 'search', iconActive: 'search' },
  { name: 'Wishlist', href: '/wishlist', icon: 'favorite_border', iconActive: 'favorite' },
  { name: 'Bag', href: '/cart', icon: 'shopping_bag', iconActive: 'shopping_bag' },
  { name: 'Profile', href: '/profile', icon: 'person', iconActive: 'person' },
];

export default function SnitchTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const bottomPad = Math.max(
    insets.bottom,
    Platform.OS === 'android' ? 8 : 0
  );

  return (
    <View style={[styles.container, { paddingBottom: bottomPad }]}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const isFocused =
            tab.href === '/'
              ? pathname === '/'
              : pathname === tab.href ||
              pathname.startsWith(`${tab.href}/`);

          return (
            <Pressable
              key={tab.href}
              style={styles.tab}
              onPress={() => router.navigate(tab.href)}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={tab.name}
            >
              <View
                style={[
                  styles.iconWrap,
                  isFocused && styles.iconWrapActive,
                ]}
              >
                <SnitchIcon
                  name={isFocused ? tab.iconActive : tab.icon}
                  size={22}
                  color={
                    isFocused
                      ? SnitchColors.textPrimary
                      : SnitchColors.textLight
                  }
                />
              </View>

              <Text
                style={[
                  styles.label,
                  isFocused && styles.labelActive,
                ]}
              >
                {tab.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SnitchColors.canvas,
    borderTopWidth: 1,
    borderTopColor: SnitchColors.border,
  },
  bar: {
    flexDirection: 'row',
    paddingTop: SnitchSpacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingBottom: SnitchSpacing.xs,
  },
  iconWrap: {
    width: 40,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  iconWrapActive: {
    backgroundColor: SnitchColors.surfaceContainerHigh,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
    color: SnitchColors.textLight,
  },
  labelActive: {
    color: SnitchColors.textPrimary,
    fontWeight: '700',
  },
});
