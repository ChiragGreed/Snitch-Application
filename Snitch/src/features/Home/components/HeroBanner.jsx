import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ImageBackground, FlatList } from 'react-native';
import { styles } from '@/features/Home/styles/homeStyles';

const heroImages = [
  'https://ik.imagekit.io/lfqmv9rcq/Snitch/Hero%20Images/Hero_image.png',
  'https://ik.imagekit.io/lfqmv9rcq/Snitch/Hero%20Images/carmen-laezza-njWFb6fQm8w-unsplash.jpg',
  'https://ik.imagekit.io/lfqmv9rcq/Snitch/Hero%20Images/highlight-id-roHpoNuME1w-unsplash.jpg',
  'https://ik.imagekit.io/lfqmv9rcq/Snitch/Hero%20Images/screen%20(1).png?updatedAt=1794291844124',
];

export default function HeroBanner({ onToast }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderWidth === 0) return;

    const interval = setInterval(() => {
      let nextSlide = activeSlide + 1;

      // Loop back to the first slide if we hit the end
      if (nextSlide >= heroImages.length) {
        nextSlide = 0;
      }

      sliderRef.current?.scrollToIndex({
        index: nextSlide,
        animated: true,
      });
    }, 3000); // Slides change every 3 seconds

    // Clean up the interval on unmount or slide change
    return () => clearInterval(interval);
  }, [activeSlide, sliderWidth]);

  const handleScroll = ({ nativeEvent }) => {
    if (sliderWidth === 0) return;

    const nextIndex = Math.round(nativeEvent.contentOffset.x / sliderWidth);
    setActiveSlide(Math.max(0, Math.min(nextIndex, heroImages.length - 1)));
  };

  return (
    <View
      style={styles.heroCard}
      onLayout={({ nativeEvent }) => setSliderWidth(nativeEvent.layout.width)}
    >
      <FlatList
        ref={sliderRef}
        data={heroImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.heroSlider}
        keyExtractor={(_, index) => String(index)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item }}
            style={{ width: sliderWidth, flex: 1, justifyContent: 'space-between' }}
            imageStyle={{ borderRadius: 0 }}
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroBottomContent}>
              <Text style={styles.heroEyebrow}>CURATED LOOKBOOK</Text>
              <Text style={styles.heroTitle}>Refined Minimalism for the Modern Era</Text>
              <Text style={styles.heroDescription} numberOfLines={2}>Structured silhouettes, breathable raw silks, and oversized tailoring designed for effortless sophistication.</Text>
              {/* <View style={styles.heroActionsRow}> */}
              {/* <Pressable style={styles.heroShopButton} onPress={() => onToast('Opening AW25 Capsule collection')}><Text style={styles.heroShopButtonText}>SHOP THE CAPSULE</Text><SnitchIcon name="arrow_forward" size={15} color={SnitchColors.textPrimary} /></Pressable> */}
              {/* <Pressable style={[styles.heroBookmarkButton, isBookmarked && styles.heroBookmarkActive]} onPress={() => { setIsBookmarked(!isBookmarked); onToast(isBookmarked ? 'Removed from saved capsules' : 'Capsule bookmarked'); }} accessibilityLabel="Bookmark Capsule"><SnitchIcon name={isBookmarked ? 'bookmark' : 'bookmark_border'} size={19} color="#FFFFFF" /></Pressable> */}
              {/* </View> */}
              <View style={styles.heroDotsContainer}>
                {heroImages.map((_, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      sliderRef.current?.scrollToOffset({
                        offset: index * sliderWidth,
                        animated: true,
                      });
                      setActiveSlide(index);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={`Go to slide ${index + 1}`}
                  >
                    <View style={[styles.heroDot, activeSlide === index && styles.heroDotActive]} />
                  </Pressable>
                ))}
              </View>
            </View>
          </ImageBackground>
        )}
      />
    </View>
  );
}
