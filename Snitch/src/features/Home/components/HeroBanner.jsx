import React, { useState } from 'react';
import { View, Text, Pressable, ImageBackground } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors } from '@/constants/snitch-theme';
import { styles } from '@/shared/styles/homeStyles';

export default function HeroBanner({ onToast }) {

  const [isBookmarked, setIsBookmarked] = useState(false);
  
  return (
    <View style={styles.heroCard}>
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' }} style={{ flex: 1, justifyContent: 'space-between' }} imageStyle={{ borderRadius: 0 }}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroTopRow}>
          <View style={styles.limitedEditionBadge}><Text style={styles.limitedEditionText}>LIMITED EDITION</Text></View>
          <View style={styles.dropBadge}><SnitchIcon name="auto_awesome" size={13} color="#FFFFFF" /><Text style={styles.dropBadgeText}>AW25 / Drop 04</Text></View>
        </View>
        <View style={styles.heroBottomContent}>
          <Text style={styles.heroEyebrow}>CURATED LOOKBOOK</Text>
          <Text style={styles.heroTitle}>Refined Minimalism for the Modern Era</Text>
          <Text style={styles.heroDescription} numberOfLines={2}>Structured silhouettes, breathable raw silks, and oversized tailoring designed for effortless sophistication.</Text>
          <View style={styles.heroActionsRow}>
            <Pressable style={styles.heroShopButton} onPress={() => onToast('Opening AW25 Capsule collection')}><Text style={styles.heroShopButtonText}>SHOP THE CAPSULE</Text><SnitchIcon name="arrow_forward" size={15} color={SnitchColors.textPrimary} /></Pressable>
            <Pressable style={[styles.heroBookmarkButton, isBookmarked && styles.heroBookmarkActive]} onPress={() => { setIsBookmarked(!isBookmarked); onToast(isBookmarked ? 'Removed from saved capsules' : 'Capsule bookmarked'); }} accessibilityLabel="Bookmark Capsule"><SnitchIcon name={isBookmarked ? 'bookmark' : 'bookmark_border'} size={19} color="#FFFFFF" /></Pressable>
          </View>
          <View style={styles.heroDotsContainer}><View style={[styles.heroDot, styles.heroDotActive]} /><View style={styles.heroDot} /><View style={styles.heroDot} /><View style={styles.heroDot} /></View>
        </View>
      </ImageBackground>
    </View>
  );
}
