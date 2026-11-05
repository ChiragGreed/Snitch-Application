import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';
import { styles as sharedStyles } from '@/shared/styles/homeStyles';

/**
 * SearchBar
 *
 * Props:
 *  value        — controlled text value
 *  onChangeText — text change handler
 *  onSort       — called when the filter/sort button is tapped
 *  onToast      — optional toast callback
 */
export default function SearchBar({ value, onChangeText, onSort, onToast }) {
  return (
    <View style={sharedStyles.searchRow}>
      <View style={sharedStyles.searchContainer}>
        <SnitchIcon name="search" size={18} color={SnitchColors.textMuted} />
        <TextInput
          style={sharedStyles.searchInput}
          placeholder="Search pieces, looks…"
          placeholderTextColor={SnitchColors.textLight}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <Pressable
        style={sharedStyles.searchFilterButton}
        onPress={onSort}
        accessibilityLabel="Sort and filter"
      >
        <SnitchIcon name="tune" size={18} color={SnitchColors.textPrimary} />
      </Pressable>
    </View>
  );
}

