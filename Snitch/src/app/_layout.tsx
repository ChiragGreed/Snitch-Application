import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, reduxStore } from '../Store';
import { PersistGate } from "redux-persist/integration/react";

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="products/[id]" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>

      </PersistGate>
    </ReduxProvider>
  );
}
