import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SnitchColors, SnitchRadius, SnitchSpacing } from '@/constants/snitch-theme';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
  retryLabel = 'Retry',
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={onRetry}
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>{retryLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SnitchSpacing.xl,
  },
  title: {
    color: SnitchColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    marginTop: SnitchSpacing.sm,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
  retryButton: {
    minHeight: 42,
    justifyContent: 'center',
    marginTop: SnitchSpacing.lg,
    paddingHorizontal: SnitchSpacing.xl,
    borderRadius: SnitchRadius.full,
    backgroundColor: SnitchColors.primary,
  },
  retryText: {
    color: SnitchColors.onPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
});
