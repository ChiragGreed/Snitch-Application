import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SnitchIcon } from '@/components/snitch-icon';
import { SnitchColors, SnitchSpacing, SnitchRadius } from '@/constants/snitch-theme';

/**
 * Toast
 *
 * Props:
 *  message — string to display (null/undefined = hidden)
 *  top     — vertical offset from top of screen (default: 60)
 */
export default function Toast({ message, top = 60, type = 'default' }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    opacity.stopAnimation();
    opacity.setValue(0);

    if (!message) return undefined;

    const animation = Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1800),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]);
    animation.start();

    return () => animation.stop();
  }, [message, type, opacity]);

  if (!message) return null;
  const isSuccess = type === 'success';

  return (
    <Animated.View
      style={[
        styles.container,
        isSuccess && styles.successContainer,
        { top, opacity },
      ]}
      pointerEvents="none"
    >
      {isSuccess ? (
        <View style={styles.successIcon}>
          <SnitchIcon name="check_circle" size={18} color={SnitchColors.onPrimary} />
        </View>
      ) : null}
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: SnitchColors.textPrimary,
    paddingHorizontal: SnitchSpacing.gutter,
    paddingVertical: SnitchSpacing.sm,
    borderRadius: SnitchRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SnitchSpacing.sm,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    maxWidth: '80%',
  },
  successContainer: {
    backgroundColor: 'black',
  },
  successIcon: {
    width: 22,
    height: 22,
    backgroundColor: '#27834A',
    borderRadius: SnitchRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
