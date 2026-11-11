import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/SnitchHeader';

export default function SnitchHeader({ title, onToast, onSearch, onNotifications, onProfile }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.brandWordmark}>SNITCH</Text>
        <View style={styles.headerDivider} />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        <Pressable
          style={styles.headerIconButton}
          onPress={() => (onSearch ? onSearch() : onToast?.('Search active'))}
          accessibilityLabel="Search"
        >
          <SnitchIcon name="search" size={21} color={SnitchColors.textPrimary} />
        </Pressable>
        <Pressable
          style={styles.headerIconButton}
          onPress={() => (onNotifications ? onNotifications() : onToast?.('No new notifications'))}
          accessibilityLabel="Notifications"
        >
          <SnitchIcon name="notifications" size={21} color={SnitchColors.textPrimary} />
          <View style={styles.notificationDot} />
        </Pressable>
        <Pressable
          style={styles.avatarContainer}
          onPress={() => (onProfile ? onProfile() : onToast?.('Profile'))}
          accessibilityLabel="Account"
        >
          <SnitchIcon name="person" size={20} color={SnitchColors.secondaryMuted} />
        </Pressable>
      </View>
    </View>
  );
}
