import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/features/Home/styles/homeStyles';

/**
 * SearchBar
 *
 * Props:
 *  value            — controlled text value
 *  onChangeText     — text change handler
 *  onSubmitEditing  — called when the search is submitted
 *  onSort           — toggles the sort menu
 *  sortMenuOpen     — indicates whether the sort menu is expanded
 */
export default function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  onSort,
  sortMenuOpen,
}) {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchContainer}>
        <SnitchIcon name="search" size={18} color={SnitchColors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search pieces, looks…"
          placeholderTextColor={SnitchColors.textLight}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <Pressable
        style={styles.searchFilterButton}
        onPress={onSort}
        accessibilityLabel="Sort products"
        accessibilityState={{ expanded: sortMenuOpen }}
      >
        <SnitchIcon name="tune" size={18} color={SnitchColors.textPrimary} />
      </Pressable>
    </View>
  );
}
