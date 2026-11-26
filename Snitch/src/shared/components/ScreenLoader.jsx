import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SnitchColors, SnitchSpacing } from '@/constants/snitch-theme';

export default function ScreenLoader({
  message = 'Loading...',
  containerStyle,
  textStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size="large" color={SnitchColors.textPrimary} />
      {message ? <Text style={[styles.message, textStyle]}>{message}</Text> : null}
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
  message: {
    marginTop: SnitchSpacing.md,
    color: SnitchColors.textMuted,
    textAlign: 'center',
  },
});
