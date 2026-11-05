import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/homeStyles';

export default function EditorialSections({ onToast }) {
  return (
    <>
      <View style={styles.spotlightCard}>
        <View style={styles.spotlightHeader}><Text style={styles.spotlightTag}>STUDIO PERSPECTIVE</Text><SnitchIcon name="style" size={18} color={SnitchColors.textSecondary} /></View>
        <Text style={styles.spotlightTitle}>The Art of Everyday Tailoring</Text>
        <Text style={styles.spotlightDescription}>Unstructured shoulder lines, open-weave linens, and breathable tailoring crafted for effortless everyday comfort.</Text>
        <Pressable style={styles.spotlightLink} onPress={() => onToast('Opening SNITCH Design Journal')}><Text style={styles.spotlightLinkText}>Read the Design Journal</Text><SnitchIcon name="north_east" size={17} color={SnitchColors.secondary} /></Pressable>
      </View>
      <View style={styles.pillarsContainer}>
        <View style={styles.pillarItem}><SnitchIcon name="local_shipping" size={20} color={SnitchColors.textPrimary} /><Text style={styles.pillarTitle}>EXPRESS DISPATCH</Text><Text style={styles.pillarSubtitle}>Under 48 Hrs</Text></View>
        <View style={[styles.pillarItem, styles.pillarBorder]}><SnitchIcon name="cached" size={20} color={SnitchColors.textPrimary} /><Text style={styles.pillarTitle}>HASSLE-FREE</Text><Text style={styles.pillarSubtitle}>7-Day Doorstep Returns</Text></View>
        <View style={styles.pillarItem}><SnitchIcon name="verified" size={20} color={SnitchColors.textPrimary} /><Text style={styles.pillarTitle}>100% COTTON</Text><Text style={styles.pillarSubtitle}>Certified Mill Fabrics</Text></View>
      </View>
    </>
  );
}
