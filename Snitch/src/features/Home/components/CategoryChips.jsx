import React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import { styles } from '@/shared/styles/homeStyles';

export default function CategoryChips({ categories, selectedCategory, onSelect }) {
  return (
    <View style={styles.categoriesSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
        {categories.map((category) => {
          const active = selectedCategory === category;
          return <Pressable key={category} style={[styles.categoryChip, active && styles.categoryChipActive]} onPress={() => onSelect(category)}><Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>{category}</Text></Pressable>;
        })}
      </ScrollView>
    </View>
  );
}
