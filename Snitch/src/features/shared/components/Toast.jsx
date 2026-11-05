import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/shared/styles/homeStyles';

export default function Toast({ message, top }) {
  if (!message) return null;
  return <View style={[styles.toastContainer, { top }]}><Text style={styles.toastText}>{message}</Text></View>;
}
