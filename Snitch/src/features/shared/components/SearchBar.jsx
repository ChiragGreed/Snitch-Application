import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/homeStyles';

export default function SearchBar({ value, onChangeText, onToast, onSort }) {
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchBar}>
        <SnitchIcon name="search" size={19} color={SnitchColors.textMuted} />
        <TextInput style={styles.searchInput} placeholder="Search shirts, bootcut denim, coats..." placeholderTextColor="rgba(70, 71, 65, 0.6)" value={value} onChangeText={onChangeText} returnKeyType="search" />
        {value.length > 0 ? (
          <Pressable onPress={() => onChangeText('')} hitSlop={10}><SnitchIcon name="close" size={17} color={SnitchColors.textMuted} /></Pressable>
        ) : (
          <Pressable onPress={() => onToast('Voice search listening...')} hitSlop={10} style={styles.micButton}><SnitchIcon name="mic" size={19} color={SnitchColors.textMuted} /></Pressable>
        )}
      </View>
      <Pressable style={styles.filterButton} onPress={onSort} accessibilityLabel="Filter Catalog">
        <SnitchIcon name="tune" size={19} color={SnitchColors.textPrimary} />
      </Pressable>
    </View>
  );
}
