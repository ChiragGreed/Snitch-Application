import React from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/SnitchHeader';

const PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC2ezDUZRp9ppjI7FyHPLgcdt_VKotlZgALsQiTPxSapg3J88L7a-ZzoNDxZyUjbHT1CrfMs1neRYrS_F3o8jWxuKo6Z2o5l3xDHYCR41S85L7m8uv-PYxRe5EPccn5oDX6c7fr3_7xbNlegeTySRFg4ioNouy9yubOVk1veceeAwtPGrZbpXqUa21lNFdOpAmm3aQvmlg-wzS8ujqncbBYfuEh9_kHLmBWpiQTwdM';

export default function SnitchHeader({
  title,
  onToast,
  onSearch,
  onNotifications,
  onProfile,
}) {
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
          <Image
            source={{ uri: PROFILE_IMAGE }}
            style={styles.avatarImage}
            contentFit="cover"
          />
        </Pressable>
      </View>
    </View>
  );
}
